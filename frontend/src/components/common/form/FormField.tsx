import { TextField, TextFieldProps } from "@mui/material";
import { Controller, Control, FieldPath, FieldValues } from "react-hook-form";
import { ReactNode } from "react";

interface FormFieldProps<T extends FieldValues>
  extends Omit<TextFieldProps, "name" | "error" | "helperText"> {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  formatter?: (value: string) => string;
  rules?: object;
}

export default function FormField<T extends FieldValues>({
  name,
  control,
  label,
  startIcon,
  endIcon,
  formatter,
  rules,
  ...textFieldProps
}: FormFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...textFieldProps}
          label={label}
          error={!!error}
          helperText={error?.message}
          onChange={(e) => {
            const value = formatter
              ? formatter(e.target.value)
              : e.target.value;
            field.onChange(value);
          }}
          InputProps={{
            startAdornment: startIcon,
            endAdornment: endIcon,
            ...textFieldProps.InputProps,
          }}
        />
      )}
    />
  );
}
