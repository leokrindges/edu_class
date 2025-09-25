// app/(protected)/dashboard/page.tsx
"use client";
import Protected from "@/components/Protected";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useAuth } from "@/contexts/auth";

export default function DashboardPage() {
  const { signOut } = useAuth();

  return (
    <Protected>
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
        <Typography>Bem-vindo! 🎉</Typography>
      </Container>
    </Protected>
  );
}
