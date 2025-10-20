import { ApiProperty } from '@nestjs/swagger';
import {
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength,
} from 'class-validator';

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

	@ApiProperty({ example: '50.00', description: 'Price per class' })
	@IsOptional()
	@IsNumber()
	pricePerClass?: number;

	@ApiProperty({ example: 60, description: 'Duration in minutes' })
	@IsOptional()
	@IsNumber()
	durationMin?: number;
}
