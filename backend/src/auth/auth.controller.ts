import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	Res,
	UseGuards,
} from '@nestjs/common';
import { Public } from './decorators/public.decorator';
import { SignInDto } from 'src/auth/dtos/sign-in.dto';
import { AuthUser } from './decorators/user.decorator';
import { RefreshJwtGuard } from 'src/auth/guards/refresh-jwt.guard';
import { SignUpDto } from 'src/auth/dtos/sign-up.dto';
import type { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

function cookieOpts() {
	const secure = process.env.COOKIE_SECURE === 'true';
	return {
		httpOnly: true,
		secure,
		sameSite: secure ? ('strict' as const) : ('lax' as const),
		path: '/',
	};
}
const route = 'auth';
@ApiTags(route)
@Controller(route)
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@Post('signup')
	async signUp(
		@Body() dto: SignUpDto,
		@Res({ passthrough: true }) res: Response,
	) {
		const { user, accessToken, refreshToken } =
			await this.authService.signUp(dto);
		res.cookie('access_token', accessToken, {
			...cookieOpts(),
			maxAge: 1000 * Number(process.env.ACCESS_TOKEN_TTL),
		});
		res.cookie('refresh_token', refreshToken, {
			...cookieOpts(),
			maxAge: 1000 * Number(process.env.REFRESH_TOKEN_TTL),
		});
		return { user };
	}

	@Public()
	@Post('signin')
	async signIn(
		@Body() dto: SignInDto,
		@Res({ passthrough: true }) res: Response,
	) {
		const { user, accessToken, refreshToken } =
			await this.authService.signIn(dto);
		res.cookie('access_token', accessToken, {
			...cookieOpts(),
			maxAge: 1000 * Number(process.env.ACCESS_TOKEN_TTL),
		});
		res.cookie('refresh_token', refreshToken, {
			...cookieOpts(),
			maxAge: 1000 * Number(process.env.REFRESH_TOKEN_TTL),
		});
		return { message: 'Teacher created', teacher: user };
	}

	@HttpCode(200)
	@Post('signout')
	async signOut(
		@AuthUser() user: { id: string },
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
		@AuthUser() user: User,
		@Res({ passthrough: true }) res: Response,
	) {
		const { accessToken, refreshToken } = await this.authService.refresh(
			user.id,
			res.req.cookies['refresh_token'],
		);
		res.cookie('access_token', accessToken, {
			...cookieOpts(),
			maxAge: 1000 * Number(process.env.ACCESS_TOKEN_TTL),
		});
		res.cookie('refresh_token', refreshToken, {
			...cookieOpts(),
			maxAge: 1000 * Number(process.env.REFRESH_TOKEN_TTL),
		});
		return { ok: true };
	}

	@Get('me')
	async me(@AuthUser() user: User) {
		return user;
	}
}
