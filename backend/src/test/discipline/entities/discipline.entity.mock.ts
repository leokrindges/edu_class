import { Discipline } from 'src/discipline/model/discipline.model';

export const mockDiscipline: Discipline = {
	id: '1',
	name: 'Mathematics',
	description: 'Mathematics Discipline',
	teacherId: 't1',
	currency: 'BRL',
	durationMin: 60,
	pricePerClass: 100,
	createdAt: new Date(),
	updatedAt: new Date(),
	deletedAt: null,
	teacher: [],
};
