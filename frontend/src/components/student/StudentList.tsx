import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Alert,
  Box,
  Typography,
  useMediaQuery,
  TableContainer,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Person } from "@mui/icons-material";
import { Student } from "@/interfaces/student/student.interface";
import { StudentListSkeleton } from "./list/StudentListSkeleton";
import { StudentCard } from "./list/StudentCard";
import { StudentCardSkeleton } from "./list/StudentCardSkeleton";
import { StudentTableRow } from "./list/StudentTableRow";

interface StudentListProps {
  students: Student[];
  loading: boolean;
  error: Error | null;
  onEdit: (student: Student) => void;
  onView: (student: Student) => void;
}

export default function StudentList({
  students,
  loading,
  error,
  onEdit,
  onView,
}: StudentListProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (loading) {
    return (
      <Box>
        {isMobile ? (
          [1, 2, 3].map((i) => <StudentCardSkeleton key={i} />)
        ) : (
          <StudentListSkeleton />
        )}
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        Erro ao carregar estudantes: {error.message}
      </Alert>
    );
  }

  if (students.length === 0) {
    return (
      <Card>
        <Box sx={{ p: 4, textAlign: "center" }}>
          <Person sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
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

  if (isMobile) {
    return (
      <Box>
        {students.map((s) => (
          <StudentCard key={s.id} student={s} onEdit={onEdit} onView={onView} />
        ))}
      </Box>
    );
  }

  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Estudante</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Data de Cadastro</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((s) => (
              <StudentTableRow
                key={s.id}
                student={s}
                onEdit={onEdit}
                onView={onView}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
