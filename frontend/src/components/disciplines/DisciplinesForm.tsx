"use client";
import {
  DisciplineFormData,
  disciplinesSchema,
} from "@/schema/disciplines/disciplines.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormContainer from "../common/form/FormContainer";
import { Grid } from "@mui/material";
import FormSection from "../common/form/FormSection";
import FormField from "../common/form/FormField";
import FormActions from "../common/form/FormActions";
import { AttachMoney, Description, Subject, Timer } from "@mui/icons-material";

interface DisciplineFormProps {
  title: string;
  subtitle: string;
  initialData?: Partial<DisciplineFormData>;
  onSubmit: (data: DisciplineFormData) => Promise<void>;
  onCancel: () => void;
  submitButtonText?: string;
  loading?: boolean;
  error?: string;
}

export default function DisciplinesForm({
  title,
  subtitle,
  initialData,
  onSubmit,
  onCancel,
  submitButtonText = "Salvar Disciplina",
  loading,
  error,
}: DisciplineFormProps) {
  const toFormValues = (
    d?: Partial<DisciplineFormData>
  ): DisciplineFormData => ({
    name: d?.name ?? "",
    description: d?.description ?? undefined,
    pricePerClass: d?.pricePerClass ?? undefined,
    durationMin: d?.durationMin ?? undefined,
  });

  const {
    control,
    handleSubmit,
    reset,
    trigger,
    formState: { isValid, isDirty },
  } = useForm<DisciplineFormData>({
    resolver: zodResolver(disciplinesSchema),
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

  const onSubmitForm = async (data: DisciplineFormData) => {
    await onSubmit(data);
  };

  return (
    <FormContainer title={title} subtitle={subtitle} error={error}>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <Grid container spacing={3} size={12}>
          <FormSection
            title="Informações da Disciplina"
            icon={<Subject sx={{ mr: 1 }} />}
            size={12}
          >
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormField
                name="name"
                control={control}
                label="Nome Completo"
                required
                fullWidth
                startIcon={<Subject sx={{ color: "action.active", mr: 1 }} />}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormField
                name="description"
                control={control}
                label="Descrição"
                required
                fullWidth
                multiline
                minRows={1}
                startIcon={
                  <Description sx={{ color: "action.active", mr: 1 }} />
                }
              />
            </Grid>
          </FormSection>
          <FormSection
            title="Valores e Duração"
            icon={<AttachMoney sx={{ mr: 1 }} />}
            size={12}
          >
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormField
                name="pricePerClass"
                control={control}
                label="Preço por Aula"
                type="number"
                fullWidth
                startIcon={
                  <AttachMoney sx={{ color: "action.active", mr: 1 }} />
                }
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormField
                name="durationMin"
                control={control}
                label="Duração (minutos)"
                type="number"
                fullWidth
                startIcon={<Timer sx={{ color: "action.active", mr: 1 }} />}
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
