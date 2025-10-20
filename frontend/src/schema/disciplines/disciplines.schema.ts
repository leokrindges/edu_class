import z from "zod/v3";

export const disciplinesSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  description: z
    .string()
    .max(255, "Descrição deve ter no máximo 255 caracteres")
    .optional(),
  pricePerClass: z.coerce
    .number()
    .positive("Preço por aula deve ser um número positivo")
    .optional(),
  durationMin: z.coerce
    .number()
    .positive("Duração deve ser um número positivo")
    .optional(),
});

export type DisciplineFormData = z.infer<typeof disciplinesSchema>;
