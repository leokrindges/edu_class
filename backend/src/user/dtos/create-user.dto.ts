import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserType } from '@prisma/client';
import {
	IsDateString,
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
	MinLength,
} from 'class-validator';

export class CreateUserDto {
	@ApiProperty({
		description: 'User name',
		example: 'User Test',
	})
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty({
		description: 'User email',
		example: 'user@test.com',
	})
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty({
		description: 'User password',
		example: 'correct_password',
	})
	@IsString()
	@IsNotEmpty()
	@MinLength(6)
	password: string;

	@ApiProperty({
		description: 'User type',
		example: UserType.STUDENT,
	})
	@IsNotEmpty()
	@IsEnum(UserType)
	type: UserType;

	@ApiPropertyOptional({
		description: 'User phone',
		example: '+5511999999999',
	})
	@IsString()
	@IsOptional()
	phone: string | null;

	@ApiPropertyOptional({
		description: 'User address',
		example: 'Rua Teste, 123',
	})
	@IsString()
	@IsOptional()
	address: string | null;

	@ApiPropertyOptional({
		description: 'User birth date',
		example: '2000-01-01',
	})
	@IsOptional()
	@IsDateString()
	birthDate: Date | null;
}
