import { Add, MenuBookOutlined, PersonAdd } from "@mui/icons-material";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function getAppBarButton(activeMenu: string, router: AppRouterInstance) {
  switch (activeMenu) {
    case "Dashboard":
    case "Aulas":
    case "Agenda":
      return {
        label: "Nova aula",
        icon: <Add />,
        onClick: () => alert("Criar nova aula"),
      };
    case "Alunos":
      return {
        label: "Novo aluno",
        icon: <PersonAdd />,
        onClick: () => router.push("/students/create"),
      };
    case "Disciplinas":
      return {
        label: "Nova disciplina",
        icon: <MenuBookOutlined />,
        onClick: () => alert("Criar nova matéria"),
      };
    default:
      return null;
  }
}
