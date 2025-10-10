"use client";

import { Container } from "@mui/material";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import StudentStatsCards from "@/components/student/StudentStatsCards";
import StudentFilters from "@/components/student/StudentFilters";
import StudentList from "@/components/student/StudentList";
import Pagination from "@/components/common/Pagination";
import { useStudents } from "@/hooks/student/useStudentMutations";
import { useDebounce } from "@/hooks/useDebounce";
import { usePagination } from "@/hooks/usePagination";
import { Student, StudentStatus } from "@/interfaces/student/student.interface";

export default function StudentsPage() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<StudentStatus | undefined>();

  const {
    page,
    itemsPerPage,
    handlePageChange,
    handleItemsPerPageChange,
    resetPagination,
  } = usePagination({
    initialPage: 1,
    initialItemsPerPage: 10,
  });

  const debouncedSearch = useDebounce(search, 500);

  const queryParams = useMemo(
    () => ({
      page,
      limit: itemsPerPage,
      search: debouncedSearch || undefined,
      status: status || undefined,
    }),
    [page, itemsPerPage, debouncedSearch, status]
  );

  const { data, isLoading, error } = useStudents(queryParams);

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
    resetPagination();
  };

  const handleStatusChange = (newStatus: StudentStatus | undefined) => {
    setStatus(newStatus);
    resetPagination();
  };

  const handleClearFilters = () => {
    setSearch("");
    setStatus(undefined);
    resetPagination();
  };

  const handleEdit = (student: Student) => {
    router.push(`/students/${student.id}/edit`);
  };

  const handleView = (student: Student) => {
    router.push(`/students/${student.id}`);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <StudentStatsCards />

      <StudentFilters
        search={search}
        status={status}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onClearFilters={handleClearFilters}
        isSearching={search !== debouncedSearch}
      />

      <StudentList
        students={data?.data || []}
        loading={isLoading}
        error={error}
        onEdit={handleEdit}
        onView={handleView}
      />

      {!isLoading && data && (
        <Pagination
          currentPage={page}
          totalItems={data.total}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          itemsPerPageOptions={[5, 10, 20, 50]}
          showItemCount={true}
          showItemsPerPage={true}
        />
      )}
    </Container>
  );
}
