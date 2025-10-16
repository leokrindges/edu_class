import { User } from 'src/user/models/user.model';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateStudentDto } from './dtos/create-student.dto';
import { StudentResponse } from './reponse/student.response';
import { Student } from './model/student.model';
import { mockStudent } from 'src/test/student/student.mock';
import { mockUser } from 'src/test/user/user.mock';

describe('StudentController', () => {
	let controller: StudentController;
	let studentService: StudentService;

	const mockStudentService = {
		findAll: jest.fn(),
		findById: jest.fn(),
		create: jest.fn(),
		update: jest.fn(),
		restore: jest.fn(),
		remove: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [StudentController],
			providers: [
				{
					provide: StudentService,
					useValue: mockStudentService,
				},
			],
		}).compile();
		controller = module.get<StudentController>(StudentController);
		studentService = module.get<StudentService>(StudentService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('findAll', () => {
		it('should return paginated students', async () => {
			const mockStudents = [mockStudent];
			mockStudentService.findAll.mockResolvedValue({
				data: mockStudents,
				total: 1,
				page: 1,
				limit: 10,
			});
			const result = await controller.findAll(
				{ page: 1, limit: 10, status: 'ACTIVE', search: '' },
				mockUser,
			);
			expect(result).toEqual({
				data: StudentResponse.fromEntities(mockStudents),
				total: 1,
				page: 1,
				limit: 10,
			});
			expect(studentService.findAll).toHaveBeenCalledWith(
				{ page: 1, limit: 10, status: 'ACTIVE', search: '' },
				mockUser,
			);
		});
	});

	describe('findById', () => {
		it('should return a student by id', async () => {
			const studentId = '1';
			mockStudentService.findById.mockResolvedValue(mockStudent);

			const result = await controller.findById(studentId, mockUser);

			expect(result).toEqual(StudentResponse.fromEntity(mockStudent));
			expect(studentService.findById).toHaveBeenCalledWith(studentId, mockUser);
		});
	});

	describe('create', () => {
		it('should create and return a student', async () => {
			const createStudentDto: CreateStudentDto = {
				email: 'test@student.com',
				name: 'Test Student',
				status: 'ACTIVE',
				notes: undefined,
				phone: undefined,
			};

			mockStudentService.create.mockResolvedValue(mockStudent);

			const result = await controller.create(createStudentDto, mockUser);

			expect(result).toEqual(StudentResponse.fromEntity(mockStudent));
			expect(studentService.create).toHaveBeenCalledWith(
				createStudentDto,
				mockUser,
			);
		});
	});

	describe('update', () => {
		it('should update and return a student', async () => {
			const studentId = '1';
			const updateStudentDto: CreateStudentDto = {
				email: 'test@student.com',
				name: 'Updated Student',
				status: 'ACTIVE',
				notes: undefined,
				phone: undefined,
			};

			mockStudentService.update.mockResolvedValue(mockStudent);

			const result = await controller.update(
				studentId,
				updateStudentDto,
				mockUser,
			);

			expect(result).toEqual(StudentResponse.fromEntity(mockStudent));
			expect(studentService.update).toHaveBeenCalledWith(
				studentId,
				updateStudentDto,
				mockUser,
			);
		});
	});

	describe('restore', () => {
		it('should restore and return a student', async () => {
			const studentId = '1';

			mockStudentService.restore.mockResolvedValue(mockStudent);

			const result = await controller.restore(studentId, mockUser);

			expect(result).toEqual(StudentResponse.fromEntity(mockStudent));
			expect(studentService.restore).toHaveBeenCalledWith(studentId, mockUser);
		});
	});

	describe('remove', () => {
		it('should remove and return a student', async () => {
			const studentId = '1';

			mockStudentService.remove.mockResolvedValue(mockStudent);

			const result = await controller.remove(studentId, mockUser);

			expect(result).toEqual(mockStudent);
			expect(studentService.remove).toHaveBeenCalledWith(studentId, mockUser);
		});
	});
});
