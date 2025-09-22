import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const config = {
	envMode: process.env.MODE_ENV || 'development',
};

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	if (config.envMode === 'development') {
		const swaggerConfig = new DocumentBuilder()
			.setTitle('Edu Class API')
			.setDescription('The Edu Class API description')
			.setVersion('1.0')
			.build();

		const document = SwaggerModule.createDocument(app, swaggerConfig);
		SwaggerModule.setup('api', app, document);
	}
	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
