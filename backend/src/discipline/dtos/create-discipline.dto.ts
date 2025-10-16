import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateDisciplineDTO {
	@ApiProperty({ example: 'Matemática', description: 'Name of the discipline' })
	@IsString()
	@MaxLength(100)
	@IsNotEmpty()
	name: string;

	@ApiProperty({
		example: 'Discipline description',
		description: 'Description of the discipline',
	})
	@IsString()
	@MaxLength(255)
	@IsOptional()
	description?: string;
}
