"use client";
import { Container, Stack, Typography } from "@mui/material";

export default function StudentsPage() {
  return (
    <Container>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5">Estudantes</Typography>
      </Stack>
      {/* Conteúdo da sua área logada */}
      <Typography>Bem-vindo! Área de Estudantes 🎉</Typography>
    </Container>
  );
}
