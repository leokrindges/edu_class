"use client";

import { Grid } from "@mui/material";
import { Person, Email, Phone, Home, CalendarToday } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  StudentFormData,
  studentSchema,
} from "@/schema/student/student.schema";
import { formatPhone } from "@/utils/formatters";
import FormContainer from "@/components/common/form/FormContainer";
import FormSection from "@/components/common/form/FormSection";
import FormField from "@/components/common/form/FormField";
import FormSelect from "@/components/common/form/FormSelect";
import AvatarUpload from "@/components/common/AvatarUpload";
import FormActions from "@/components/common/form/FormActions";
import { StudentStatus } from "@/interfaces/student/student.interface";

// Atualizar statusOptions para usar os valores do enum
const statusOptions = [
  { value: StudentStatus.ACTIVE, label: "Ativo" },
  { value: StudentStatus.INACTIVE, label: "Inativo" },
];

interface StudentFormProps {
  title: string;
  subtitle: string;
  initialData?: Partial<StudentFormData>;
  onSubmit: (data: StudentFormData, avatar: string | null) => Promise<void>;
  onCancel: () => void;
  submitButtonText?: string;
  loading?: boolean;
  error?: string;
}

export default function StudentForm({
  title,
  subtitle,
  initialData,
  onSubmit,
  onCancel,
  submitButtonText = "Salvar Estudante",
  loading = false,
  error = "",
}: StudentFormProps) {
  const [avatar, setAvatar] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      birthDate: undefined,
      address: "",
      status: StudentStatus.ACTIVE,
      notes: undefined,
      ...initialData,
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: "",
        email: "",
        phone: "",
        birthDate: undefined,
        address: "",
        status: StudentStatus.ACTIVE,
        notes: undefined,
        ...initialData,
      });
    }
  }, [initialData, reset]);

  const onSubmitForm = async (data: StudentFormData) => {
    await onSubmit(data, avatar);
  };

  return (
    <FormContainer title={title} subtitle={subtitle} error={error}>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <AvatarUpload avatar={avatar} onAvatarChange={setAvatar} />

        <Grid container spacing={3}>
          <FormSection
            title="Informações Pessoais"
            icon={<Person sx={{ mr: 1 }} />}
          >
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormField
                name="name"
                control={control}
                label="Nome Completo"
                required
                fullWidth
                startIcon={<Person sx={{ color: "action.active", mr: 1 }} />}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormField
                name="email"
                control={control}
                label="Email"
                type="email"
                required
                fullWidth
                startIcon={<Email sx={{ color: "action.active", mr: 1 }} />}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormField
                name="phone"
                control={control}
                label="Telefone"
                fullWidth
                placeholder="(11) 99999-9999"
                formatter={formatPhone}
                startIcon={<Phone sx={{ color: "action.active", mr: 1 }} />}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormField
                name="birthDate"
                control={control}
                label="Data de Nascimento"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                startIcon={
                  <CalendarToday sx={{ color: "action.active", mr: 1 }} />
                }
              />
            </Grid>

            <Grid size={12}>
              <FormField
                name="address"
                control={control}
                label="Endereço"
                fullWidth
                multiline
                rows={2}
                startIcon={<Home sx={{ color: "action.active", mr: 1 }} />}
              />
            </Grid>
          </FormSection>

          <FormSection title="Status e Observações">
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormSelect
                name="status"
                control={control}
                label="Status"
                options={statusOptions}
                required
              />
            </Grid>

            <Grid size={12}>
              <FormField
                name="notes"
                control={control}
                label="Observações"
                fullWidth
                multiline
                rows={3}
                placeholder="Observações adicionais sobre o estudante..."
              />
            </Grid>
          </FormSection>

          <Grid size={12}>
            <FormActions
              onCancel={onCancel}
              loading={loading}
              disabled={!isValid}
              submitText={submitButtonText}
              fullWidth={true}
            />
          </Grid>
        </Grid>
      </form>
    </FormContainer>
  );
}
