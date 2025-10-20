import { User } from 'src/user/models/user.model';

export const mockUser: User = {
	id: '1',
	email: 'test@student.com',
	password: 'hashedpassword',
	avatar: null,
	phone: null,
	address: null,
	birthDate: null,
	name: 'Test User',
	type: 'TEACHER',
	roleId: null,
	isAdmin: false,
	createdAt: new Date(),
	updatedAt: new Date(),
	refreshToken: null,
};
