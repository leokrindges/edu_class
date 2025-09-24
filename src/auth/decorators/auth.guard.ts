import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { IS_PUBLIC_KEY } from './public.decorator';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CookieJwtGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private jwt: JwtService,
	) {}
	async canActivate(ctx: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			ctx.getHandler(),
			ctx.getClass(),
		]);
		if (isPublic) return true;

		const req = ctx.switchToHttp().getRequest();
		const token = req.cookies?.['access_token'];
		if (!token) throw new UnauthorizedException('Missing access token');

		try {
			const payload = await this.jwt.verifyAsync(token, {
				secret: process.env.JWT_ACCESS_SECRET,
			});
			req.user = { id: payload.sub, email: payload.email };
			return true;
		} catch {
			throw new UnauthorizedException('Invalid or expired token');
		}
	}
}
