import { TableRow, TableCell, Box, Avatar, Typography } from "@mui/material";
import { Person } from "@mui/icons-material";
import { memo } from "react";
import { Student } from "@/interfaces/student/student.interface";
import StatusChip from "@/components/common/StatusChip";
import { formatPhone } from "@/utils/formatters";
import { StudentActionsMenu } from "./StudentActionsMenu";

interface Props {
  student: Student;
  onEdit: (s: Student) => void;
  onView: (s: Student) => void;
}

function StudentTableRowBase({ student, onEdit, onView }: Props) {
  return (
    <TableRow hover>
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
      <TableCell>{student.phone ? formatPhone(student.phone) : "-"}</TableCell>
      <TableCell>
        <StatusChip status={student.status} />
      </TableCell>
      <TableCell>
        {new Date(student.createdAt).toLocaleDateString("pt-BR")}
      </TableCell>
      <TableCell align="right">
        <StudentActionsMenu student={student} onEdit={onEdit} onView={onView} />
      </TableCell>
    </TableRow>
  );
}

export const StudentTableRow = memo(StudentTableRowBase);
