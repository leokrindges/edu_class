// auth.service.ts
import {
	Injectable,
	BadRequestException,
	UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { SignUpDto } from './dtos/sign-up.dto';
import { SignInDto } from './dtos/sign-in.dto';

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService,
	) {}

	async signUp(dto: SignUpDto) {
		const { name, email, password, type } = dto;
		const exists = await this.prisma.user.findUnique({ where: { email } });
		if (exists) throw new BadRequestException('Email já cadastrado');

		const passwordHash = await bcrypt.hash(password, 10);
		const user = await this.prisma.user.create({
			data: { name, email, password: passwordHash, type },
			select: {
				id: true,
				name: true,
				email: true,
				type: true,
				createdAt: true,
				isAdmin: true,
				role: true,
				updatedAt: true,
			},
		});

		const tokens = await this.issueTokens({
			sub: user.id,
			email: user.email,
			type: user.type,
		});
		await this.saveRefreshHash(user.id, tokens.refreshToken);

		return { user, ...tokens };
	}

	async signIn(dto: SignInDto) {
		const { email, password } = dto;
		const user = await this.prisma.user.findUnique({ where: { email } });
		if (!user) throw new UnauthorizedException('Credenciais inválidas');

		const ok = await bcrypt.compare(password, user.password);
		if (!ok) throw new UnauthorizedException('Credenciais inválidas');

		const tokens = await this.issueTokens({
			sub: user.id,
			email: user.email,
			type: user.type,
		});
		await this.saveRefreshHash(user.id, tokens.refreshToken);
		return {
			user,
			...tokens,
		};
	}

	async signOut(userId: string) {
		await this.prisma.user.update({
			where: { id: userId },
			data: { refreshToken: null },
		});
	}

	async refresh(userId: string, refreshToken: string) {
		try {
			await this.jwt.verifyAsync(refreshToken, {
				secret: process.env.JWT_REFRESH_SECRET,
			});
		} catch (err) {
			throw new UnauthorizedException('Refresh token expirado ou inválido');
		}
		const user = await this.getUserById(userId);
		if (!user || !user.refreshToken) throw new UnauthorizedException();

		const matches = await bcrypt.compare(refreshToken, user.refreshToken);
		if (!matches) throw new UnauthorizedException();

		const tokens = await this.issueTokens({
			sub: user.id,
			email: user.email,
			type: user.type,
		});
		await this.saveRefreshHash(user.id, tokens.refreshToken);
		return tokens;
	}

	private async issueTokens(payload: JwtPayload) {
		const { sub, email, type } = payload;
		const access = await this.jwt.signAsync(
			{ sub, email, type },
			{
				secret: process.env.JWT_ACCESS_SECRET,
				expiresIn: Number(process.env.ACCESS_TOKEN_TTL),
			},
		);
		const refresh = await this.jwt.signAsync(
			{ sub, email, type },
			{
				secret: process.env.JWT_REFRESH_SECRET,
				expiresIn: Number(process.env.REFRESH_TOKEN_TTL),
			},
		);
		return { accessToken: access, refreshToken: refresh };
	}

	private async saveRefreshHash(userId: string, refreshToken: string) {
		const hash = await bcrypt.hash(refreshToken, 10);
		await this.prisma.user.update({
			where: { id: userId },
			data: { refreshToken: hash },
		});
	}

	async getUserById(id: string) {
		return this.prisma.user.findUnique({ where: { id, deletedAt: null } });
	}
}
