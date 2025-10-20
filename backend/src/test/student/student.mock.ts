import { Student } from "src/student/model/student.model";

export const mockStudent: Student = {
	id: '1',
	email: 'test@student.com',
	name: 'Test Student',
	createdAt: new Date(),
	updatedAt: new Date(),
	avatar: null,
	birthDate: null,
	notes: null,
	phone: null,
	status: 'ACTIVE',
	deletedAt: null,
};
