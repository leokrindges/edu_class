export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  notes: string | null;
  status: StudentStatus;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

export enum StudentStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
