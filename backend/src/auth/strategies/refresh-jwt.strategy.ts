import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy, StrategyOptionsWithRequest } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

function refreshCookieExtractor(req: Request) {
	return req?.cookies?.['refresh_token'] ?? null;
}

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
	Strategy,
	'jwt-refresh',
) {
	constructor(private readonly authService: AuthService) {
		super({
			jwtFromRequest: refreshCookieExtractor,
			secretOrKey: process.env.JWT_REFRESH_SECRET,
			passReqToCallback: true,
		} as StrategyOptionsWithRequest);
	}

	async validate(req: Request, payload: JwtPayload) {
		console.log('Payload recebido no RefreshJwtStrategy:', payload);
		const refreshToken = refreshCookieExtractor(req);
		if (!refreshToken) throw new UnauthorizedException('No refresh token');
		console.log('Refresh token extraído:', refreshToken);
		const teacher = await this.authService.getUserById(payload.sub);

		if (!teacher) throw new UnauthorizedException();

		return teacher;
	}
}
