import {
  Card,
  Box,
  Stack,
  Avatar,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { Edit, Delete, Visibility, Person } from "@mui/icons-material";
import { memo } from "react";
import { Student } from "@/interfaces/student/student.interface";
import { useConfirm } from "@/hooks/useConfirm";
import { useDeleteStudent } from "@/hooks/student/useStudentMutations";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import StatusChip from "@/components/common/StatusChip";
import { formatPhone } from "@/utils/formatters";

interface Props {
  student: Student;
  onEdit: (s: Student) => void;
  onView: (s: Student) => void;
}

function StudentCardBase({ student, onEdit, onView }: Props) {
  const { confirm, confirmProps } = useConfirm();
  const deleteStudentMutation = useDeleteStudent();

  const handleDelete = async () => {
    const ok = await confirm({
      title: "Excluir Estudante",
      message: `Tem certeza que deseja excluir o estudante "${student.name}"?`,
      confirmText: "Excluir",
      cancelText: "Cancelar",
      variant: "danger",
    });
    if (ok) deleteStudentMutation.mutate(student.id);
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

export const StudentCard = memo(StudentCardBase);
