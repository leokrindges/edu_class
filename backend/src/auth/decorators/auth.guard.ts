import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { IS_PUBLIC_KEY } from './public.decorator';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class CookieJwtGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private jwt: JwtService,
		private authService: AuthService,
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
			const user = await this.authService.getUserById(payload.sub);
			if (!user) throw new UnauthorizedException();
			const { password, refreshToken, ...userData } = user;
			req.user = userData;
			return true;
		} catch {
			throw new UnauthorizedException('Invalid or expired token');
		}
	}
}
