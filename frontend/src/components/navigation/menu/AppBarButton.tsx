import { Add, MenuBookOutlined, PersonAdd } from "@mui/icons-material";

export function getAppBarButton(activeMenu: string) {
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
        onClick: () => alert("Criar novo aluno"),
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
