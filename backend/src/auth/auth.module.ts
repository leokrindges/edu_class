import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/database/prisma.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
	imports: [JwtModule.register({})],
	controllers: [AuthController],
	providers: [AuthService, PrismaService, JwtStrategy, RefreshJwtStrategy],
	exports: [AuthService],
})
export class AuthModule {}
