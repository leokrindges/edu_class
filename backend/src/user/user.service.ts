import {
	BadRequestException,
	ConflictException,
	Injectable,
} from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { User } from './models/user.model';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async findById(id: User['id']): Promise<User> {
		if (!id) throw new BadRequestException('User ID is required');

		const user = await this.userRepository.findById(id);

		if (!user) throw new BadRequestException('User not found');
		return user;
	}

	async findByEmail(email: string): Promise<User> {
		if (!email) throw new BadRequestException('Email is required');

		const user = await this.userRepository.findByEmail(email);

		if (!user) throw new BadRequestException('User not found');
		return user;
	}

	async findByPhone(phone: string): Promise<User> {
		if (!phone) throw new BadRequestException('Phone number is required');

		const user = await this.userRepository.findByPhone(phone);

		if (!user) throw new BadRequestException('User not found');
		return user;
	}

	async create(user: CreateUserDto): Promise<User> {
		const emailExists = await this.userRepository.findByEmail(user.email);
		if (emailExists) throw new ConflictException('Email already exists');

		if (user.phone) {
			const phoneExists = await this.userRepository.findByPhone(user.phone);
			if (phoneExists)
				throw new ConflictException('Phone number already exists');
		}
		return this.userRepository.create(user);
	}

	async update(id: User['id'], data: UpdateUserDto): Promise<User> {
		const user = await this.findById(id);
		if (!user) throw new BadRequestException('User not found');

		if (data.email) {
			const emailExists = await this.userRepository.findByEmail(data.email);
			if (emailExists && emailExists.id !== id)
				throw new ConflictException('Email already exists');
		}

		if (data.phone) {
			const phoneExists = await this.userRepository.findByPhone(data.phone);
			if (phoneExists && phoneExists.id !== id)
				throw new ConflictException('Phone number already exists');
		}

		return this.userRepository.update(id, data);
	}

	async delete(id: User['id']): Promise<User> {
		const user = await this.findById(id);
		if (!user) throw new BadRequestException('User not found');

		return this.userRepository.delete(id);
	}

	async restore(id: User['id']): Promise<User> {
		const user = await this.userRepository.restore(id);
		if (!user) throw new BadRequestException('User not found');

		return user;
	}
}
