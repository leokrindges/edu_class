import { UserType } from '@prisma/client';
import { Teacher } from 'src/teacher/model/teacher.model';

export class User {
	readonly id: string;
	readonly email: string;
	avatar: string | null;
	readonly phone: string | null;
	address: string | null;
	birthDate: Date | null;
	name: string;
	type: UserType;
	isAdmin: boolean;
	password: string;
	refreshToken: string | null;
	createdAt: Date;
	updatedAt: Date;
	teacher?: Teacher;

}
