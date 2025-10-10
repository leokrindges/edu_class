import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Skeleton,
} from "@mui/material";
import { Groups, HowToReg, PersonAdd } from "@mui/icons-material";
import { alpha, useTheme } from "@mui/material/styles";
import { useStudentStats } from "@/hooks/useStudentStats";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: "primary" | "success" | "info";
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  const theme = useTheme();

  const colorMap = {
    primary: theme.palette.primary.main,
    success: theme.palette.success.main,
    info: theme.palette.info.main,
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Box
            sx={{
              p: 1.2,
              borderRadius: 1,
              bgcolor: alpha(colorMap[color], 0.15),
              color: colorMap[color],
              mr: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" component="div" fontWeight="bold">
          {value.toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
}

function StatCardSkeleton() {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Skeleton
            variant="rectangular"
            width={40}
            height={40}
            sx={{ mr: 2, borderRadius: 2 }}
          />
          <Skeleton variant="text" width="60%" height={32} />
        </Box>
        <Skeleton variant="text" width="40%" height={48} />
      </CardContent>
    </Card>
  );
}

export default function StudentStatsCards() {
  const { data: stats, isLoading, error } = useStudentStats();

  if (isLoading) {
    return (
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[1, 2, 3].map((index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <StatCardSkeleton />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (error || !stats) {
    return null;
  }

  return (
    <Grid container spacing={1} sx={{ mb: 2 }}>
      <Grid size={{ xs: 6, sm: 6, md: 4 }}>
        <StatCard
          title="Total de Alunos"
          value={stats.total}
          icon={<Groups />}
          color="primary"
        />
      </Grid>
      <Grid size={{ xs: 6, sm: 6, md: 4 }}>
        <StatCard
          title="Alunos Ativos"
          value={stats.active}
          icon={<HowToReg />}
          color="success"
        />
      </Grid>
      <Grid size={{ xs: 6, sm: 6, md: 4 }}>
        <StatCard
          title="Novos Este Mês"
          value={stats.newThisMonth}
          icon={<PersonAdd />}
          color="info"
        />
      </Grid>
    </Grid>
  );
}
