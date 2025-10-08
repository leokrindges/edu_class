import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './repositories/user.repository';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { User } from './models/user.model';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserType } from '@prisma/client';

describe('UserService', () => {
	let service: UserService;
	let userRepository: UserRepository;

	const mockUser: User = {
		id: '1',
		email: 'test@test.com',
		name: 'Test User',
		avatar: null,
		phone: null,
		address: null,
		birthDate: null,
		type: UserType.STUDENT,
		roleId: null,
		isAdmin: false,
		password: 'hashedPassword',
		refreshToken: null,
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	const mockUserRepository = {
		findById: jest.fn(),
		findByEmail: jest.fn(),
		findByPhone: jest.fn(),
		create: jest.fn(),
		update: jest.fn(),
		delete: jest.fn(),
		restore: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{ provide: UserRepository, useValue: mockUserRepository },
			],
		}).compile();

		service = module.get<UserService>(UserService);
		userRepository = module.get<UserRepository>(UserRepository);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('findById', () => {
		it('should return user by id', async () => {
			mockUserRepository.findById.mockResolvedValue(mockUser);
			const result = await service.findById('1');

			expect(userRepository.findById).toHaveBeenCalledWith('1');
			expect(result).toEqual(mockUser);
		});

		it('should throw BadRequestException if id is not provided', async () => {
			await expect(service.findById('')).rejects.toThrow(
				new BadRequestException('User ID is required'),
			);
		});

		it('should throw BadRequestException if user not found', async () => {
			mockUserRepository.findById.mockResolvedValue(null);

			await expect(service.findById('1')).rejects.toThrow(
				new BadRequestException('User not found'),
			);
		});
	});

	describe('findByEmail', () => {
		it('should return user by email', async () => {
			mockUserRepository.findByEmail.mockResolvedValue(mockUser);
			const result = await service.findByEmail('test@test.com');

			expect(userRepository.findByEmail).toHaveBeenCalledWith('test@test.com');
			expect(result).toEqual(mockUser);
		});

		it('should throw BadRequestException if email is not provided', async () => {
			await expect(service.findByEmail('')).rejects.toThrow(
				new BadRequestException('Email is required'),
			);
		});

		it('should throw BadRequestException if user not found', async () => {
			mockUserRepository.findByEmail.mockResolvedValue(null);

			await expect(service.findByEmail('test@test.com')).rejects.toThrow(
				new BadRequestException('User not found'),
			);
		});
	});

	describe('findByPhone', () => {
		it('should return user by phone', async () => {
			const userWithPhone = { ...mockUser, phone: '123456789' };
			mockUserRepository.findByPhone.mockResolvedValue(userWithPhone);
			const result = await service.findByPhone('123456789');

			expect(userRepository.findByPhone).toHaveBeenCalledWith('123456789');
			expect(result).toEqual(userWithPhone);
		});

		it('should throw BadRequestException if phone is not provided', async () => {
			await expect(service.findByPhone('')).rejects.toThrow(
				new BadRequestException('Phone number is required'),
			);
		});

		it('should throw BadRequestException if user not found', async () => {
			mockUserRepository.findByPhone.mockResolvedValue(null);

			await expect(service.findByPhone('123456789')).rejects.toThrow(
				new BadRequestException('User not found'),
			);
		});
	});

	describe('create', () => {
		const createUserDto: CreateUserDto = {
			email: 'newuser@test.com',
			name: 'New User',
			password: 'password123',
            type: UserType.STUDENT,
            address: null,
            birthDate: null,
            phone: null,
		};

		it('should create a user successfully', async () => {
			mockUserRepository.findByEmail.mockResolvedValue(null);
			mockUserRepository.create.mockResolvedValue(mockUser);

			const result = await service.create(createUserDto);

			expect(userRepository.findByEmail).toHaveBeenCalledWith(
				createUserDto.email,
			);
			expect(userRepository.create).toHaveBeenCalledWith(createUserDto);
			expect(result).toEqual(mockUser);
		});

		it('should throw ConflictException if email already exists', async () => {
			mockUserRepository.findByEmail.mockResolvedValue(mockUser);

			await expect(service.create(createUserDto)).rejects.toThrow(
				new ConflictException('Email already exists'),
			);
		});

		it('should throw ConflictException if phone already exists', async () => {
			const createUserWithPhone = { ...createUserDto, phone: '123456789' };
			mockUserRepository.findByEmail.mockResolvedValue(null);
			mockUserRepository.findByPhone.mockResolvedValue(mockUser);

			await expect(service.create(createUserWithPhone)).rejects.toThrow(
				new ConflictException('Phone number already exists'),
			);
		});
	});

	describe('update', () => {
		const updateUserDto: UpdateUserDto = {
			name: 'Updated Name',
		};

		it('should update user successfully', async () => {
			const updatedUser = { ...mockUser, name: 'Updated Name' };
			mockUserRepository.findById.mockResolvedValue(mockUser);
			mockUserRepository.update.mockResolvedValue(updatedUser);

			const result = await service.update('1', updateUserDto);

			expect(userRepository.findById).toHaveBeenCalledWith('1');
			expect(userRepository.update).toHaveBeenCalledWith('1', updateUserDto);
			expect(result).toEqual(updatedUser);
		});

		it('should throw BadRequestException if user not found', async () => {
			mockUserRepository.findById.mockResolvedValue(null);

			await expect(service.update('1', updateUserDto)).rejects.toThrow(
				new BadRequestException('User not found'),
			);
		});

		it('should throw ConflictException if email already exists', async () => {
			const updateWithEmail = { ...updateUserDto, email: 'existing@test.com' };
			const existingUser = { ...mockUser, id: '2', email: 'existing@test.com' };

			mockUserRepository.findById.mockResolvedValue(mockUser);
			mockUserRepository.findByEmail.mockResolvedValue(existingUser);

			await expect(service.update('1', updateWithEmail)).rejects.toThrow(
				new ConflictException('Email already exists'),
			);
		});
	});

	describe('delete', () => {
		it('should delete user successfully', async () => {
			mockUserRepository.findById.mockResolvedValue(mockUser);
			mockUserRepository.delete.mockResolvedValue(mockUser);

			const result = await service.delete('1');

			expect(userRepository.findById).toHaveBeenCalledWith('1');
			expect(userRepository.delete).toHaveBeenCalledWith('1');
			expect(result).toEqual(mockUser);
		});

		it('should throw BadRequestException if user not found', async () => {
			mockUserRepository.findById.mockResolvedValue(null);

			await expect(service.delete('1')).rejects.toThrow(
				new BadRequestException('User not found'),
			);
		});
	});

	describe('restore', () => {
		it('should restore user successfully', async () => {
			mockUserRepository.restore.mockResolvedValue(mockUser);

			const result = await service.restore('1');

			expect(userRepository.restore).toHaveBeenCalledWith('1');
			expect(result).toEqual(mockUser);
		});

		it('should throw BadRequestException if user not found', async () => {
			mockUserRepository.restore.mockResolvedValue(null);

			await expect(service.restore('1')).rejects.toThrow(
				new BadRequestException('User not found'),
			);
		});
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
