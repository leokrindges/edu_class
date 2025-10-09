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
import { StudentService } from './student.service';
import { AuthUser } from 'src/auth/decorators/user.decorator';
import { User } from 'src/user/models/user.model';
import { FindAllQueryParamsDto } from './dtos/find-all-query-params.dto';
import { CreateStudentDto } from './dtos/create-student.dto';
import { UpdatedStudentDto } from './dtos/update-student.dto';
import {
	PaginatedStudentResponse,
	StudentResponse,
} from './reponse/student.response';

const route = 'user';
@Controller(route)
@ApiTags(route)
export class StudentController {
	constructor(private readonly _studentService: StudentService) {}

	@Get()
	async findAll(
		@Query() query: FindAllQueryParamsDto,
		@AuthUser() user: User,
	): Promise<PaginatedStudentResponse> {
		const {
			data,
			total,
			page,
			limit,
		} = await this._studentService.findAll(query, user);

		const students = StudentResponse.fromEntities(data);
		return {
			data: students,
			page,
			limit,
			total,
		};
	}

	@Get(':id')
	async findById(
		@Param('id') id: string,
		@AuthUser() user: User,
	): Promise<StudentResponse> {
		const student = await this._studentService.findById(id, user);
		return StudentResponse.fromEntity(student);
	}

	@Post()
	async create(
		@Body() createStudentDto: CreateStudentDto,
	): Promise<StudentResponse> {
		const student = await this._studentService.create(createStudentDto);
		return StudentResponse.fromEntity(student);
	}

	@Patch('restore/:id')
	async restore(
		@Param('id') id: string,
		@AuthUser() user: User,
	): Promise<StudentResponse> {
		const student = await this._studentService.restore(id, user);
		return StudentResponse.fromEntity(student);
	}

	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() updateStudentDto: UpdatedStudentDto,
		@AuthUser() user: User,
	): Promise<StudentResponse> {
		const student = await this._studentService.update(
			id,
			updateStudentDto,
			user,
		);
		return StudentResponse.fromEntity(student);
	}

	@Delete(':id')
	async remove(@Param('id') id: string, @AuthUser() user: User) {
		return this._studentService.remove(id, user);
	}
}
