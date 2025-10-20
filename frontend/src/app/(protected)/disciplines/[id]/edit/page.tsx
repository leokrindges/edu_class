"use client";
import DisciplineFormSkeleton from "@/components/disciplines/DisciplineFormSkeleton";
import DisciplinesForm from "@/components/disciplines/DisciplinesForm";
import {
  useDiscipline,
  useUpdateDiscipline,
} from "@/hooks/discipline/useDisciplineMutation";
import { DisciplineDTO } from "@/services/disciplines/dtos/discipline.dto";
import { ArrowBack } from "@mui/icons-material";
import { Alert, Container, IconButton } from "@mui/material";
import { useParams, useRouter } from "next/navigation";

export default function EditDisciplinePage() {
  const params = useParams();
  const router = useRouter();
  const disciplineId = params.id as string;

  const { data: discipline, isLoading, error } = useDiscipline(disciplineId);
  const updateDisciplineMutation = useUpdateDiscipline();

  const handleSubmit = async (data: Partial<DisciplineDTO>) => {
    updateDisciplineMutation.mutate(
      { id: disciplineId, dto: data },
      {
        onSuccess: () => {
          router.push(`/disciplines/${disciplineId}`);
        },
      }
    );
  };

  const handleCancel = () => {
    router.push(`/disciplines`);
  };

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ py: 2 }}>
        <DisciplineFormSkeleton />
      </Container>
    );
  }

  if (error || !discipline) {
    return (
      <Container maxWidth="md" sx={{ py: 2 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Erro ao carregar disciplina:{" "}
          {error?.message || "Disciplina não encontrada"}
        </Alert>
        <IconButton onClick={() => router.push("/disciplines")}>
          <ArrowBack sx={{ mr: 1 }} />
          Voltar para lista
        </IconButton>
      </Container>
    );
  }

  return (
    <DisciplinesForm
      initialData={discipline}
      onCancel={handleCancel}
      onSubmit={handleSubmit}
      title="Editar Disciplina"
      subtitle={`Modifique os dados da disciplina "${discipline.name}"`}
      submitButtonText="Salvar Alterações"
      loading={updateDisciplineMutation.isPending}
      error={updateDisciplineMutation.error?.message || ""}
    />
  );
}
