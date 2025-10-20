import { PartialType } from '@nestjs/swagger';
import { CreateDisciplineDTO } from './create-discipline.dto';

export class UpdateDisciplineDTO extends PartialType(CreateDisciplineDTO) {}
