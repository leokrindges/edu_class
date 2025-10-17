import { Discipline } from "@/interfaces/discipline/discipline.interface";
import { DisciplineDTO } from "./discipline.dto";
import { http } from "@/http-module/http-client";

export const disciplineService = {
  async create(dto: DisciplineDTO): Promise<Discipline> {
    const response = await http.post<Discipline>("/disciplines", dto);
    if (response.status !== 201) {
      throw new Error("Falha ao criar disciplina, tente novamente.");
    }
    return response.body;
  },

  async update(id: string, dto: Partial<DisciplineDTO>): Promise<Discipline> {
    const response = await http.patch<Discipline>(`/disciplines/${id}`, dto);
    if (response.status !== 200) {
      if (response.status === 404)
        throw new Error("Disciplina não encontrada.");

      throw new Error("Falha ao atualizar disciplina, tente novamente.");
    }
    return response.body;
  },

  async findById(id: string): Promise<Discipline> {
    const response = await http.get<Discipline>(`/disciplines/${id}`);
    if (response.status !== 200) {
      if (response.status === 404)
        throw new Error("Disciplina não encontrada.");

      throw new Error("Falha ao buscar disciplina, tente novamente.");
    }
    return response.body;
  },

  async findAll(): Promise<Discipline[]> {
    const response = await http.get<Discipline[]>("/disciplines");
    if (response.status !== 200) {
      throw new Error("Falha ao buscar disciplinas, tente novamente.");
    }
    return response.body;
  },

  async delete(id: string): Promise<void> {
    const response = await http.delete(`/disciplines/${id}`);
    if (response.status !== 204) {
      if (response.status === 404)
        throw new Error("Disciplina não encontrada.");

      throw new Error("Falha ao deletar disciplina, tente novamente.");
    }
  },
};
