import ConfirmDialog from "@/components/common/ConfirmDialog";
import { useDeleteDiscipline } from "@/hooks/discipline/useDisciplineMutation";
import { useConfirm } from "@/hooks/useConfirm";
import { Discipline } from "@/interfaces/discipline/discipline.interface";
import { Delete, Edit, MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { memo, useState } from "react";

interface Props {
  discipline: Discipline;
  onEdit: (s: Discipline) => void;
}

function DisciplineActionsMenuBase({ discipline, onEdit }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const deleteDisciplineMutation = useDeleteDiscipline();
  const { confirm, confirmProps } = useConfirm();

  const handleOpen = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleEdit = () => {
    onEdit(discipline);
    handleClose();
  };

  const handleDelete = async () => {
    handleClose();
    const ok = await confirm({
      title: "Excluir Disciplina",
      message: `Tem certeza que deseja excluir a disciplina "${discipline.name}"? Esta ação não pode ser desfeita.`,
      confirmText: "Excluir",
      cancelText: "Cancelar",
      variant: "danger",
    });
    if (ok) deleteDisciplineMutation.mutate(discipline.id);
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <MoreVert />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleEdit}>
          <Edit sx={{ mr: 1 }} /> Editar
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
          <Delete sx={{ mr: 1 }} /> Excluir
        </MenuItem>
      </Menu>

      <ConfirmDialog
        {...confirmProps}
        loading={deleteDisciplineMutation.isPending}
      />
    </>
  );
}

export const DisciplineActionsMenu = memo(DisciplineActionsMenuBase);
