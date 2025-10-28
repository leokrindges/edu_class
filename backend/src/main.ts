import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

const config = {
	envMode: process.env.NODE_ENV || 'development',
};

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

	app.use(cookieParser());

	app.enableCors({
		origin: ['https://edu-class-mocha.vercel.app'],
		credentials: true,
	});

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
