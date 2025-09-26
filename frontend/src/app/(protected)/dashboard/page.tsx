"use client";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useAuth } from "@/contexts/auth";

export default function DashboardPage() {
  const { signOut, user } = useAuth();
  return (
    <Container sx={{ py: 6 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5">Dashboard</Typography>
        <Button onClick={signOut} variant="outlined">
          Sair
        </Button>
      </Stack>
      {/* Conteúdo da sua área logada */}
      <Typography>Bem-vindo! {user?.name} 🎉</Typography>
    </Container>
  );
}
