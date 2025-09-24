import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class SignInDto {
	@ApiProperty({
		description: 'Email of the teacher',
		example: 'john.doe@example.com',
	})
	@IsEmail()
	@IsNotEmpty()
	@IsEmail()
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
