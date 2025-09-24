export class Teacher {
	readonly id: string;
	readonly email: string;
	readonly name: string;
	password: string;
	refreshToken: string | null;
	createdAt: Date;
	updatedAt: Date;
}
