import { StudentStatus } from '@prisma/client';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.common.dto';

export class FindAllQueryParamsDto extends PaginationQueryDto {
	search?: string;
	status?: StudentStatus;
}
