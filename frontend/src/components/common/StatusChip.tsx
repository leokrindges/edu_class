import { Chip } from "@mui/material";
import { StudentStatus } from "@/interfaces/student/student.interface";
import { getStatusColor, getStatusLabel } from "@/utils/student-status.util";

interface StatusChipProps {
  status: StudentStatus;
  size?: "small" | "medium";
  variant?: "filled" | "outlined";
}

export default function StatusChip({
  status,
  size = "small",
  variant = "filled",
}: StatusChipProps) {
  return (
    <Chip
      label={getStatusLabel(status)}
      color={getStatusColor(status)}
      size={size}
      variant={variant}
    />
  );
}
