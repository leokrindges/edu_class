import { ApiResponsePaginated } from 'src/common/api-response/api-response.common';
import { Student } from '../model/student.model';

export class StudentResponse {
	id: string;
	name: string;
	email: string | null;
	phone: string | null;
	notes: string | null;
	avatar?: string | null;
	birthDate?: Date | null;
	status: string;
	createdAt: Date;
	updatedAt: Date;

	constructor(partial: Partial<StudentResponse>) {
		Object.assign(this, partial);
	}

	static fromEntity(entity: Student): StudentResponse {
		return new StudentResponse({
			id: entity.id,
			name: entity.name,
			email: entity.email,
			phone: entity.phone,
			notes: entity.notes,
			avatar: entity.avatar,
			birthDate: entity.birthDate,
			status: entity.status,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
		});
	}

	static fromEntities(entities: Student[]): StudentResponse[] {
		return entities.map((entity) => this.fromEntity(entity));
	}
}

export type PaginatedStudentResponse = ApiResponsePaginated<StudentResponse>;
