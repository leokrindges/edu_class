"use client";
import { Container, Stack, Typography } from "@mui/material";

export default function SettingsPage() {
  return (
    <Container>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5">Configurações</Typography>
      </Stack>
      {/* Conteúdo da sua área logada */}
      <Typography>Bem-vindo! Área de Configurações 🎉</Typography>
    </Container>
  );
}
