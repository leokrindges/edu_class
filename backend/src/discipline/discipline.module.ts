import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { DisciplineController } from './discipline.cnotroller';
import { DisciplineService } from './discipline.service';
import { DisciplineRepository } from './repositories/discipline.repository';

@Module({
	imports: [PrismaModule],
	controllers: [DisciplineController],
	providers: [DisciplineService, DisciplineRepository],
})
export class DisciplineModule {}
