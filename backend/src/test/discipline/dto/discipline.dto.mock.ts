import { CreateDisciplineDTO } from 'src/discipline/dtos/create-discipline.dto';
import { UpdateDisciplineDTO } from 'src/discipline/dtos/update-discipline.dto';

export const createDisciplineDto: CreateDisciplineDTO = {
	name: 'Math',
	description: 'Mathematics Discipline',
};

export const updateDisciplineDto: UpdateDisciplineDTO = {
	name: 'Updated Math',
	description: 'Updated Mathematics Discipline',
};
