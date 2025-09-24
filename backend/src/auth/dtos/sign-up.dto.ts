import { ApiProperty } from '@nestjs/swagger';
import {
	IsEmail,
	IsNotEmpty,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator';

export class SignUpDto {
	@ApiProperty({
		description: 'Name of the teacher',
		example: 'John Doe',
	})
	@IsString()
	@IsNotEmpty()
	@MaxLength(100)
	name: string;

	@ApiProperty({
		description: 'Email of the teacher',
		example: 'john.doe@example.com',
	})
	@IsEmail()
	@IsNotEmpty()
	@MaxLength(100)
	email: string;

	@ApiProperty({
		description: 'Password of the teacher',
		example: 'strongPassword123',
	})
	@IsString()
	@IsNotEmpty()
	@MinLength(6)
	password: string;
}
