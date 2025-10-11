"use client";
import { Container, Stack, Typography } from "@mui/material";

export default function SubjectsPage() {
  return (
    <Container>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5">Disciplinas</Typography>
      </Stack>
      {/* Conteúdo da sua área logada */}
      <Typography>Bem-vindo! Área de Disciplinas 🎉</Typography>
    </Container>
  );
}
