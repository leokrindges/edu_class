'use client';
import DisciplinesForm from "@/components/disciplines/DisciplinesForm";
import { useCreateDiscipline } from "@/hooks/discipline/useDisciplineMutation";
import { DisciplineDTO } from "@/services/disciplines/dtos/discipline.dto";

export default function CreateDisciplinePage() {
  const createDisciplineMutation = useCreateDiscipline();

  const handleSubmit = async (data: DisciplineDTO) => {
    await createDisciplineMutation.mutateAsync({ dto: data });
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <DisciplinesForm
      title="Nova Disciplina"
      subtitle="Preencha os dados da nova disciplina"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      submitButtonText="Criar Disciplina"
      loading={createDisciplineMutation.isPending}
      error={createDisciplineMutation.error?.message || ""}
    />
  );
}
