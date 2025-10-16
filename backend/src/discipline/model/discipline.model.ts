import { Teacher } from 'src/teacher/model/teacher.model';

export class Discipline {
	id: string;
	name: string;
	description: string | null;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
	teacher?: Teacher[];
}
