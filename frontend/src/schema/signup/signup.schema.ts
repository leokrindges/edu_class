import { UserType } from "@/interfaces/user/user.interface";
import z from "zod";

export const SignupSchema = z
  .object({
    name: z.string().min(2, "Seu nome deve ter pelo menos 2 caracteres"),
    email: z.email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
    type: z.enum([UserType.TEACHER, UserType.STUDENT] as const, {
      message: "Selecione um tipo de usuário",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não conferem",
  });

export type SignupForm = z.infer<typeof SignupSchema>;
