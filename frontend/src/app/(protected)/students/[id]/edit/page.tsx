"use client";

import { Container, IconButton, Alert } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useParams, useRouter } from "next/navigation";
import StudentForm from "@/components/student/StudentForm";
import {
  useStudent,
  useUpdateStudent,
} from "@/hooks/student/useStudentMutations";
import { StudentDTO } from "@/services/student/dtos/student.dto";
import StudentSkeleton from "@/components/student/StudentSkeleton";

export default function EditStudentPage() {
  const params = useParams();
  const router = useRouter();
  const studentId = params.id as string;

  const { data: student, isLoading, error } = useStudent(studentId);
  const updateStudentMutation = useUpdateStudent();

  const handleSubmit = async (data: StudentDTO, avatar: string | null) => {
    updateStudentMutation.mutate(
      { id: studentId, data, avatar },
      {
        onSuccess: () => {
          router.push(`/students/${studentId}`);
        },
      }
    );
  };

  const handleCancel = () => {
    router.push(`/students/${studentId}`);
  };

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ py: 2 }}>
        <StudentSkeleton />
      </Container>
    );
  }

  if (error || !student) {
    return (
      <Container maxWidth="md" sx={{ py: 2 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Erro ao carregar estudante:{" "}
          {error?.message || "Estudante não encontrado"}
        </Alert>
        <IconButton onClick={() => router.push("/students")}>
          <ArrowBack sx={{ mr: 1 }} />
          Voltar para lista
        </IconButton>
      </Container>
    );
  }

  return (
    <StudentForm
      initialData={student}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      title="Editar Estudante"
      subtitle="Atualize as informações do estudante"
      submitButtonText="Salvar Alterações"
      loading={updateStudentMutation.isPending}
      error={updateStudentMutation.error?.message || ""}
    />
  );
}
