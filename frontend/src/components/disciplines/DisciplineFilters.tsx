import {
  Card,
  CardContent,
  TextField,
  Grid,
  InputAdornment,
  IconButton,
  CircularProgress,
  Button,
} from "@mui/material";
import { Search, Clear } from "@mui/icons-material";

interface DisciplineFiltersProps {
  search: string;
  onSearchChange: (search: string) => void;
  onClearFilters: () => void;
  isSearching?: boolean;
}

export default function DisciplineFilters({
  search,
  onSearchChange,
  onClearFilters,
  isSearching = false,
}: DisciplineFiltersProps) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Grid container spacing={1} alignItems="center">
          <Grid size={{ xs: 12, sm: 6, md: 7 }}>
            <TextField
              fullWidth
              placeholder="Buscar por nome..."
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
