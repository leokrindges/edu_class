export interface Student {
  id: string;
  name: string;
  email: string;
  phone?: string;
  notes?: string;
  status: StudentStatus;
  avatar?: string;
  birthDate?: string;
  createdAt: string;
  updatedAt: string;
}

export enum StudentStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
