// auth.service.ts
import {
	Injectable,
	BadRequestException,
	UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService,
	) {}

	async signUp(name: string, email: string, password: string) {
		const exists = await this.prisma.teacher.findUnique({ where: { email } });
		if (exists) throw new BadRequestException('Email já cadastrado');

		const passwordHash = await bcrypt.hash(password, 10);
		const teacher = await this.prisma.teacher.create({
			data: { name, email, password: passwordHash },
		});

		const tokens = await this.issueTokens(teacher.id, teacher.email);
		await this.saveRefreshHash(teacher.id, tokens.refreshToken);

		return { teacher, ...tokens };
	}

	async signIn(email: string, password: string) {
		const teacher = await this.prisma.teacher.findUnique({ where: { email } });
		if (!teacher) throw new UnauthorizedException('Credenciais inválidas');

		const ok = await bcrypt.compare(password, teacher.password);
		if (!ok) throw new UnauthorizedException('Credenciais inválidas');

		const tokens = await this.issueTokens(teacher.id, teacher.email);
		await this.saveRefreshHash(teacher.id, tokens.refreshToken);
		return {
			teacher,
			...tokens,
		};
	}

	async signOut(teacherId: string) {
		await this.prisma.teacher.update({
			where: { id: teacherId },
			data: { refreshToken: null },
		});
	}

	async refresh(teacherId: string, refreshToken: string) {
		const teacher = await this.getTeacherById(teacherId);
		if (!teacher || !teacher.refreshToken) throw new UnauthorizedException();

		const matches = await bcrypt.compare(refreshToken, teacher.refreshToken);
		if (!matches) throw new UnauthorizedException();

		const tokens = await this.issueTokens(teacher.id, teacher.email);
		await this.saveRefreshHash(teacher.id, tokens.refreshToken);
		return tokens;
	}

	private async issueTokens(sub: string, email: string) {
		const access = await this.jwt.signAsync(
			{ sub, email },
			{
				secret: process.env.JWT_ACCESS_SECRET,
				expiresIn: Number(process.env.ACCESS_TOKEN_TTL) || 900,
			},
		);
		const refresh = await this.jwt.signAsync(
			{ sub, email },
			{
				secret: process.env.JWT_REFRESH_SECRET,
				expiresIn: Number(process.env.REFRESH_TOKEN_TTL) || 604800,
			},
		);
		return { accessToken: access, refreshToken: refresh };
	}

	private async saveRefreshHash(teacherId: string, refreshToken: string) {
		const hash = await bcrypt.hash(refreshToken, 10);
		await this.prisma.teacher.update({
			where: { id: teacherId },
			data: { refreshToken: hash },
		});
	}

	async getTeacherById(id: string) {
		return this.prisma.teacher.findUnique({ where: { id } });
	}
}
