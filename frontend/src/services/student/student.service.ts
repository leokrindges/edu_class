import { http } from "@/http-module/http-client";
import { Student } from "@/interfaces/student/student.interface";
import { StudentDTO } from "./dtos/student.dto";

class StudentService {
  private readonly baseUrl = "/students";

  async create(data: StudentDTO): Promise<Student> {
    const response = await http.post<Student>(this.baseUrl, data);
    if (response.status !== 201) {
      throw new Error("Falha ao criar estudante, tente novamente.");
    }
    return response.body;
  }

  async update(id: string, data: StudentDTO): Promise<Student> {
    const response = await http.patch<Student>(`${this.baseUrl}/${id}`, data);
    if (response.status !== 200) {
      throw new Error("Falha ao atualizar estudante, tente novamente.");
    }
    return response.body;
  }

  async findById(id: string): Promise<Student> {
    const response = await http.get<Student>(`${this.baseUrl}/${id}`);
    if (response.status !== 200) {
      throw new Error("Falha ao buscar estudante, tente novamente.");
    }
    return response.body;
  }

  //   async findAll(params?: {
  //     page?: number;
  //     limit?: number;
  //     search?: string;
  //     status?: string;
  //   }): Promise<{
  //     data: Student[];
  //     total: number;
  //     page: number;
  //     limit: number;
  //   }> {
  //     const response = await http.get(this.baseUrl, { params });
  //     return response.body;
  //   }

  async delete(id: string): Promise<void> {
    await http.delete(`${this.baseUrl}/${id}`);
  }
}

export const studentService = new StudentService();
