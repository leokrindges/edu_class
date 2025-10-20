import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateDisciplineDTO } from '../dtos/create-discipline.dto';
import { Discipline } from '../model/discipline.model';
import { Teacher } from 'src/teacher/model/teacher.model';
import { UpdateDisciplineDTO } from '../dtos/update-discipline.dto';
import { FindAllQueryParamsDto } from '../dtos/find-all-query-params.dto';
import { Prisma, Discipline as PrismaDiscipline } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class DisciplineRepository {
	constructor(private readonly _prisma: PrismaService) {}

	private toDomain(d: PrismaDiscipline): Discipline {
		return {
			id: d.id,
			name: d.name,
			description: d.description,
			teacherId: d.teacherId,
			pricePerClass: d.pricePerClass !== null ? Number(d.pricePerClass) : null,
			currency: d.currency,
			durationMin: d.durationMin,
			createdAt: d.createdAt,
			updatedAt: d.updatedAt,
			deletedAt: d.deletedAt,
		};
	}

	async create(
		dto: CreateDisciplineDTO,
		teacherId: string,
	): Promise<Discipline> {
		const discipline = await this._prisma.discipline.create({
			data: {
				...dto,
				...(dto.pricePerClass !== undefined &&
					dto.pricePerClass !== null && {
						pricePerClass: new Decimal(dto.pricePerClass),
					}),
				teacher: { connect: { id: teacherId } },
			},
		});
		return this.toDomain(discipline);
	}

	async findById(id: string, teacherId: string): Promise<Discipline | null> {
		const discipline = await this._prisma.discipline.findFirst({
			where: { id, teacherId, deletedAt: null },
		});
		return discipline ? this.toDomain(discipline) : null;
	}

	async findAll(
		teacherId: string,
		query: FindAllQueryParamsDto,
	): Promise<{ data: Discipline[]; total: number }> {
		const { limit, page, search } = query;
		const where: Prisma.DisciplineWhereInput = {
			deletedAt: null,
			teacherId,
			...(search && { name: { contains: search, mode: 'insensitive' } }),
		};

		const [data, total] = await this._prisma.$transaction([
			this._prisma.discipline.findMany({
				where,
				skip: page && limit ? (page - 1) * limit : undefined,
				take: limit,
				orderBy: { createdAt: 'desc' },
			}),
			this._prisma.discipline.count({ where }),
		]);

		return { data: data.map((d) => this.toDomain(d)), total };
	}

	async findTeachersByDisciplineId(
		disciplineId: string,
		teacherId: string,
	): Promise<Teacher | null> {
		const discipline = await this._prisma.discipline.findUnique({
			where: { id: disciplineId, teacherId },
			include: { teacher: true },
		});
		return discipline?.teacher || null;
	}

	async update(
		id: string,
		dto: UpdateDisciplineDTO,
		teacherId: string,
	): Promise<Discipline> {
		const discipline = await this._prisma.discipline.update({
			where: { id, teacherId },
			data: dto,
		});
		return this.toDomain(discipline);
	}

	async softDelete(id: string, teacherId: string): Promise<void> {
		await this._prisma.discipline.update({
			where: { id, teacherId },
			data: { deletedAt: new Date() },
		});
	}
}
