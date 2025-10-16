import { Injectable, NotFoundException } from '@nestjs/common';
import { DisciplineRepository } from './repositories/discipline.repository';
import { CreateDisciplineDTO } from './dtos/create-discipline.dto';
import { UpdateDisciplineDTO } from './dtos/update-discipline.dto';

@Injectable()
export class DisciplineService {
	constructor(private readonly _disciplineRepository: DisciplineRepository) {}

	async create(dto: CreateDisciplineDTO, teacherId: string) {
		return this._disciplineRepository.create(dto, teacherId);
	}

	async findById(id: string, teacherId: string) {
		const discipline = await this._disciplineRepository.findById(id, teacherId);

		if (!discipline) throw new NotFoundException('Discipline not found');

		return discipline;
	}

	async findAll(teacherId: string) {
		return this._disciplineRepository.findAll(teacherId);
	}

	async findTeachersByDisciplineId(disciplineId: string, teacherId: string) {
		await this.findById(disciplineId, teacherId);
		return this._disciplineRepository.findTeachersByDisciplineId(
			disciplineId,
			teacherId,
		);
	}

	async update(id: string, dto: UpdateDisciplineDTO, teacherId: string) {
		await this.findById(id, teacherId);
		return this._disciplineRepository.update(id, dto, teacherId);
	}

	async softDelete(id: string, teacherId: string) {
		await this.findById(id, teacherId);
		return this._disciplineRepository.softDelete(id, teacherId);
	}
}
