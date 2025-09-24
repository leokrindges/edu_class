import {
	Body,
	Controller,
	HttpCode,
	Post,
	Res,
	UseGuards,
} from '@nestjs/common';
import { Public } from './decorators/public.decorator';
import { SignInDto } from 'src/auth/dtos/sign-in.dto';
import { CurrentTeacher } from './decorators/current-teacher.decorator';
import { RefreshJwtGuard } from 'src/auth/guards/refresh-jwt.guard';
import { SignUpDto } from 'src/auth/dtos/sign-up.dto';
import type { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Teacher } from 'src/teacher/entities/teacher.entity';

function cookieOpts() {
	const secure = process.env.COOKIE_SECURE === 'true';
	return {
		httpOnly: true,
		secure,
		sameSite: secure ? ('strict' as const) : ('lax' as const),
		path: '/',
	};
}
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@Post('signup')
	async signUp(
		@Body() dto: SignUpDto,
		@Res({ passthrough: true }) res: Response,
	) {
		const { teacher, accessToken, refreshToken } =
			await this.authService.signUp(dto.name, dto.email, dto.password);
		res.cookie('access_token', accessToken, {
			...cookieOpts(),
			maxAge: 1000 * (Number(process.env.ACCESS_TOKEN_TTL) || 900),
		});
		res.cookie('refresh_token', refreshToken, {
			...cookieOpts(),
			maxAge: 1000 * (Number(process.env.REFRESH_TOKEN_TTL) || 604800),
		});
		return { teacher };
	}

	@Public()
	@Post('signin')
	async signIn(
		@Body() dto: SignInDto,
		@Res({ passthrough: true }) res: Response,
	) {
		const { teacher, accessToken, refreshToken } =
			await this.authService.signIn(dto.email, dto.password);
		res.cookie('access_token', accessToken, {
			...cookieOpts(),
			maxAge: 1000 * (Number(process.env.ACCESS_TOKEN_TTL) || 900),
		});
		res.cookie('refresh_token', refreshToken, {
			...cookieOpts(),
			maxAge: 1000 * (Number(process.env.REFRESH_TOKEN_TTL) || 604800),
		});
		return { message: 'Teacher created', teacher };
	}

	@HttpCode(200)
	@Post('signout')
	async signOut(
		@CurrentTeacher() user: { id: string },
		@Res({ passthrough: true }) res: Response,
	) {
		await this.authService.signOut(user.id);
		res.clearCookie('access_token', { path: '/' });
		res.clearCookie('refresh_token', { path: '/' });
		return { ok: true };
	}

	@Public()
	@UseGuards(RefreshJwtGuard)
	@Post('refresh')
	async refresh(
		@CurrentTeacher() teacher: Teacher,
		@Res({ passthrough: true }) res: Response,
	) {
		const { accessToken, refreshToken } = await this.authService.refresh(
			teacher.id,
			res.req.cookies['refresh_token'],
		);
		res.cookie('access_token', accessToken, {
			...cookieOpts(),
			maxAge: 1000 * (Number(process.env.ACCESS_TOKEN_TTL) || 900),
		});
		res.cookie('refresh_token', refreshToken, {
			...cookieOpts(),
			maxAge: 1000 * (Number(process.env.REFRESH_TOKEN_TTL) || 604800),
		});
		return { ok: true };
	}
}
