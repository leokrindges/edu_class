import { Discipline } from "@/interfaces/discipline/discipline.interface";
import { TableCell, TableRow } from "@mui/material";
import { DisciplineActionsMenu } from "./DisciplineActionsMenu";
import { memo } from "react";

interface DisciplineTableRowProps {
  discipline: Discipline;
  onEdit: (discipline: Discipline) => void;
}

function DisciplineTableRowBase({
  discipline,
  onEdit,
}: DisciplineTableRowProps) {
  return (
    <TableRow hover>
      <TableCell>{discipline.name}</TableCell>
      <TableCell>{discipline.description ?? "-"}</TableCell>
      <TableCell>{discipline.pricePerClass ?? "-"}</TableCell>
      <TableCell>{discipline.durationMin ?? "-"}</TableCell>
      <TableCell>
        {new Date(discipline.createdAt).toLocaleDateString("pt-BR")}
      </TableCell>
      <TableCell align="right">
        <DisciplineActionsMenu discipline={discipline} onEdit={onEdit} />
      </TableCell>
    </TableRow>
  );
}

export const DisciplineTableRow = memo(DisciplineTableRowBase);
