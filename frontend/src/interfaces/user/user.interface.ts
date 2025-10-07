export interface User {
  readonly id: string;
  readonly email: string;
  name: string;
  readonly type: UserType;
  readonly roleId: string;
  isAdmin: boolean;
  readonly createdAt: Date;
  updatedAt: Date;
}

export enum UserType {
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
}
