import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './database/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { CookieJwtGuard } from './auth/decorators/auth.guard';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		PrismaModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		JwtService,
		{
			provide: APP_GUARD,
			useFactory: (reflector: Reflector, jwt: JwtService) =>
				new CookieJwtGuard(reflector, jwt),
			inject: [Reflector, JwtService],
		},
	],
})
export class AppModule {}
