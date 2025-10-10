import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  Alert,
  Stack,
  Divider,
  useMediaQuery,
} from "@mui/material";
import {
  MoreVert,
  Edit,
  Delete,
  Visibility,
  Person,
} from "@mui/icons-material";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useDeleteStudent } from "@/hooks/student/useStudentMutations";
import { Student } from "@/interfaces/student/student.interface";
import { formatPhone } from "@/utils/formatters";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { useConfirm } from "@/hooks/useConfirm";
import StatusChip from "../common/StatusChip";

interface StudentListProps {
  students: Student[];
  loading: boolean;
  error: Error | null;
  onEdit: (student: Student) => void;
  onView: (student: Student) => void;
}

interface ActionsMenuProps {
  student: Student;
  onEdit: (student: Student) => void;
  onView: (student: Student) => void;
}

function ActionsMenu({ student, onEdit, onView }: ActionsMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const deleteStudentMutation = useDeleteStudent();
  const { confirm, confirmProps } = useConfirm();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit(student);
    handleClose();
  };

  const handleView = () => {
    onView(student);
    handleClose();
  };

  const handleDelete = async () => {
    handleClose();

    const confirmed = await confirm({
      title: "Excluir Estudante",
      message: `Tem certeza que deseja excluir o estudante "${student.name}"? Esta ação não pode ser desfeita.`,
      confirmText: "Excluir",
      cancelText: "Cancelar",
      variant: "danger",
    });

    if (confirmed) {
      deleteStudentMutation.mutate(student.id);
    }
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleView}>
          <Visibility sx={{ mr: 1 }} />
          Visualizar
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <Edit sx={{ mr: 1 }} />
          Editar
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
          <Delete sx={{ mr: 1 }} />
          Excluir
        </MenuItem>
      </Menu>

      <ConfirmDialog
        {...confirmProps}
        loading={deleteStudentMutation.isPending}
      />
    </>
  );
}

function StudentListSkeleton() {
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
            {[1, 2].map((index) => (
              <TableRow key={index}>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Skeleton
                      variant="circular"
                      width={40}
                      height={40}
                      sx={{ mr: 2 }}
                    />
                    <Skeleton variant="text" width={120} />
                  </Box>
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={180} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={120} />
                </TableCell>
                <TableCell>
                  <Skeleton
                    variant="rectangular"
                    width={60}
                    height={24}
                    sx={{ borderRadius: 3 }}
                  />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={100} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="circular" width={24} height={24} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

// ✅ Componente de Card para mobile
function StudentCard({ student, onEdit, onView }: ActionsMenuProps) {
  const { confirm, confirmProps } = useConfirm();
  const deleteStudentMutation = useDeleteStudent();

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: "Excluir Estudante",
      message: `Tem certeza que deseja excluir o estudante "${student.name}"? Esta ação não pode ser desfeita.`,
      confirmText: "Excluir",
      cancelText: "Cancelar",
      variant: "danger",
    });

    if (confirmed) {
      deleteStudentMutation.mutate(student.id);
    }
  };

  return (
    <>
      <Card sx={{ mb: 2 }}>
        <Box sx={{ p: 2 }}>
          <Stack direction="row" alignItems="center" spacing={2} mb={2}>
            <Avatar
              src={student.avatar || undefined}
              sx={{ bgcolor: "primary.main" }}
            >
              <Person />
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {student.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {student.email}
              </Typography>
            </Box>
            <StatusChip status={student.status} />
          </Stack>

          <Divider sx={{ mb: 2 }} />

          <Stack spacing={1} mb={2}>
            {student.phone && (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" color="text.secondary">
                  Telefone:
                </Typography>
                <Typography variant="body2">
                  {formatPhone(student.phone)}
                </Typography>
              </Box>
            )}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" color="text.secondary">
                Cadastrado em:
              </Typography>
              <Typography variant="body2">
                {new Date(student.createdAt).toLocaleDateString("pt-BR")}
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <IconButton size="small" onClick={() => onView(student)}>
              <Visibility />
            </IconButton>
            <IconButton size="small" onClick={() => onEdit(student)}>
              <Edit />
            </IconButton>
            <IconButton
              size="small"
              onClick={handleDelete}
              sx={{ color: "error.main" }}
            >
              <Delete />
            </IconButton>
          </Stack>
        </Box>
      </Card>

      <ConfirmDialog
        {...confirmProps}
        loading={deleteStudentMutation.isPending}
      />
    </>
  );
}

// ✅ Skeleton para cards mobile
function StudentCardSkeleton() {
  return (
    <Card sx={{ mb: 2 }}>
      <Box sx={{ p: 2 }}>
        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
          <Skeleton variant="circular" width={40} height={40} />
          <Box sx={{ flexGrow: 1 }}>
            <Skeleton variant="text" width="60%" height={24} />
            <Skeleton variant="text" width="80%" height={20} />
          </Box>
          <Skeleton
            variant="rectangular"
            width={60}
            height={24}
            sx={{ borderRadius: 3 }}
          />
        </Stack>
        <Divider sx={{ mb: 2 }} />
        <Stack spacing={1} mb={2}>
          <Skeleton variant="text" width="100%" height={20} />
          <Skeleton variant="text" width="100%" height={20} />
        </Stack>
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="circular" width={32} height={32} />
        </Stack>
      </Box>
    </Card>
  );
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
          <>
            {[1, 2, 3].map((index) => (
              <StudentCardSkeleton key={index} />
            ))}
          </>
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

  // ✅ CONDIÇÃO: Cards em mobile/tablet, tabela em desktop
  if (isMobile) {
    return (
      <Box>
        {students.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            onEdit={onEdit}
            onView={onView}
          />
        ))}
      </Box>
    );
  }

  // ✅ Tabela para desktop
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
            {students.map((student) => (
              <TableRow key={student.id} hover>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src={student.avatar || undefined}
                      sx={{ mr: 2, bgcolor: "primary.main" }}
                    >
                      <Person />
                    </Avatar>
                    <Typography variant="subtitle2">{student.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>
                  {student.phone ? formatPhone(student.phone) : "-"}
                </TableCell>
                <TableCell>
                  <StatusChip status={student.status} />
                </TableCell>
                <TableCell>
                  {new Date(student.createdAt).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell align="right">
                  <ActionsMenu
                    student={student}
                    onEdit={onEdit}
                    onView={onView}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
