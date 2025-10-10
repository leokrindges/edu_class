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
import {
  formatPhone,
  isoDateToInputDate,
} from "@/utils/formatters";
import FormContainer from "@/components/common/form/FormContainer";
import FormSection from "@/components/common/form/FormSection";
import FormField from "@/components/common/form/FormField";
import FormSelect from "@/components/common/form/FormSelect";
import AvatarUpload from "@/components/common/AvatarUpload";
import FormActions from "@/components/common/form/FormActions";
import { StudentStatus } from "@/interfaces/student/student.interface";
import { studentStatusOptions } from "@/utils/student-status.util";

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

  const toFormValues = (d?: Partial<StudentFormData>): StudentFormData => ({
    name: d?.name ?? "",
    email: d?.email ?? "",
    phone: d?.phone ? formatPhone(d.phone) : "",
    birthDate: d?.birthDate ? isoDateToInputDate(d.birthDate) : "",
    address: d?.address ?? "",
    status: d?.status ?? StudentStatus.ACTIVE,
    notes: d?.notes ?? "",
  });

  const {
    control,
    handleSubmit,
    reset,
    trigger,
    formState: { isValid, isDirty },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: toFormValues(initialData),
    mode: "onChange",
  });

  useEffect(() => {
    if (initialData) {
      const values = toFormValues(initialData);
      reset(values, { keepDirty: false, keepTouched: false });
      Promise.resolve().then(() => trigger());
    }
  }, [initialData, reset, trigger]);

  const onSubmitForm = async (data: StudentFormData) => {
    const submitData = {
      ...data,
      phone: data.phone ? data.phone.replace(/\D/g, "") : undefined,
      birthDate: data.birthDate,
      notes: data.notes?.trim() ? data.notes : undefined,
      address: data.address?.trim() ? data.address : undefined,
    };
    await onSubmit(submitData, avatar);
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
                type="tel"
                inputMode="numeric"
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
                options={studentStatusOptions}
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
              disabled={!isDirty || !isValid}
              submitText={submitButtonText}
              fullWidth={true}
            />
          </Grid>
        </Grid>
      </form>
    </FormContainer>
  );
}
