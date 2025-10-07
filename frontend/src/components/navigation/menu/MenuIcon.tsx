import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SettingsIcon from "@mui/icons-material/Settings";
import InboxIcon from "@mui/icons-material/Inbox";
import { CastForEducationOutlined, MenuBookOutlined } from "@mui/icons-material";

export function getMenuIcon(name: string) {
  switch (name) {
    case "Dashboard":
      return <DashboardIcon />;
    case "Agenda":
      return <EventIcon />;
    case "Alunos":
      return <SchoolIcon />;
    case "Aulas":
      return <CastForEducationOutlined />;
    case "Disciplinas":
      return <MenuBookOutlined />;
    case "Financeiro":
      return <AttachMoneyIcon />;
    case "Configurações":
      return <SettingsIcon />;
    default:
      return <InboxIcon />;
  }
}
