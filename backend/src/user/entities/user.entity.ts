export class User {
	readonly id: string;
	readonly email: string;
	name: string;
	type: UserType;
	readonly roleId: string;
	isAdmin: boolean;
	password: string;
	refreshToken: string | null;
	createdAt: Date;
	updatedAt: Date;
}

export enum UserType {
	ADMIN = 'ADMIN',
	TEACHER = 'TEACHER',
	STUDENT = 'STUDENT',
}
