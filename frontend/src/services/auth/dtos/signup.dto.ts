import { UserType } from "@/interfaces/user/user.interface";

export interface SignUpDto {
  name: string;
  email: string;
  password: string;
  type: UserType.TEACHER | UserType.STUDENT;
}
