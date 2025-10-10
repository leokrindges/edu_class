import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Student } from '../model/student.model';
import { CreateStudentDto } from '../dtos/create-student.dto';
import { UpdatedStudentDto } from '../dtos/update-student.dto';
import { FindAllQueryParamsDto } from '../dtos/find-all-query-params.dto';
import { Prisma } from '@prisma/client';
import { User } from 'src/user/models/user.model';

@Injectable()
export class StudentRepository {
	constructor(private readonly _prisma: PrismaService) {}

	async findAll(
		params: FindAllQueryParamsDto,
		user: User,
	): Promise<{ data: Student[]; total: number }> {
		const { page, limit, search, status } = params;

		const where: Prisma.StudentWhereInput = {
			deletedAt: null,
			enrollments: { some: { teacher: { userId: user.id } } },
		};

		if (search) {
			where.name = { contains: search, mode: 'insensitive' };
		}

		if (status) {
			where.status = status;
		}

		const [data, total] = await this._prisma.$transaction([
			this._prisma.student.findMany({
				where,
				skip: page && limit ? (page - 1) * limit : undefined,
				take: limit,
				orderBy: { createdAt: 'desc' },
			}),
			this._prisma.student.count({ where }),
		]);
		return { data, total };
	}

	async findById(id: Student['id'], user: User): Promise<Student | null> {
		return this._prisma.student.findUnique({
			where: {
				id,
				deletedAt: null,
				enrollments: { some: { teacher: { userId: user.id } } },
			},
		});
	}

	async create(data: CreateStudentDto, user: User): Promise<Student> {
		if (!user.teacher) {
			throw new BadRequestException('Usuário não é um professor');
		}
		const student = await this._prisma.student.create({ data });
		await this._prisma.enrollment.create({
			data: {
				studentId: student.id,
				teacherId: user.teacher.id,
			},
		});
		return student;
	}

	async update(
		id: Student['id'],
		data: UpdatedStudentDto,
		user: User,
	): Promise<Student> {
		return this._prisma.student.update({
			where: {
				id,
				deletedAt: null,
				enrollments: { some: { teacher: { userId: user.id } } },
			},
			data,
		});
	}

	async delete(id: Student['id'], user: User): Promise<void> {
		await this._prisma.student.update({
			where: { id, enrollments: { some: { teacher: { userId: user.id } } } },
			data: { deletedAt: new Date() },
		});
	}

	async restore(id: Student['id'], user: User): Promise<Student> {
		return this._prisma.student.update({
			where: { id, enrollments: { some: { teacher: { userId: user.id } } } },
			data: { deletedAt: null },
		});
	}
}
