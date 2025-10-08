import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { User } from '../models/user.model';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UserRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findById(id: User['id']): Promise<User | null> {
		return this.prisma.user.findUnique({
			where: { id, deletedAt: null },
		});
	}

	async findByEmail(email: User['email']): Promise<User | null> {
		return this.prisma.user.findUnique({
			where: { email, deletedAt: null },
		});
	}

	async findByPhone(phone: string): Promise<User | null> {
		return this.prisma.user.findUnique({
			where: { phone, deletedAt: null },
		});
	}

	async create(user: CreateUserDto): Promise<User> {
		return this.prisma.user.create({
			data: user,
		});
	}

	async update(id: string, data: UpdateUserDto): Promise<User> {
		return this.prisma.user.update({
			where: { id },
			data,
		});
	}

	async delete(id: User['id']): Promise<User> {
		return this.prisma.user.update({
			where: { id },
			data: { deletedAt: new Date() },
		});
	}

	async restore(id: User['id']): Promise<User> {
		return this.prisma.user.update({
			where: { id },
			data: { deletedAt: null },
		});
	}
}
