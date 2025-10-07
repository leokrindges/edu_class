import { UserType } from '@prisma/client';

export class User {
	readonly id: string;
	readonly email: string;
	avatar: string | null;
	readonly phone: string | null;
	address: string | null;
	birthDate: Date | null;
	name: string;
	type: UserType;
	readonly roleId: string | null;
	isAdmin: boolean;
	password: string;
	refreshToken: string | null;
	createdAt: Date;
	updatedAt: Date;
}
