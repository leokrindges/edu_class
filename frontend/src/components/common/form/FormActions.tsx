import { Box, Button, Grid } from "@mui/material";
import { Cancel, Save } from "@mui/icons-material";
import { ReactNode } from "react";
import LoadingButton from "../buttons/LoadingButton";

interface FormActionsProps {
  onCancel: () => void;
  loading?: boolean;
  disabled?: boolean;
  submitText?: string;
  cancelText?: string;
  submitIcon?: ReactNode;
  cancelIcon?: ReactNode;
  showCancel?: boolean;
  submitVariant?: "contained" | "outlined" | "text";
  cancelVariant?: "contained" | "outlined" | "text";
  submitColor?:
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  cancelColor?:
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  fullWidth?: boolean;
  orientation?: "horizontal" | "vertical";
  justifyContent?: "flex-start" | "center" | "flex-end" | "space-between";
}

export default function FormActions({
  onCancel,
  loading = false,
  disabled = false,
  submitText = "Salvar",
  cancelText = "Cancelar",
  submitIcon = <Save />,
  cancelIcon = <Cancel />,
  showCancel = true,
  submitVariant = "contained",
  cancelVariant = "outlined",
  submitColor = "primary",
  cancelColor = "secondary",
  fullWidth = false,
  orientation = "horizontal",
  justifyContent = "flex-end",
}: FormActionsProps) {
  const isSubmitDisabled = disabled || loading;
  const isCancelDisabled = loading;

  if (fullWidth) {
    return (
      <Grid size={12}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: { xs: "stretch", sm: justifyContent },
            flexDirection: {
              xs: "column",
              sm: orientation === "vertical" ? "column" : "row",
            },
            mt: 3,
          }}
        >
          {showCancel && (
            <Button
              variant={cancelVariant}
              color={cancelColor}
              startIcon={cancelIcon}
              onClick={onCancel}
              disabled={isCancelDisabled}
              sx={{ order: { xs: 2, sm: 1 } }}
            >
              {cancelText}
            </Button>
          )}

          <LoadingButton
            type="submit"
            variant={submitVariant}
            color={submitColor}
            startIcon={submitIcon}
            loading={loading}
            loadingText="Salvando..."
            disabled={isSubmitDisabled}
            sx={{ order: { xs: 1, sm: 2 } }}
          >
            {submitText}
          </LoadingButton>
        </Box>
      </Grid>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        justifyContent,
        flexDirection: orientation === "vertical" ? "column" : "row",
        mt: 3,
      }}
    >
      {showCancel && (
        <Button
          variant={cancelVariant}
          color={cancelColor}
          startIcon={cancelIcon}
          onClick={onCancel}
          disabled={isCancelDisabled}
        >
          {cancelText}
        </Button>
      )}

      <LoadingButton
        type="submit"
        variant={submitVariant}
        color={submitColor}
        startIcon={submitIcon}
        loading={loading}
        loadingText="Salvando..."
        disabled={isSubmitDisabled}
      >
        {submitText}
      </LoadingButton>
    </Box>
  );
}
