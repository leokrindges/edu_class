import { Typography } from "@mui/material";
import { useMemo } from "react";

export function AppBarContent({ activeMenu }: { activeMenu: string }) {
  const currentDate = useMemo(() => {
    return new Date().toLocaleDateString("pt-BR", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, []);

  if (activeMenu === "Dashboard") {
    return (
      <Typography variant="body2" color="text.secondary">
        {currentDate.charAt(0).toUpperCase() + currentDate.slice(1)}
      </Typography>
    );
  }

  if (activeMenu === "Agenda") {
    return (
      <Typography variant="body2" color="text.secondary">
        Próximos compromissos
      </Typography>
    );
  }

  if (activeMenu === "Alunos") {
    return (
      <Typography variant="body2" color="text.secondary">
        Gerencie seus alunos e histórico
      </Typography>
    );
  }
  if (activeMenu === "Aulas") {
    return (
      <Typography variant="body2" color="text.secondary">
        Gerencie suas aulas
      </Typography>
    );
  }
  if (activeMenu === "Disciplinas") {
    return (
      <Typography variant="body2" color="text.secondary">
        Gerencie suas disciplinas
      </Typography>
    );
  }

  if (activeMenu === "Financeiro") {
    return (
      <Typography variant="body2" color="text.secondary">
        Gerencie pagamentos e receitas
      </Typography>
    );
  }

  if (activeMenu === "Configurações") {
    return (
      <Typography variant="body2" color="text.secondary">
        Gerencie suas preferências e conta
      </Typography>
    );
  }

  return null;
}
