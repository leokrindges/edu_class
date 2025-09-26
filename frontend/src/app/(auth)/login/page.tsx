"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RHFPasswordField from "@/components/ui/RHFPasswordFieldInner";
import { LoginForm, LoginSchema } from "@/schema/signin/signin.schema";

export default function LoginPage() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    control,
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });

  const onSubmit = handleSubmit(async ({ email, password }) => {
    setSubmitError(null);
    const ok = await signIn(email, password);
    if (ok) {
      router.replace("/dashboard");
    } else {
      setSubmitError("Credenciais inválidas. Verifique e tente novamente.");
      setError("email", { message: " " });
      setError("password", { message: " " });
    }
  });

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: { xs: 3, sm: 4 } }}>
        <Typography variant="h5" mb={2} fontWeight={700}>
          Entrar
        </Typography>

        <Box component="form" onSubmit={onSubmit} noValidate>
          <Stack spacing={2.5}>
            <TextField
              label="E-mail"
              type="email"
              autoComplete="email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email")}
            />

            <RHFPasswordField
              name="password"
              control={control}
              label="Senha"
              autoComplete="new-password"
            />

            {submitError && <Alert severity="error">{submitError}</Alert>}

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>

            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              Não tem conta?{" "}
              <Button
                component={Link}
                href="/signup"
                variant="text"
                sx={{ textTransform: "none", px: 0 }}
              >
                Criar conta
              </Button>
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}
