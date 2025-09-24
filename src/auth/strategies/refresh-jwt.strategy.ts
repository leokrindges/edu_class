import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy, StrategyOptionsWithRequest } from 'passport-jwt';

function refreshCookieExtractor(req: Request) {
	return req?.cookies?.['refresh_token'] ?? null;
}

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
	Strategy,
	'jwt-refresh',
) {
	constructor() {
		super({
			jwtFromRequest: refreshCookieExtractor,
			secretOrKey: process.env.JWT_REFRESH_SECRET,
			passReqToCallback: true,
		} as StrategyOptionsWithRequest);
	}

	async validate(req: Request, payload: { sub: string; email: string }) {
		const refreshToken = refreshCookieExtractor(req);
		return { teacherId: payload.sub, email: payload.email, refreshToken };
	}
}
