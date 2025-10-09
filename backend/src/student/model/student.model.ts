import { StudentStatus } from '@prisma/client';

export class Student {
	id: string;
	name: string;
	email: string | null;
	phone: string | null;
	notes: string | null;
	birthDate: Date | null;
	avatar: string | null;
	status: StudentStatus;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
}
