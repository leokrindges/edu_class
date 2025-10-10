import { useQuery } from "@tanstack/react-query";
import { StudentStatus } from "@/interfaces/student/student.interface";
import { studentService } from "@/services/student/student.service";

export interface StudentStats {
  total: number;
  active: number;
  newThisMonth: number;
}

export function useStudentStats() {
  return useQuery({
    queryKey: ["students", "stats"],
    queryFn: async (): Promise<StudentStats> => {
      const response = await studentService.findAll();

      const total = response.total;
      const active = response.data.filter(
        (student) => student.status === StudentStatus.ACTIVE
      ).length;

      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const newThisMonth = response.data.filter((student) => {
        const createdDate = new Date(student.createdAt);
        return (
          createdDate.getMonth() === currentMonth &&
          createdDate.getFullYear() === currentYear
        );
      }).length;

      return {
        total,
        active,
        newThisMonth,
      };
    },
  });
}
