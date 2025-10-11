import { StudentStatus } from "@/interfaces/student/student.interface";

export class FindAllQueryParamsDto {
  page?: number;
  limit?: number;
  search?: string;
  status?: StudentStatus;
}
