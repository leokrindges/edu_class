
import {
  Grid,
  Skeleton,
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";

interface DisciplineFormSkeletonProps {
  title?: string;
  subtitle?: string;
}

export default function DisciplineFormSkeleton({
  title = "Carregando...",
  subtitle = "Aguarde um momento",
}: DisciplineFormSkeletonProps) {
  return (
    <Box sx={{ maxWidth: "lg", mx: "auto", p: 3 }}>
      {/* Cabeçalho do formulário */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {subtitle}
        </Typography>
      </Box>

      {/* Card do formulário */}
      <Card>
        <CardContent sx={{ p: 3 }}>
          {/* Seção: Informações da Disciplina */}
          <Box sx={{ mb: 4 }}>
            <Stack direction="row" alignItems="center" sx={{ mb: 3 }}>
              <Skeleton
                variant="circular"
                width={24}
                height={24}
                sx={{ mr: 1 }}
              />
              <Skeleton variant="text" width={200} height={32} />
            </Stack>

            <Grid container spacing={3}>
              {/* Campo Nome */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <Stack spacing={1}>
                  <Skeleton variant="text" width={120} height={20} />
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={56}
                    sx={{ borderRadius: 1 }}
                  />
                </Stack>
              </Grid>

              {/* Campo Descrição */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <Stack spacing={1}>
                  <Skeleton variant="text" width={100} height={20} />
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={56}
                    sx={{ borderRadius: 1 }}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Box>

          {/* Botões de ação */}
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid size="auto">
              <Skeleton
                variant="rectangular"
                width={100}
                height={40}
                sx={{ borderRadius: 1 }}
              />
            </Grid>
            <Grid size="auto">
              <Skeleton
                variant="rectangular"
                width={120}
                height={40}
                sx={{ borderRadius: 1 }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
