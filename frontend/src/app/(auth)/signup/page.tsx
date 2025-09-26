"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
  FormHelperText,
} from "@mui/material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpDto } from "@/services/auth/dtos/signup.dto";
import { authService } from "@/services/auth/auth.service";
import RHFPasswordField from "@/components/ui/RHFPasswordFieldInner";
import { SignupForm, SignupSchema } from "@/schema/signup/signup.schema";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const route = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({
    resolver: zodResolver(SignupSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      type: undefined,
    },
  });

  const onSubmit = handleSubmit(async ({ name, email, password, type }) => {
    setSubmitError(null);

    const payload: SignUpDto = {
      name,
      email,
      password,
      type: type,
    };

    try {
      const ok = await authService.signUp(payload);
      if (ok) {
        route.replace("/dashboard");
        return;
      }
      setSubmitError(
        "Falha ao cadastrar. Verifique os dados e tente novamente."
      );
    } catch {
      setSubmitError("Erro de rede. Tente novamente.");
    }
  });

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: { xs: 3, sm: 4 } }}>
        <Typography variant="h5" mb={2} fontWeight={700}>
          Criar conta
        </Typography>

        <Box component="form" noValidate onSubmit={onSubmit}>
          <Stack spacing={2.5}>
            <TextField
              label="Nome"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
              {...register("name")}
            />

            <TextField
              label="E-mail"
              type="email"
              autoComplete="email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email")}
            />

            <div>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Você é:
              </Typography>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <>
                    <ToggleButtonGroup
                      exclusive
                      value={field.value ?? null}
                      onChange={(_e, val) => {
                        if (val) field.onChange(val);
                      }}
                      fullWidth
                      color="primary"
                      sx={{
                        "& .MuiToggleButton-root": {
                          py: 1.2,
                          textTransform: "none",
                        },
                      }}
                    >
                      <ToggleButton value="TEACHER">
                        <PersonRoundedIcon sx={{ mr: 1 }} />
                        Professor(a)
                      </ToggleButton>
                      <ToggleButton value="STUDENT">
                        <SchoolRoundedIcon sx={{ mr: 1 }} />
                        Aluno(a)
                      </ToggleButton>
                    </ToggleButtonGroup>
                    {errors.type?.message && (
                      <FormHelperText error sx={{ ml: 1, mt: 1 }}>
                        {errors.type.message}
                      </FormHelperText>
                    )}
                  </>
                )}
              />
            </div>

            <RHFPasswordField
              name="password"
              control={control}
              label="Senha"
              autoComplete="new-password"
            />

            <RHFPasswordField
              name="confirmPassword"
              control={control}
              label="Confirmar senha"
              autoComplete="new-password"
            />

            {submitError && <Alert severity="error">{submitError}</Alert>}

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Criando..." : "Criar conta"}
            </Button>

            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              Já tem conta?{" "}
              <Button
                component={Link}
                href="/login"
                variant="text"
                sx={{ textTransform: "none", px: 0 }}
              >
                Fazer login
              </Button>
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}
