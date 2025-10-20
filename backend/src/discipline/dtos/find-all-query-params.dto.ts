import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.common.dto';

export class FindAllQueryParamsDto extends PaginationQueryDto {
	@ApiPropertyOptional({
		description: 'Search by name or email',
		example: 'João Silva',
	})
	@IsOptional()
	@IsString()
	search?: string;
}
