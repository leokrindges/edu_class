import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { StudentRepository } from './repositories/student.repository';
import { User } from 'src/user/models/user.model';
import { FindAllQueryParamsDto } from './dtos/find-all-query-params.dto';
import { Student } from './model/student.model';
import { CreateStudentDto } from './dtos/create-student.dto';
import { UpdatedStudentDto } from './dtos/update-student.dto';

@Injectable()
export class StudentService {
	constructor(private readonly _studentRepository: StudentRepository) {}

	async findAll(
		params: FindAllQueryParamsDto,
		user: User,
	): Promise<{
		data: Student[];
		total: number;
		page: number;
		limit: number;
	}> {
		const { data, total } = await this._studentRepository.findAll(
			params,
			user,
		);
		return {
			data,
			total,
			page: params.page ?? 1,
			limit: params.limit ?? 20,
		};
	}

	async findById(id: Student['id'], user: User): Promise<Student> {
		const student = await this._studentRepository.findById(id, user);

		if (!student) throw new NotFoundException('Student not found');
		return student;
	}

	async create(dto: CreateStudentDto, user: User): Promise<Student> {
		return this._studentRepository.create(dto, user);
	}

	async update(
		id: Student['id'],
		dto: UpdatedStudentDto,
		user: User,
	): Promise<Student> {
		await this.findById(id, user);
		return this._studentRepository.update(id, dto, user);
	}

	async remove(id: Student['id'], user: User): Promise<void> {
		await this.findById(id, user);
		await this._studentRepository.delete(id, user);
	}

	async restore(id: Student['id'], user: User): Promise<Student> {
		await this.findById(id, user);
		return await this._studentRepository.restore(id, user);
	}
}
