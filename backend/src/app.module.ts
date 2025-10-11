import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './database/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD, APP_INTERCEPTOR, Reflector } from '@nestjs/core';
import { CookieJwtGuard } from './auth/decorators/auth.guard';
import { AuthModule } from './auth/auth.module';
import { RolePermissionInterceptor } from './interceptors/role.permission.interceptor';
import { AuthService } from './auth/auth.service';
import { StudentModule } from './student/student.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		PrismaModule,
		AuthModule,
		StudentModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		JwtService,
		{
			provide: APP_GUARD,
			useFactory: (
				reflector: Reflector,
				jwt: JwtService,
				authService: AuthService,
			) => new CookieJwtGuard(reflector, jwt, authService),
			inject: [Reflector, JwtService, AuthService],
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: RolePermissionInterceptor,
		},
	],
})
export class AppModule {}
