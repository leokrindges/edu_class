import { Module } from "@nestjs/common";
import { StudentController } from "./student.controller";
import { PrismaModule } from "src/database/prisma.module";
import { StudentService } from "./student.service";
import { StudentRepository } from "./repositories/student.repository";

@Module({
    imports: [PrismaModule],
    controllers: [StudentController],
    providers: [StudentService, StudentRepository],
})
export class StudentModule {}