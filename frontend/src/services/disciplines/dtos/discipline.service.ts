import { Discipline } from "@/interfaces/discipline/discipline.interface";
import { DisciplineDTO } from "./discipline.dto";
import { http, PaginatedResponse } from "@/http-module/http-client";
import { FindAllDisciplinesQueryParamsDto } from "./finl-all-query-params.dto";

class DisciplineService {
  private readonly baseUrl = "/disciplines";
  async create(dto: DisciplineDTO): Promise<Discipline> {
    const response = await http.post<Discipline>(this.baseUrl, dto);
    if (response.status !== 201) {
      throw new Error("Falha ao criar disciplina, tente novamente.");
    }
    return response.body;
  }

  async update(id: string, dto: Partial<DisciplineDTO>): Promise<Discipline> {
    const response = await http.patch<Discipline>(`${this.baseUrl}/${id}`, dto);
    if (response.status !== 200) {
      if (response.status === 404)
        throw new Error("Disciplina não encontrada.");

      throw new Error("Falha ao atualizar disciplina, tente novamente.");
    }
    return response.body;
  }

  async findById(id: string): Promise<Discipline> {
    const response = await http.get<Discipline>(`${this.baseUrl}/${id}`);
    if (response.status !== 200) {
      if (response.status === 404)
        throw new Error("Disciplina não encontrada.");

      throw new Error("Falha ao buscar disciplina, tente novamente.");
    }
    return response.body;
  }

  async findAll(
    queryParams?: FindAllDisciplinesQueryParamsDto
  ): Promise<PaginatedResponse<Discipline>> {
    const query = new URLSearchParams();
    if (queryParams?.page) query.append("page", queryParams.page.toString());
    if (queryParams?.limit) query.append("limit", queryParams.limit.toString());
    if (queryParams?.search) query.append("search", queryParams.search);

    const response = await http.get<PaginatedResponse<Discipline>>(
      `${this.baseUrl}?${query.toString()}`
    );

    if (response.status !== 200) {
      throw new Error("Falha ao buscar disciplinas, tente novamente.");
    }
    return response.body;
  }

  async delete(id: string): Promise<void> {
    const response = await http.delete(`${this.baseUrl}/${id}`);
    if (response.status !== 204) {
      if (response.status === 404)
        throw new Error("Disciplina não encontrada.");

      throw new Error("Falha ao deletar disciplina, tente novamente.");
    }
  }
}

export const disciplineService = new DisciplineService();
