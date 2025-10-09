import { StudentStatus } from "@/interfaces/student/student.interface";
import z from "zod/v3";

// Esquema de validação com Zod
export const studentSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  email: z
    .string()
    .email("Email deve ter um formato válido")
    .max(100, "Email deve ter no máximo 100 caracteres"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\(\d{2}\) \d{4,5}-\d{4}$/.test(val),
      "Telefone deve estar no formato (11) 99999-9999"
    ),
  birthDate: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      const date = new Date(val);
      const today = new Date();
      const minAge = new Date(
        today.getFullYear() - 100,
        today.getMonth(),
        today.getDate()
      );
      return date <= today && date >= minAge;
    }, "Data de nascimento deve ser válida"),
  address: z
    .string()
    .max(255, "Endereço deve ter no máximo 255 caracteres")
    .optional(),
  status: z.nativeEnum(StudentStatus, {
    errorMap: () => ({ message: "Status deve ser válido" }),
  }),
  notes: z
    .string()
    .max(500, "Observações devem ter no máximo 500 caracteres")
    .optional(),
});

export type StudentFormData = z.infer<typeof studentSchema>;
