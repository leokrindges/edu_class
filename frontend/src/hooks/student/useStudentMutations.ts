import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { studentService } from "@/services/student/student.service";
import { toast } from "react-hot-toast";
import { StudentDTO } from "@/services/student/dtos/student.dto";
import { FindAllQueryParamsDto } from "@/services/student/dtos/find-all-student-query.dto";

export function useCreateStudent() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      data,
      avatar,
    }: {
      data: StudentDTO;
      avatar: string | null;
    }) => {
      return studentService.create({ ...data, avatar });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });

      toast.success("Estudante criado com sucesso!");
      router.push("/students");
    },
    onError: (error: Error) => {
      const message = error.message || "Erro ao criar estudante";
      toast.error(message);
    },
  });
}

export function useUpdateStudent() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
      avatar,
    }: {
      id: string;
      data: StudentDTO;
      avatar: string | null;
    }) => {
      return studentService.update(id, { ...data, avatar });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Estudante atualizado com sucesso!");
      router.push("/students");
    },
    onError: (error: Error) => {
      const message = error.message || "Erro ao atualizar estudante";
      toast.error(message);
    },
  });
}

// Hook para buscar lista de estudantes
export function useStudents(params?: FindAllQueryParamsDto) {
  return useQuery({
    queryKey: ["students", params],
    queryFn: () => studentService.findAll(params),
  });
}

// Hook para buscar um estudante específico
export function useStudent(id: string) {
  return useQuery({
    queryKey: ["students", id],
    queryFn: () => studentService.findById(id),
    enabled: !!id,
  });
}

// Hook para deletar estudante
export function useDeleteStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => studentService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Estudante excluído com sucesso!");
    },
    onError: (error: Error) => {
      const message = error.message || "Erro ao excluir estudante";
      toast.error(message);
    },
  });
}
