import { Test, TestingModule } from '@nestjs/testing';
import { DisciplineService } from './discipline.service';
import { DisciplineRepository } from './repositories/discipline.repository';
import { mockDiscipline } from 'src/test/discipline/entities/discipline.entity.mock';
import { NotFoundException } from '@nestjs/common';
import { UpdateDisciplineDTO } from './dtos/update-discipline.dto';
import {
	createDisciplineDto,
	updateDisciplineDto,
} from 'src/test/discipline/dto/discipline.dto.mock';

describe('DisciplineService', () => {
	let service: DisciplineService;
	let disciplineRepository: DisciplineRepository;

	const mockDisciplineRepository = {
		create: jest.fn(),
		findById: jest.fn(),
		findAll: jest.fn(),
		findTeachersByDisciplineId: jest.fn(),
		update: jest.fn(),
		softDelete: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				DisciplineService,
				{ provide: DisciplineRepository, useValue: mockDisciplineRepository },
			],
		}).compile();

		service = module.get<DisciplineService>(DisciplineService);
		disciplineRepository =
			module.get<DisciplineRepository>(DisciplineRepository);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe('create', () => {
		it('should create and return a discipline', async () => {
			mockDisciplineRepository.create.mockResolvedValue(createDisciplineDto);

			const result = await service.create(createDisciplineDto, 'teacherId');

			expect(result).toEqual(createDisciplineDto);
			expect(disciplineRepository.create).toHaveBeenCalledWith(
				createDisciplineDto,
				'teacherId',
			);
		});
	});

	describe('findById', () => {
		it('should return a discipline by id', async () => {
			mockDisciplineRepository.findById.mockResolvedValue(mockDiscipline);
			const result = await service.findById('1', 'teacherId');
			expect(result).toEqual(mockDiscipline);
		});

		it('should throw NotFoundException if discipline not found', async () => {
			mockDisciplineRepository.findById.mockResolvedValue(null);
			await expect(service.findById('1', 'teacherId')).rejects.toThrow(
				new NotFoundException('Discipline not found'),
			);
		});
	});

	describe('findAll', () => {
		it('should return all disciplines for a teacher', async () => {
			const mockDisciplines = [mockDiscipline];
			mockDisciplineRepository.findAll.mockResolvedValue({
				data: mockDisciplines,
				total: mockDisciplines.length,
			});
			const result = await service.findAll('teacherId', { limit: 10, page: 1 });
			expect(result).toEqual({
				data: mockDisciplines,
				total: mockDisciplines.length,
				page: 1,
				limit: 10,
			});
			expect(disciplineRepository.findAll).toHaveBeenCalledWith('teacherId', {
				limit: 10,
				page: 1,
			});
		});
	});

	describe('update', () => {
		it('should update and return the discipline', async () => {
			mockDisciplineRepository.findById.mockResolvedValue(mockDiscipline);
			mockDisciplineRepository.update.mockResolvedValue({
				...mockDiscipline,
				...updateDisciplineDto,
			});

			const result = await service.update(
				'1',
				updateDisciplineDto,
				'teacherId',
			);

			expect(result).toEqual({ ...mockDiscipline, ...updateDisciplineDto });
			expect(disciplineRepository.findById).toHaveBeenCalledWith(
				'1',
				'teacherId',
			);
			expect(disciplineRepository.update).toHaveBeenCalledWith(
				'1',
				updateDisciplineDto,
				'teacherId',
			);
		});

		it('should throw NotFoundException if discipline to update not found', async () => {
			const updateDisciplineDto: UpdateDisciplineDTO = {
				name: 'Updated Math',
				description: 'Updated Description',
			};
			mockDisciplineRepository.findById.mockResolvedValue(null);

			await expect(
				service.update('1', updateDisciplineDto, 'teacherId'),
			).rejects.toThrow(new NotFoundException('Discipline not found'));
		});
	});

	describe('softDelete', () => {
		it('should soft delete the discipline', async () => {
			mockDisciplineRepository.findById.mockResolvedValue(mockDiscipline);
			mockDisciplineRepository.softDelete.mockResolvedValue(undefined);

			const result = await service.softDelete('1', 'teacherId');

			expect(result).toBeUndefined();
			expect(disciplineRepository.findById).toHaveBeenCalledWith(
				'1',
				'teacherId',
			);
			expect(disciplineRepository.softDelete).toHaveBeenCalledWith(
				'1',
				'teacherId',
			);
		});

		it('should throw NotFoundException if discipline to delete not found', async () => {
			mockDisciplineRepository.findById.mockResolvedValue(null);

			await expect(service.softDelete('1', 'teacherId')).rejects.toThrow(
				new NotFoundException('Discipline not found'),
			);
		});
	});

	describe('findTeachersByDisciplineId', () => {
		it('should return teachers for a given discipline', async () => {
			const mockTeachers = [{ id: 'teacher1' }, { id: 'teacher2' }];
			mockDisciplineRepository.findById.mockResolvedValue(mockDiscipline);
			mockDisciplineRepository.findTeachersByDisciplineId.mockResolvedValue(
				mockTeachers,
			);

			const result = await service.findTeachersByDisciplineId('1', 'teacherId');

			expect(result).toEqual(mockTeachers);
			expect(disciplineRepository.findById).toHaveBeenCalledWith(
				'1',
				'teacherId',
			);
			expect(
				disciplineRepository.findTeachersByDisciplineId,
			).toHaveBeenCalledWith('1', 'teacherId');
		});

		it('should throw NotFoundException if discipline not found', async () => {
			mockDisciplineRepository.findById.mockResolvedValue(null);

			await expect(
				service.findTeachersByDisciplineId('1', 'teacherId'),
			).rejects.toThrow(new NotFoundException('Discipline not found'));
		});
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
