import {
  Box,
  Pagination as MuiPagination,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  SelectChangeEvent,
} from "@mui/material";
import { ChangeEvent } from "react";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  showItemsPerPage?: boolean;
  itemsPerPageOptions?: number[];
  showItemCount?: boolean;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  showItemsPerPage = true,
  itemsPerPageOptions = [5, 10, 20, 50],
  showItemCount = true,
  size = "medium",
  disabled = false,
  className,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
    const newItemsPerPage = Number(event.target.value);
    onItemsPerPageChange?.(newItemsPerPage);

    const newTotalPages = Math.ceil(totalItems / newItemsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      onPageChange(newTotalPages);
    }
  };

  if (totalItems === 0) return null;

  return (
    <Box
      className={className}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
        p: 2,
      }}
    >
      {showItemCount && (
        <Typography variant="body2" color="text.secondary">
          Mostrando {startItem} a {endItem} de {totalItems} itens
        </Typography>
      )}

      <Stack direction="row" alignItems="center" spacing={2}>
        {showItemsPerPage && onItemsPerPageChange && (
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Por página</InputLabel>
            <Select
              value={itemsPerPage}
              label="Por página"
              onChange={handleItemsPerPageChange}
              disabled={disabled}
            >
              {itemsPerPageOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <MuiPagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          size={size}
          disabled={disabled}
          showFirstButton
          showLastButton
          color="primary"
        />
      </Stack>
    </Box>
  );
}
