import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy, StrategyOptionsWithRequest } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

function cookieExtractor(req: Request) {
	return req?.cookies?.['access_token'] ?? null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(private readonly authService: AuthService) {
		super({
			jwtFromRequest: cookieExtractor,
			secretOrKey: process.env.JWT_ACCESS_SECRET,
		} as StrategyOptionsWithRequest);
	}

	async validate(payload: JwtPayload) {
		const teacher = await this.authService.getTeacherById(payload.sub);
		if (!teacher) throw new UnauthorizedException();
		return teacher;
	}
}
