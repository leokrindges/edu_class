import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DisciplineService } from './discipline.service';
import { CreateDisciplineDTO } from './dtos/create-discipline.dto';
import { AuthUser } from 'src/auth/decorators/user.decorator';
import { User } from 'src/user/models/user.model';
import { UpdateDisciplineDTO } from './dtos/update-discipline.dto';
import { FindAllQueryParamsDto } from './dtos/find-all-query-params.dto';
import { ApiResponsePaginated } from 'src/common/api-response/api-response.common';
import { Discipline } from './model/discipline.model';

const route = 'disciplines';
@Controller(route)
@ApiTags(route)
export class DisciplineController {
	constructor(private readonly _disciplineService: DisciplineService) {}

	@Post()
	async create(
		@Body() body: CreateDisciplineDTO,
		@AuthUser() user: User,
	): Promise<Discipline> {
		return this._disciplineService.create(body, user.teacher?.id!);
	}

	@Get()
	async findAll(
		@Query() query: FindAllQueryParamsDto,
		@AuthUser() user: User,
	): Promise<ApiResponsePaginated<Discipline>> {
		return this._disciplineService.findAll(user.teacher?.id!, query);
	}

	@Get(':id')
	async findOne(
		@Param('id') id: string,
		@AuthUser() user: User,
	): Promise<Discipline> {
		return this._disciplineService.findById(id, user.teacher?.id!);
	}

	@Get(':id/teachers')
	async findTeachers(@Param('id') id: string, @AuthUser() user: User) {
		return this._disciplineService.findTeachersByDisciplineId(
			id,
			user.teacher?.id!,
		);
	}

	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() body: UpdateDisciplineDTO,
		@AuthUser() user: User,
	): Promise<Discipline> {
		return this._disciplineService.update(id, body, user.teacher?.id!);
	}

	@Delete(':id')
	async delete(@Param('id') id: string, @AuthUser() user: User) {
		return this._disciplineService.softDelete(id, user.teacher?.id!);
	}
}
