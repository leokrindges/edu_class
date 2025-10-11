import { StudentStatus } from '@prisma/client';
import { Student } from './model/student.model';
import { StudentRepository } from './repositories/student.repository';
import { StudentService } from './student.service';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/user/models/user.model';
import { CreateStudentDto } from './dtos/create-student.dto';
import { StudentResponse } from './reponse/student.response';
import { NotFoundException } from '@nestjs/common';

describe('StudentService', () => {
	let service: StudentService;
	let studentRepository: StudentRepository;

	const mockStudent: Student = {
		id: '1',
		name: 'Test Student',
		email: 'test@student.com',
		notes: null,
		phone: null,
		avatar: null,
		birthDate: null,
		status: StudentStatus.ACTIVE,
		createdAt: new Date(),
		updatedAt: new Date(),
		deletedAt: null,
	};

	const mockUser: User = {
		id: '1',
		email: 'itest@student.com',
		name: 'Test User',
		createdAt: new Date(),
		updatedAt: new Date(),
		type: 'STUDENT',
		isAdmin: false,
		password: 'hashedPassword',
		avatar: null,
		phone: null,
		address: null,
		birthDate: null,
		roleId: null,
		refreshToken: null,
	};

	const mockStudentRepository = {
		findAll: jest.fn(),
		findById: jest.fn(),
		create: jest.fn(),
		update: jest.fn(),
		delete: jest.fn(),
		restore: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				StudentService,
				{ provide: StudentRepository, useValue: mockStudentRepository },
			],
		}).compile();

		service = module.get<StudentService>(StudentService);
		studentRepository = module.get<StudentRepository>(StudentRepository);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe('findAll', () => {
		it('should return paginated students', async () => {
			const mockStudents = [mockStudent];
			mockStudentRepository.findAll.mockResolvedValue({
				data: mockStudents,
				total: 1,
			});
			const result = await service.findAll({ page: 1, limit: 10 }, mockUser);
			expect(result).toEqual({
				data: mockStudents,
				total: 1,
				page: 1,
				limit: 10,
			});
		});
	});

	describe('findById', () => {
		it('should return student by id', async () => {
			mockStudentRepository.findById.mockResolvedValue(mockStudent);
			const result = await service.findById('1', mockUser);
			expect(result).toEqual(mockStudent);
		});

		it('should throw an error if student not found', async () => {
			mockStudentRepository.findById.mockResolvedValue(null);
			await expect(service.findById('1', mockUser)).rejects.toThrow(
				new NotFoundException('Student not found'),
			);
		});
	});

	describe('create', () => {
		it('should create and return a new student', async () => {
			const createStudentDto: CreateStudentDto = {
				name: 'New Student',
				email: 'new@student.com',
				status: StudentStatus.ACTIVE,
			};
			mockStudentRepository.create.mockResolvedValue(mockStudent);
			const result = await service.create(createStudentDto, mockUser);

			expect(studentRepository.create).toHaveBeenCalledWith(
				createStudentDto,
				mockUser,
			);
			expect(result).toEqual(mockStudent);
		});
	});

	describe('restore', () => {
		it('should restore and return the student', async () => {
			mockStudentRepository.findById.mockResolvedValue(mockStudent);
			mockStudentRepository.restore.mockResolvedValue(mockStudent);
			const result = await service.restore('1', mockUser);

			expect(studentRepository.findById).toHaveBeenCalledWith('1', mockUser);
			expect(studentRepository.restore).toHaveBeenCalledWith('1', mockUser);
			expect(result).toEqual(mockStudent);
		});
	});

	describe('update', () => {
		it('should update and return the student', async () => {
			const updateStudentDto = {
				name: 'Updated Student',
				email: 'updated@student.com',
				status: StudentStatus.ACTIVE,
			};
			mockStudentRepository.findById.mockResolvedValue(mockStudent);

			mockStudentRepository.update.mockResolvedValue(mockStudent);
			const result = await service.update('1', updateStudentDto, mockUser);

			expect(studentRepository.findById).toHaveBeenCalledWith('1', mockUser);
			expect(studentRepository.update).toHaveBeenCalledWith(
				'1',
				updateStudentDto,
				mockUser,
			);
			expect(result).toEqual(mockStudent);
		});

		it('should throw an error if student to delete not found', async () => {
			mockStudentRepository.findById.mockResolvedValue(null);

			await expect(service.remove('1', mockUser)).rejects.toThrow(
				new NotFoundException('Student not found'),
			);

			expect(studentRepository.findById).toHaveBeenCalledWith('1', mockUser);
			expect(studentRepository.delete).not.toHaveBeenCalled();
		});
	});

	describe('delete', () => {
		it('should delete and return the student', async () => {
			mockStudentRepository.findById.mockResolvedValue(mockStudent);

			mockStudentRepository.delete.mockResolvedValue(mockStudent);
			await service.remove('1', mockUser);

			expect(studentRepository.findById).toHaveBeenCalledWith('1', mockUser);
			expect(studentRepository.delete).toHaveBeenCalledWith('1', mockUser);
		});

		it('should throw an error if student to delete not found', async () => {
			mockStudentRepository.findById.mockResolvedValue(null);

			await expect(service.remove('1', mockUser)).rejects.toThrow(
				new NotFoundException('Student not found'),
			);

			expect(studentRepository.findById).toHaveBeenCalledWith('1', mockUser);
			expect(studentRepository.delete).not.toHaveBeenCalled();
		});
	});
});
