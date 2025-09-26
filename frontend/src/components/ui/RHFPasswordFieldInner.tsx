// components/form/RHFPasswordField.tsx
"use client";
import { useState, forwardRef } from "react";
import { Controller, Control, FieldPath, FieldValues } from "react-hook-form";
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export type RHFPasswordFieldProps<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  autoComplete?: string; // ex.: "new-password" | "current-password"
  textFieldProps?: Omit<TextFieldProps, "name" | "type" | "label">;
};

function RHFPasswordFieldInner<TFieldValues extends FieldValues>(
  {
    name,
    control,
    label = "Senha",
    autoComplete = "new-password",
    textFieldProps,
  }: RHFPasswordFieldProps<TFieldValues>,
  _ref: React.Ref<HTMLInputElement>
) {
  const [show, setShow] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          inputRef={_ref}
          type={show ? "text" : "password"}
          label={label}
          autoComplete={autoComplete}
          fullWidth
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={show ? "Ocultar senha" : "Mostrar senha"}
                  onClick={() => setShow((v) => !v)}
                  edge="end"
                >
                  {show ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...textFieldProps}
        />
      )}
    />
  );
}

const RHFPasswordField = forwardRef(RHFPasswordFieldInner) as <
  TFieldValues extends FieldValues
>(
  p: RHFPasswordFieldProps<TFieldValues> & { ref?: React.Ref<HTMLInputElement> }
) => ReturnType<typeof RHFPasswordFieldInner>;

export default RHFPasswordField;
