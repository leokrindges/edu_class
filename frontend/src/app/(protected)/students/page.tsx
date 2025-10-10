"use client";

import { Container } from "@mui/material";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import StudentStatsCards from "@/components/student/StudentStatsCards";
import StudentFilters from "@/components/student/StudentFilters";
import StudentList from "@/components/student/StudentList";
import { useStudents } from "@/hooks/useStudentMutations";
import { useDebounce } from "@/hooks/useDebounce";
import { Student, StudentStatus } from "@/interfaces/student/student.interface";

export default function StudentsPage() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<StudentStatus | undefined>();
  const [page, setPage] = useState(1);

  // ✅ Debounce da busca por 500ms
  const debouncedSearch = useDebounce(search, 500);

  // ✅ Parâmetros da query com debounce aplicado
  const queryParams = useMemo(
    () => ({
      page,
      limit: 1,
      search: debouncedSearch || undefined,
      status: status || undefined,
    }),
    [page, debouncedSearch, status]
  );

  const { data, isLoading, error } = useStudents(queryParams);

  // ✅ Resetar página quando filtros mudam
  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
    setPage(1); // Voltar para primeira página
  };

  const handleStatusChange = (newStatus: StudentStatus | undefined) => {
    setStatus(newStatus);
    setPage(1); // Voltar para primeira página
  };

  const handleClearFilters = () => {
    setSearch("");
    setStatus(undefined);
    setPage(1);
  };

  const handleEdit = (student: Student) => {
    router.push(`/students/${student.id}/edit`);
  };

  const handleView = (student: Student) => {
    router.push(`/students/${student.id}`);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Cards de Estatísticas */}
      <StudentStatsCards />

      {/* Filtros */}
      <StudentFilters
        search={search} // ✅ Valor imediato (sem debounce) para UX responsiva
        status={status}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onClearFilters={handleClearFilters}
        isSearching={search !== debouncedSearch} // ✅ Indicador de busca
      />

      {/* Lista de Estudantes */}
      <StudentList
        students={data?.data || []}
        loading={isLoading}
        error={error}
        onEdit={handleEdit}
        onView={handleView}
      />
    </Container>
  );
}
