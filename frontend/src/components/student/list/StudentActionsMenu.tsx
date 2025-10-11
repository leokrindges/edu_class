import { IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert, Edit, Delete, Visibility } from "@mui/icons-material";
import { useState, memo } from "react";
import { useDeleteStudent } from "@/hooks/student/useStudentMutations";
import { useConfirm } from "@/hooks/useConfirm";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { Student } from "@/interfaces/student/student.interface";

interface Props {
  student: Student;
  onEdit: (s: Student) => void;
  onView: (s: Student) => void;
}

function StudentActionsMenuBase({ student, onEdit, onView }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const deleteStudentMutation = useDeleteStudent();
  const { confirm, confirmProps } = useConfirm();

  const handleOpen = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

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
    const ok = await confirm({
      title: "Excluir Estudante",
      message: `Tem certeza que deseja excluir o estudante "${student.name}"? Esta ação não pode ser desfeita.`,
      confirmText: "Excluir",
      cancelText: "Cancelar",
      variant: "danger",
    });
    if (ok) deleteStudentMutation.mutate(student.id);
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <MoreVert />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleView}>
          <Visibility sx={{ mr: 1 }} /> Visualizar
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <Edit sx={{ mr: 1 }} /> Editar
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
          <Delete sx={{ mr: 1 }} /> Excluir
        </MenuItem>
      </Menu>

      <ConfirmDialog
        {...confirmProps}
        loading={deleteStudentMutation.isPending}
      />
    </>
  );
}

export const StudentActionsMenu = memo(StudentActionsMenuBase);
