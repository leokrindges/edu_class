import { http } from "@/http-module/http-client";

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
};
