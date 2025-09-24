import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy, StrategyOptionsWithRequest } from 'passport-jwt';

function cookieExtractor(req: Request) {
	return req?.cookies?.['access_token'] ?? null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor() {
		super({
			jwtFromRequest: cookieExtractor,
			secretOrKey: process.env.JWT_ACCESS_SECRET,
		} as StrategyOptionsWithRequest);
	}

	async validate(payload: { sub: string; email: string }) {
		return { teacherId: payload.sub, email: payload.email };
	}
}
