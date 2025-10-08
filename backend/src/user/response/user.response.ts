import { UserType } from '@prisma/client';
import { User } from '../models/user.model';

export class UserResponse {
	id: string;
	email: string;
	avatar: string | null;
	phone: string | null;
	address: string | null;
	birthDate: Date | null;
	name: string;
	type: UserType;
	roleId: string | null;
	isAdmin: boolean;
	createdAt: Date;
	updatedAt: Date;

	constructor(partial: Partial<UserResponse>) {
		Object.assign(this, partial);
	}
	static fromEntity(user: User): UserResponse {
		const { password, refreshToken, ...userData } = user;
		return new UserResponse(userData);
	}

	static fromEntities(users: User[]): UserResponse[] {
		return users.map((user) => this.fromEntity(user));
	}
}
