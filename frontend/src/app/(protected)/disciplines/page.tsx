"use client";
import DisciplineFilters from "@/components/disciplines/DisciplineFilters";
import DisciplineList from "@/components/disciplines/list/DisciplineList";
import { useDisciplines } from "@/hooks/discipline/useDisciplineMutation";
import { useDebounce } from "@/hooks/useDebounce";
import { usePagination } from "@/hooks/usePagination";
import { Discipline } from "@/interfaces/discipline/discipline.interface";
import { Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function DisciplinesPage() {
  const [search, setSearch] = useState("");
  const router = useRouter();

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
    }),
    [page, itemsPerPage, debouncedSearch]
  );

  const { data, error, isLoading } = useDisciplines(queryParams);

  const handleClearFilters = () => {
    setSearch("");
    resetPagination();
  };

  const handleEdit = (discipline: Discipline) => {
    router.push(`/disciplines/${discipline.id}/edit`);
  };

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
    resetPagination();
  };

  return (
    <Container>
      <DisciplineFilters
        search={search}
        onSearchChange={handleSearchChange}
        onClearFilters={handleClearFilters}
        isSearching={search !== debouncedSearch}
      />

      <DisciplineList
        disciplines={data?.data ?? []}
        loading={isLoading}
        error={error}
        onEdit={handleEdit}
      />
    </Container>
  );
}
