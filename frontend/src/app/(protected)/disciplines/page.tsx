"use client";
import DisciplineList from "@/components/disciplines/list/DisciplineList";
import { useDisciplines } from "@/hooks/discipline/useDisciplineMutation";
import { Discipline } from "@/interfaces/discipline/discipline.interface";
import { Container } from "@mui/material";
import { useRouter } from "next/navigation";

export default function DisciplinesPage() {
  const router = useRouter();
  const { data, error, isLoading } = useDisciplines();

  const handleEdit = (discipline: Discipline) => {
    router.push(`/disciplines/${discipline.id}/edit`);
  };

  return (
    <Container>
      <DisciplineList
        disciplines={data ?? []}
        loading={isLoading}
        error={error}
        onEdit={handleEdit}
      />
    </Container>
  );
}
