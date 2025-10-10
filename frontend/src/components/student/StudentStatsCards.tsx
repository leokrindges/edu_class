import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Skeleton,
} from "@mui/material";
import { People, Person, PersonAdd } from "@mui/icons-material";
import { useStudentStats } from "@/hooks/student/useStudentStats";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: "primary" | "success" | "info";
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  const colorMap = {
    primary: "primary.main",
    success: "success.main",
    info: "info.main",
  };

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", }}>
          <Box
            sx={{
              borderRadius: 2,
              bgcolor: `${colorMap[color]}15`,
              color: colorMap[color],
              mr: 2,
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h5" component="div" fontWeight="bold">
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
        <Box sx={{ display: "flex", alignItems: "center", }}>
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
    <Grid container spacing={3} sx={{ mb: 2 }}>
      <Grid size={{ xs: 6, sm: 6, md: 4 }}>
        <StatCard
          title="Total de Alunos"
          value={stats.total}
          icon={<People />}
          color="primary"
        />
      </Grid>
      <Grid size={{ xs: 6, sm: 6, md: 4 }}>
        <StatCard
          title="Alunos Ativos"
          value={stats.active}
          icon={<Person />}
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
