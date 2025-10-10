import { useState, useCallback } from "react";

interface UsePaginationProps {
  initialPage?: number;
  initialItemsPerPage?: number;
}

export function usePagination({
  initialPage = 1,
  initialItemsPerPage = 10,
}: UsePaginationProps = {}) {
  const [page, setPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleItemsPerPageChange = useCallback((newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setPage(1);
  }, []);

  const resetPagination = useCallback(() => {
    setPage(1);
  }, []);

  return {
    page,
    itemsPerPage,
    handlePageChange,
    handleItemsPerPageChange,
    resetPagination,
    setPage,
    setItemsPerPage,
  };
}
