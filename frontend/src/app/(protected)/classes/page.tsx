"use client";
import { Container, Stack, Typography } from "@mui/material";

export default function ClassesPage() {
  return (
    <Container>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5">Aulas</Typography>
      </Stack>
      {/* Conteúdo da sua área logada */}
      <Typography>Bem-vindo! Área de Aulas 🎉</Typography>
    </Container>
  );
}
