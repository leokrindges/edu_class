"use client";
import { Container, Stack, Typography } from "@mui/material";

export default function FinancialPage() {
  return (
    <Container>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5">Financeiro</Typography>
      </Stack>
      {/* Conteúdo da sua área logada */}
      <Typography>Bem-vindo! Área de Financeiro 🎉</Typography>
    </Container>
  );
}
