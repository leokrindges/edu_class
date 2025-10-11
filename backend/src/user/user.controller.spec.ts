import { Test, TestingModule } from '@nestjs/testing';
import { User } from './models/user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserResponse } from './response/user.response';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

describe('UserController', () => {
	let controller: UserController;
	let userService: UserService;

	const mockUser: User = {
		id: '1',
		email: 'test@example.com',
		password: 'hashedpassword',
		avatar: null,
		phone: null,
		address: null,
		birthDate: null,
		name: 'Test User',
		type: 'STUDENT',
		roleId: null,
		isAdmin: false,
		createdAt: new Date(),
		updatedAt: new Date(),
		refreshToken: null,
	};

	const mockUserService = {
		findById: jest.fn(),
		findByEmail: jest.fn(),
		findByPhone: jest.fn(),
		create: jest.fn(),
		update: jest.fn(),
		restore: jest.fn(),
		delete: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
			providers: [
				{
					provide: UserService,
					useValue: mockUserService,
				},
			],
		}).compile();

		controller = module.get<UserController>(UserController);
		userService = module.get<UserService>(UserService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('findByEmail', () => {
		it('should return a user by email', async () => {
			mockUserService.findByEmail.mockResolvedValue(mockUser);
			const result = await controller.findByEmail('test@test.com');

			expect(userService.findByEmail).toHaveBeenCalledWith('test@test.com');
			expect(result).toEqual(UserResponse.fromEntity(mockUser));
		});
	});

	describe('findByPhone', () => {
		it('should return a user by phone', async () => {
			mockUserService.findByPhone.mockResolvedValue(mockUser);
			const result = await controller.findByPhone('1234567890');

			expect(userService.findByPhone).toHaveBeenCalledWith('1234567890');
			expect(result).toEqual(UserResponse.fromEntity(mockUser));
		});
	});

	describe('findById', () => {
		it('should return a user by id', async () => {
			mockUserService.findById.mockResolvedValue(mockUser);
			const result = await controller.findById('1');

			expect(userService.findById).toHaveBeenCalledWith('1');
			expect(result).toEqual(UserResponse.fromEntity(mockUser));
		});
	});

	describe('create', () => {
		it('should create a new user', async () => {
			const createUserDto: CreateUserDto = {
				email: 'test@example.com',
				password: 'password',
				name: 'Test User',
				type: 'STUDENT',
				address: null,
				birthDate: null,
				phone: null,
			};
			mockUserService.create.mockResolvedValue(mockUser);
			const result = await controller.create(createUserDto);

			expect(userService.create).toHaveBeenCalledWith(createUserDto);
			expect(result).toEqual(UserResponse.fromEntity(mockUser));
		});
	});

	describe('update', () => {
		it('should update an existing user', async () => {
			const updateUserDto: UpdateUserDto = {
				email: 'test@example.com',
				name: 'Updated User',
				type: 'STUDENT',
			};
			const updatedUser = { ...mockUser, ...updateUserDto };
			mockUserService.update.mockResolvedValue(updatedUser);
			const result = await controller.update('1', updateUserDto);

			expect(userService.update).toHaveBeenCalledWith('1', updateUserDto);
			expect(result).toEqual(UserResponse.fromEntity(updatedUser));
		});
	});

	describe('restore', () => {
		it('should restore a deleted user', async () => {
			mockUserService.restore.mockResolvedValue(mockUser);
			const result = await controller.restore('1');

			expect(userService.restore).toHaveBeenCalledWith('1');
			expect(result).toEqual(UserResponse.fromEntity(mockUser));
		});
	});

	describe('delete', () => {
		it('should delete a user', async () => {
			mockUserService.delete.mockResolvedValue(mockUser);
			const result = await controller.delete('1');

			expect(userService.delete).toHaveBeenCalledWith('1');
			expect(result).toEqual(UserResponse.fromEntity(mockUser));
		});
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
