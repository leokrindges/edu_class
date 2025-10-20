import { Teacher } from 'src/teacher/model/teacher.model';

export class Discipline {
	id: string;
	name: string;
	description: string | null;
	teacherId: string;
	pricePerClass: number | null;
	currency: string | null;
	durationMin: number | null;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
	teacher?: Teacher[];
}
