import { Discipline } from "@/interfaces/discipline/discipline.interface";
import { DisciplineListSkeleton } from "./DisciplineListSkeleton";
import {
  Alert,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { MenuBookOutlined } from "@mui/icons-material";
import { DisciplineTableRow } from "./DisciplineTableRow";

interface DisciplineListProps {
  disciplines: Discipline[];
  loading: boolean;
  error: Error | null;
  onEdit: (discipline: Discipline) => void;
}
export default function DisciplineList({
  disciplines,
  loading,
  error,
  onEdit,
}: DisciplineListProps) {
  if (loading) {
    return <DisciplineListSkeleton />;
  }

  if (error) {
    return (
      <Alert severity="error">
        Erro ao carregar estudantes: {error.message}
      </Alert>
    );
  }

  if (disciplines.length === 0) {
    return (
      <Card>
        <Box sx={{ p: 4, textAlign: "center" }}>
          <MenuBookOutlined
            sx={{ fontSize: 64, color: "text.secondary", mb: 2 }}
          />
          <Typography variant="h6" color="text.secondary">
            Nenhum estudante encontrado
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Tente ajustar os filtros ou adicionar um novo estudante
          </Typography>
        </Box>
      </Card>
    );
  }

  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "30%" }}>Nome</TableCell>
              <TableCell sx={{ width: "45%" }}>Descrição</TableCell>
              <TableCell sx={{ width: "15%" }}>Data de Cadastro</TableCell>
              <TableCell align="right" sx={{ width: "10%" }}>
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {disciplines.map((s) => (
              <DisciplineTableRow key={s.id} discipline={s} onEdit={onEdit} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
