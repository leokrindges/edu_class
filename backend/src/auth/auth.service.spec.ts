import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { prismaServiceMock } from 'src/test/prisma-service.mock';
import { User } from 'src/user/models/user.model';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { UserType } from '@prisma/client';

jest.mock('bcrypt', () => ({
	hash: jest.fn(),
	compare: jest.fn(),
}));

describe('AuthService', () => {
	let service: AuthService;

	const jwtServiceMock: jest.Mocked<JwtService> = {
		signAsync: jest.fn(),
		verifyAsync: jest.fn(),
	} as any;

	const now = new Date();
	const userDb: User = {
		id: 'u1',
		name: 'User Test',
		email: 'user@test.com',
		isAdmin: false,
		avatar: null,
		phone: null,
		address: null,
		birthDate: null,
		type: UserType.STUDENT,
		createdAt: now,
		updatedAt: now,
		password: 'hashDaSenha',
		refreshToken: null as string | null,
		roleId: 'r1',
	};

	beforeAll(() => {
		process.env.JWT_ACCESS_SECRET = 'access-secret';
		process.env.JWT_REFRESH_SECRET = 'refresh-secret';
		process.env.ACCESS_TOKEN_TTL = '900';
		process.env.REFRESH_TOKEN_TTL = '604800';
	});

	beforeEach(async () => {
		jest.clearAllMocks();

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{ provide: PrismaService, useValue: prismaServiceMock },
				{ provide: JwtService, useValue: jwtServiceMock },
			],
		}).compile();

		service = module.get<AuthService>(AuthService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
	describe('signIn', () => {
		const REFRESH_TOKEN = 'refresh-token';
		const ACCESS_TOKEN = 'access-token';
		const HASHED_REFRESH = 'hashed-refresh-token';
		const PASSWORD_INCORRECT = 'senha_errada';
		const PASSWORD = 'senha_correta';
		const EMAIL_INCORRECT = 'userincorrect@test.com';
		const EMAIL = 'user@test.com';
		const HASH_PASSWORD = 'hashDaSenha';

		it('Deve autenticar (signIn) um usuário com sucesso', async () => {
			// ARRANGE
			prismaServiceMock.user.findUnique.mockResolvedValue(userDb);
			(bcrypt.compare as jest.Mock).mockResolvedValue(true);
			jwtServiceMock.signAsync
				.mockResolvedValueOnce(ACCESS_TOKEN)
				.mockResolvedValueOnce(REFRESH_TOKEN);
			(bcrypt.hash as jest.Mock).mockResolvedValue(HASHED_REFRESH);
			prismaServiceMock.user.update.mockResolvedValue({});

			// ACT
			const result = await service.signIn({
				email: EMAIL,
				password: PASSWORD,
			});

			// ASSERT - resultado
			expect(prismaServiceMock.user.findUnique).toHaveBeenCalledWith({
				where: { email: EMAIL },
			});
			expect(jwtServiceMock.signAsync).toHaveBeenNthCalledWith(
				1,
				{ sub: 'u1', email: EMAIL, type: UserType.STUDENT },
				{
					secret: process.env.JWT_ACCESS_SECRET,
					expiresIn: Number(process.env.ACCESS_TOKEN_TTL),
				},
			);

			// 2ª chamada -> refresh token
			expect(jwtServiceMock.signAsync).toHaveBeenNthCalledWith(
				2,
				{ sub: 'u1', email: EMAIL, type: UserType.STUDENT },
				{
					secret: process.env.JWT_REFRESH_SECRET,
					expiresIn: Number(process.env.REFRESH_TOKEN_TTL),
				},
			);
			expect(bcrypt.hash).toHaveBeenCalledWith(REFRESH_TOKEN, 10);
			expect(bcrypt.compare).toHaveBeenCalledWith(PASSWORD, HASH_PASSWORD);
			expect(result).toEqual(
				expect.objectContaining({
					accessToken: ACCESS_TOKEN,
					refreshToken: REFRESH_TOKEN,
					user: expect.any(Object),
				}),
			);
			// ASSERT - interações críticas
			expect(prismaServiceMock.user.update).toHaveBeenCalledWith({
				where: { id: 'u1' },
				data: { refreshToken: HASHED_REFRESH },
			});
		});

		it('Deve falhar (signIn) quando usuário não existe', async () => {
			prismaServiceMock.user.findUnique.mockResolvedValue(null);

			await expect(
				service.signIn({
					email: EMAIL_INCORRECT,
					password: PASSWORD_INCORRECT,
				}),
			).rejects.toBeInstanceOf(UnauthorizedException);
		});

		it('Deve falhar (signIn) quando senha é inválida', async () => {
			// ARRANGE: Usuário existe, mas senha incorreta
			prismaServiceMock.user.findUnique.mockResolvedValue(userDb);
			(bcrypt.compare as jest.Mock).mockResolvedValue(false);

			// ACT + ASSERT: Espera UnauthorizedException
			await expect(
				service.signIn({ email: EMAIL, password: PASSWORD_INCORRECT }),
			).rejects.toBeInstanceOf(UnauthorizedException);

			expect(jwtServiceMock.signAsync).not.toHaveBeenCalled();
			expect(prismaServiceMock.user.update).not.toHaveBeenCalled();

			//Conferir que buscou o user pelo email
			expect(prismaServiceMock.user.findUnique).toHaveBeenCalledWith({
				where: { email: EMAIL },
			});

			//Conferir que comparou a senha com o hash do banco
			expect(bcrypt.compare).toHaveBeenCalledWith(
				PASSWORD_INCORRECT,
				HASH_PASSWORD,
			);
		});
	});

	describe('signOut', () => {
		it('Deve deslogar (signOut) um usuário limpando o refreshToken', async () => {
			// ARRANGE
			prismaServiceMock.user.update.mockResolvedValue({});

			// ACT + ASSERT
			await expect(service.signOut('u1')).resolves.toBeUndefined();

			expect(prismaServiceMock.user.update).toHaveBeenCalledTimes(1);
			expect(prismaServiceMock.user.update).toHaveBeenCalledWith({
				where: { id: 'u1' },
				data: { refreshToken: null },
			});
		});
	});

	describe('refresh', () => {
		const REFRESH_IN = 'refresh.token.entrada';
		const NEW_ACCESS = 'new.access.token';
		const NEW_REFRESH = 'new.refresh.token';
		const NEW_HASHED_REFRESH = 'newHashedRefresh';
		const HASHED_REFRESH = 'hashedRefresh';

		it('deve gerar novos tokens quando o refresh token é válido', async () => {
			// ARRANGE
			jwtServiceMock.verifyAsync.mockResolvedValue({ sub: 'u1' });
			prismaServiceMock.user.findUnique.mockResolvedValue({
				...userDb,
				refreshToken: HASHED_REFRESH,
			});
			(bcrypt.compare as jest.Mock).mockResolvedValue(true);
			jwtServiceMock.signAsync
				.mockResolvedValueOnce(NEW_ACCESS)
				.mockResolvedValueOnce(NEW_REFRESH);
			(bcrypt.hash as jest.Mock).mockResolvedValue(NEW_HASHED_REFRESH);
			prismaServiceMock.user.update.mockResolvedValue({});

			// ACT
			const tokens = await service.refresh('u1', REFRESH_IN);

			// ASSERT
			expect(jwtServiceMock.verifyAsync).toHaveBeenCalledWith(REFRESH_IN, {
				secret: process.env.JWT_REFRESH_SECRET,
			});
			expect(prismaServiceMock.user.findUnique).toHaveBeenCalledWith({
				where: { id: 'u1', deletedAt: null },
			});
			expect(bcrypt.compare).toHaveBeenCalledWith(REFRESH_IN, HASHED_REFRESH);

			expect(jwtServiceMock.signAsync).toHaveBeenNthCalledWith(
				1,
				{ sub: 'u1', email: userDb.email, type: userDb.type },
				{
					secret: process.env.JWT_ACCESS_SECRET,
					expiresIn: Number(process.env.ACCESS_TOKEN_TTL),
				},
			);
			expect(jwtServiceMock.signAsync).toHaveBeenNthCalledWith(
				2,
				{ sub: 'u1', email: userDb.email, type: userDb.type },
				{
					secret: process.env.JWT_REFRESH_SECRET,
					expiresIn: Number(process.env.REFRESH_TOKEN_TTL),
				},
			);

			expect(bcrypt.hash).toHaveBeenCalledWith(NEW_REFRESH, 10);
			expect(prismaServiceMock.user.update).toHaveBeenCalledWith({
				where: { id: 'u1' },
				data: { refreshToken: NEW_HASHED_REFRESH },
			});

			expect(tokens).toEqual({
				accessToken: NEW_ACCESS,
				refreshToken: NEW_REFRESH,
			});
		});

		it('deve falhar se verifyAsync rejeitar (token expirado/ inválido)', async () => {
			jwtServiceMock.verifyAsync.mockRejectedValue(new Error('jwt expired'));

			await expect(service.refresh('u1', REFRESH_IN)).rejects.toThrow(
				'Refresh token expirado ou inválido',
			);

			expect(prismaServiceMock.user.findUnique).not.toHaveBeenCalled();
			expect(jwtServiceMock.signAsync).not.toHaveBeenCalled();
			expect(prismaServiceMock.user.update).not.toHaveBeenCalled();
		});

		it('deve falhar se usuário não existir ou não tiver refresh salvo', async () => {
			jwtServiceMock.verifyAsync.mockResolvedValue({});
			prismaServiceMock.user.findUnique.mockResolvedValue({
				...userDb,
				refreshToken: null,
			});

			await expect(service.refresh('u1', REFRESH_IN)).rejects.toBeInstanceOf(
				UnauthorizedException,
			);

			expect(bcrypt.compare).not.toHaveBeenCalled();
			expect(jwtServiceMock.signAsync).not.toHaveBeenCalled();
			expect(prismaServiceMock.user.update).not.toHaveBeenCalled();
		});

		it('deve falhar se o hash não corresponder (refresh inválido)', async () => {
			jwtServiceMock.verifyAsync.mockResolvedValue({});
			prismaServiceMock.user.findUnique.mockResolvedValue({
				...userDb,
				refreshToken: HASHED_REFRESH,
			});
			(bcrypt.compare as jest.Mock).mockResolvedValue(false);

			await expect(service.refresh('u1', REFRESH_IN)).rejects.toBeInstanceOf(
				UnauthorizedException,
			);

			expect(jwtServiceMock.signAsync).not.toHaveBeenCalled();
			expect(prismaServiceMock.user.update).not.toHaveBeenCalled();
		});
	});

	describe('signUp', () => {
		it('deve criar (signUp) um novo usuário com sucesso', async () => {
			const HASHED_PASSWORD = 'hashedNewPassword';
			const EMAIL = 'newuser@example.com';
			const REFRESH_TOKEN = 'new-refresh-token';
			// ARRANGE
			prismaServiceMock.user.findUnique.mockResolvedValue(userDb);
			(bcrypt.hash as jest.Mock).mockResolvedValue(HASHED_PASSWORD);

			prismaServiceMock.user.create.mockResolvedValue(userDb);

			expect(jwtServiceMock.signAsync).toHaveBeenNthCalledWith(
				1,
				{ sub: 'u1', email: EMAIL, type: UserType.STUDENT },
				{
					secret: process.env.JWT_ACCESS_SECRET,
					expiresIn: Number(process.env.ACCESS_TOKEN_TTL),
				},
			);

			// 2ª chamada -> refresh token
			expect(jwtServiceMock.signAsync).toHaveBeenNthCalledWith(
				2,
				{ sub: 'u1', email: EMAIL, type: UserType.STUDENT },
				{
					secret: process.env.JWT_REFRESH_SECRET,
					expiresIn: Number(process.env.REFRESH_TOKEN_TTL),
				},
			);

			expect(bcrypt.hash).toHaveBeenCalledWith(REFRESH_TOKEN, 10);
		});
	});
});
