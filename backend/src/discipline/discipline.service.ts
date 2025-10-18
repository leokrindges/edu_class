import { Injectable, NotFoundException } from '@nestjs/common';
import { DisciplineRepository } from './repositories/discipline.repository';
import { CreateDisciplineDTO } from './dtos/create-discipline.dto';
import { UpdateDisciplineDTO } from './dtos/update-discipline.dto';
import { FindAllQueryParamsDto } from './dtos/find-all-query-params.dto';
import { Discipline } from './model/discipline.model';
import { ApiResponsePaginated } from 'src/common/api-response/api-response.common';

@Injectable()
export class DisciplineService {
	constructor(private readonly _disciplineRepository: DisciplineRepository) {}

	async create(
		dto: CreateDisciplineDTO,
		teacherId: string,
	): Promise<Discipline> {
		return this._disciplineRepository.create(dto, teacherId);
	}

	async findById(id: string, teacherId: string): Promise<Discipline> {
		const discipline = await this._disciplineRepository.findById(id, teacherId);

		if (!discipline) throw new NotFoundException('Discipline not found');

		return discipline;
	}

	async findAll(
		teacherId: string,
		query: FindAllQueryParamsDto,
	): Promise<ApiResponsePaginated<Discipline>> {
		const { data, total } = await this._disciplineRepository.findAll(
			teacherId,
			query,
		);
		return {
			data,
			total,
			page: query.page || 1,
			limit: query.limit || 10,
		};
	}

	async findTeachersByDisciplineId(disciplineId: string, teacherId: string) {
		await this.findById(disciplineId, teacherId);
		return this._disciplineRepository.findTeachersByDisciplineId(
			disciplineId,
			teacherId,
		);
	}

	async update(
		id: string,
		dto: UpdateDisciplineDTO,
		teacherId: string,
	): Promise<Discipline> {
		await this.findById(id, teacherId);
		return this._disciplineRepository.update(id, dto, teacherId);
	}

	async softDelete(id: string, teacherId: string): Promise<void> {
		await this.findById(id, teacherId);
		return this._disciplineRepository.softDelete(id, teacherId);
	}
}
