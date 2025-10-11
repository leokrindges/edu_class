import { StudentFormData } from "@/schema/student/student.schema";

export interface StudentDTO extends StudentFormData {
  avatar?: string | null;
}
