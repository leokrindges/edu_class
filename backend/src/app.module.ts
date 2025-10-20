import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './database/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { CookieJwtGuard } from './auth/decorators/auth.guard';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { StudentModule } from './student/student.module';
import { DisciplineModule } from './discipline/discipline.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		PrismaModule,
		AuthModule,
		StudentModule,
		DisciplineModule,
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
	],
})
export class AppModule {}
