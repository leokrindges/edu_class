import { Test, TestingModule } from '@nestjs/testing';
import { DisciplineController } from './discipline.cnotroller';
import { DisciplineService } from './discipline.service';
import { mockUser } from 'src/test/user/user.mock';
import { mockDiscipline } from 'src/test/discipline/entities/discipline.entity.mock';
import {
	createDisciplineDto,
	updateDisciplineDto,
} from 'src/test/discipline/dto/discipline.dto.mock';

describe('DisciplineController', () => {
	let controller: DisciplineController;
	let disciplineService: DisciplineService;

	const mockDiciplineService = {
		create: jest.fn(),
		findAll: jest.fn(),
		findById: jest.fn(),
		findTeachersByDisciplineId: jest.fn(),
		update: jest.fn(),
		softDelete: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [DisciplineController],
			providers: [
				{
					provide: DisciplineService,
					useValue: mockDiciplineService,
				},
			],
		}).compile();

		controller = module.get<DisciplineController>(DisciplineController);
		disciplineService = module.get<DisciplineService>(DisciplineService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('create', () => {
		it('should create and return a discipline', async () => {
			mockDiciplineService.create.mockResolvedValue(createDisciplineDto);

			const result = await controller.create(createDisciplineDto, mockUser);

			expect(result).toEqual(createDisciplineDto);
			expect(disciplineService.create).toHaveBeenCalledWith(
				createDisciplineDto,
				mockUser.teacher?.id!,
			);
		});
	});

	describe('findById', () => {
		it('should return a discipline by id', async () => {
			const disciplineId = '1';
			mockDiciplineService.findById.mockResolvedValue(mockDiscipline);

			const result = await controller.findOne(disciplineId, mockUser);

			expect(result).toEqual(mockDiscipline);
			expect(disciplineService.findById).toHaveBeenCalledWith(
				disciplineId,
				mockUser.teacher?.id!,
			);
		});
	});

	describe('findAll', () => {
		it('should return all disciplines', async () => {
			const mockDisciplines = [mockDiscipline];
			mockDiciplineService.findAll.mockResolvedValue(mockDisciplines);

			const result = await controller.findAll(mockUser);

			expect(result).toEqual(mockDisciplines);
			expect(disciplineService.findAll).toHaveBeenCalledWith(
				mockUser.teacher?.id!,
			);
		});
	});

	describe('findTeachers', () => {
		it('should return all teachers for a given discipline', async () => {
			const disciplineId = '1';
			const mockTeachers = [mockUser.teacher];
			mockDiciplineService.findTeachersByDisciplineId.mockResolvedValue(
				mockTeachers,
			);

			const result = await controller.findTeachers(disciplineId, mockUser);

			expect(result).toEqual(mockTeachers);
			expect(disciplineService.findTeachersByDisciplineId).toHaveBeenCalledWith(
				disciplineId,
				mockUser.teacher?.id!,
			);
		});
	});

	describe('update', () => {
		it('should update and return a discipline', async () => {
			const disciplineId = '1';

			mockDiciplineService.update.mockResolvedValue({
				...mockDiscipline,
				...updateDisciplineDto,
			});

			const result = await controller.update(
				disciplineId,
				updateDisciplineDto,
				mockUser,
			);

			expect(result).toEqual({
				...mockDiscipline,
				...updateDisciplineDto,
			});
			expect(disciplineService.update).toHaveBeenCalledWith(
				disciplineId,
				updateDisciplineDto,
				mockUser.teacher?.id!,
			);
		});
	});

	describe('delete', () => {
		it('should soft delete a discipline', async () => {
			const disciplineId = '1';
			mockDiciplineService.softDelete.mockResolvedValue(mockDiscipline);

			const result = await controller.delete(disciplineId, mockUser);

			expect(result).toEqual(mockDiscipline);
			expect(disciplineService.softDelete).toHaveBeenCalledWith(
				disciplineId,
				mockUser.teacher?.id!,
			);
		});
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
