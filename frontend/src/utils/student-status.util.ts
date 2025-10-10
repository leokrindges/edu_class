import { StudentStatus } from "@/interfaces/student/student.interface";

export function getStatusColor(
  status: StudentStatus
): "success" | "default" | "error" {
  switch (status) {
    case StudentStatus.ACTIVE:
      return "success";
    case StudentStatus.INACTIVE:
      return "default";
    default:
      return "default";
  }
}

export function getStatusLabel(status: StudentStatus): string {
  switch (status) {
    case StudentStatus.ACTIVE:
      return "Ativo";
    case StudentStatus.INACTIVE:
      return "Inativo";
    default:
      return status;
  }
}

// ✅ Função adicional para ícone
export function getStatusIcon(status: StudentStatus) {
  switch (status) {
    case StudentStatus.ACTIVE:
      return "✓";
    case StudentStatus.INACTIVE:
      return "⏸";
    default:
      return "?";
  }
}

// ✅ Função que retorna tudo junto
export function getStatusInfo(status: StudentStatus) {
  return {
    color: getStatusColor(status),
    label: getStatusLabel(status),
    icon: getStatusIcon(status),
  };
}

// ✅ Lista de todos os status para selects/filtros
export const studentStatusOptions = [
  { value: StudentStatus.ACTIVE, label: getStatusLabel(StudentStatus.ACTIVE) },
  {
    value: StudentStatus.INACTIVE,
    label: getStatusLabel(StudentStatus.INACTIVE),
  },
];
