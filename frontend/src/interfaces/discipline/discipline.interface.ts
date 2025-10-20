export interface Discipline {
  id: string;
  name: string;
  description?: string;
  teacherId: string;
  pricePerClass?: number;
  durationMin?: number;
  currency?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
