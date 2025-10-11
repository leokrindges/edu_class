import {
  Card,
  CardContent,
  TextField,
  MenuItem,
  Grid,
  InputAdornment,
  IconButton,
  CircularProgress,
  Button,
} from "@mui/material";
import { Search, Clear } from "@mui/icons-material";
import { StudentStatus } from "@/interfaces/student/student.interface";
import { studentStatusOptions } from "@/utils/student-status.util";

interface StudentFiltersProps {
  search: string;
  status?: StudentStatus;
  onSearchChange: (search: string) => void;
  onStatusChange: (status: StudentStatus | undefined) => void;
  onClearFilters: () => void;
  isSearching?: boolean;
}

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
        <Grid container spacing={1} alignItems="center">
          <Grid size={{ xs: 12, sm: 6, md: 7 }}>
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
          <Grid size={{ xs: 7, sm: 4, md: 3 }}>
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
              <MenuItem value="">Todos os Status</MenuItem>
              {studentStatusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 5, sm: 2, md: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              startIcon={<Clear />}
              onClick={onClearFilters}
              sx={{
                height: 56,
                borderRadius: 1,
              }}
            >
              Limpar
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
