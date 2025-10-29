import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

const config = {
	envMode: process.env.NODE_ENV || 'development',
};

const origins = (process.env.CORS_ORIGIN ?? '')
	.split(',')
	.map((s) => s.trim())
	.filter(Boolean);

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: false,
			transform: true,
			disableErrorMessages: false,
		}),
	);

	app.enableCors({
		origin: origins.length ? origins : [/^https?:\/\/localhost:\d+$/],
		credentials: true,
		methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'X-CSRF-Token'],
	});

	app.use(cookieParser());
	// app.set('trust proxy', 1);

	if (config.envMode === 'development') {
		const swaggerConfig = new DocumentBuilder()
			.setTitle('Edu Class API')
			.setDescription('The Edu Class API description')
			.setVersion('1.0')
			.build();

		const document = SwaggerModule.createDocument(app, swaggerConfig);
		SwaggerModule.setup('api', app, document);
	}

	const port = Number(process.env.PORT ?? 3000);
	await app.listen(port, '0.0.0.0');
}
bootstrap();
