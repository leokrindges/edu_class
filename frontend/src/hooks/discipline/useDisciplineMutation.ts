import { DisciplineDTO } from "@/services/disciplines/dtos/discipline.dto";
import { disciplineService } from "@/services/disciplines/dtos/discipline.service";
import { FindAllDisciplinesQueryParamsDto } from "@/services/disciplines/dtos/finl-all-query-params.dto";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useCreateDiscipline() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ dto }: { dto: DisciplineDTO }) => {
      return disciplineService.create(dto);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["disciplines"] });
      toast.success("Disciplina criada com sucesso!");
      router.push("/disciplines");
    },
    onError: (error: Error) => {
      const message = error.message || "Erro ao criar disciplina";
      toast.error(message);
    },
  });
}

export function useUpdateDiscipline() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      dto,
    }: {
      id: string;
      dto: Partial<DisciplineDTO>;
    }) => {
      return disciplineService.update(id, dto);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["disciplines"] });
      toast.success("Disciplina atualizada com sucesso!");
      router.push("/disciplines");
    },
    onError: (error: Error) => {
      const message = error.message || "Erro ao atualizar disciplina";
      toast.error(message);
    },
  });
}

export function useDeleteDiscipline() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return disciplineService.delete(id);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["disciplines"] });
      toast.success("Disciplina excluída com sucesso!");
    },
    onError: (error: Error) => {
      const message = error.message || "Erro ao excluir disciplina";
      toast.error(message);
    },
  });
}

export function useDisciplines(queryParams?: FindAllDisciplinesQueryParamsDto) {
  return useQuery({
    queryKey: ["disciplines", queryParams],
    queryFn: () => disciplineService.findAll(queryParams),
  });
}

export function useDiscipline(id: string) {
  return useQuery({
    queryKey: ["discipline", id],
    queryFn: () => disciplineService.findById(id),
    enabled: !!id,
  });
}
