"use client";

import StudentForm from "@/components/forms/student/StudentForm";
import { useCreateStudent } from "@/hooks/student/useStudentMutations";
import { StudentDTO } from "@/services/student/dtos/student.dto";

export default function CreateStudentPage() {
  const createStudentMutation = useCreateStudent();

  const handleSubmit = async (data: StudentDTO, avatar: string | null) => {
    createStudentMutation.mutate({ data, avatar });
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <StudentForm
      title="Novo Estudante"
      subtitle="Preencha as informações do estudante"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      submitButtonText="Criar Estudante"
      loading={createStudentMutation.isPending}
      error={createStudentMutation.error?.message || ""}
    />
  );
}
