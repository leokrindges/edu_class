import {
  Card,
  CardContent,
  TextField,
  MenuItem,
  Grid,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Search, Clear } from "@mui/icons-material";
import { StudentStatus } from "@/interfaces/student/student.interface";

interface StudentFiltersProps {
  search: string;
  status?: StudentStatus;
  onSearchChange: (search: string) => void;
  onStatusChange: (status: StudentStatus | undefined) => void;
  onClearFilters: () => void;
  isSearching?: boolean;
}

const statusOptions = [
  { value: "", label: "Todos os Status" },
  { value: StudentStatus.ACTIVE, label: "Ativo" },
  { value: StudentStatus.INACTIVE, label: "Inativo" },
];

export default function StudentFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
  onClearFilters,
  isSearching = false,
}: StudentFiltersProps) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Grid container spacing={3} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              placeholder="Buscar por nome ou email..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {isSearching ? (
                      <CircularProgress size={20} />
                    ) : (
                      <Search color="action" />
                    )}
                  </InputAdornment>
                ),
                endAdornment: search && (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => onSearchChange("")}
                      edge="end"
                    >
                      <Clear />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              select
              label="Status"
              value={status || ""}
              onChange={(e) =>
                onStatusChange(
                  e.target.value ? (e.target.value as StudentStatus) : undefined
                )
              }
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <IconButton
              onClick={onClearFilters}
              color="primary"
              sx={{
                border: 1,
                borderColor: "primary.main",
                width: "100%",
                height: 56,
                borderRadius: 1,
              }}
            >
              <Clear />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
