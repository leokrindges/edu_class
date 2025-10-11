import { ApiPropertyOptional } from '@nestjs/swagger';
import { StudentStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.common.dto';

export class FindAllQueryParamsDto extends PaginationQueryDto {
	@ApiPropertyOptional({
		description: 'Search by name or email',
		example: 'João Silva',
	})
	@IsOptional()
	@IsString()
	search?: string;

	@ApiPropertyOptional({
		description: 'Filter by student status',
		example: 'ACTIVE',
		enum: StudentStatus,
	})
	@IsOptional()
	@IsEnum(StudentStatus)
	status?: StudentStatus;
}
