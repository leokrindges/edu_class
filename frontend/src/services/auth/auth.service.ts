import { http } from "@/http-module/http-client";
import { SignUpDto } from "./dtos/signup.dto";

export const authService = {
  signIn: async (email: string, password: string) => {
    const res = await http.post("/auth/signin", { email, password });

    return res.ok;
  },
  signOut: async () => {
    await http.post("/auth/signout");
  },
  refresh: async () => {
    const res = await http.post("/auth/refresh");
    return res.ok;
  },
  signUp: async (data: SignUpDto) => {
    const res = await http.post("/auth/signup", data);
    if (!res.ok) throw new Error("Erro ao criar a conta, tente novamente.");
    return res.ok;
  },
};
