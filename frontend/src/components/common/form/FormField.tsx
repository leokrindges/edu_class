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
  type,
  ...textFieldProps
}: FormFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        let displayValue = "";
        const raw = field.value;

        if (raw === null || raw === undefined) displayValue = "";
        else if (
          type === "date" &&
          typeof raw === "string" &&
          raw.includes("T")
        )
          displayValue = raw.split("T")[0];
        else displayValue = String(raw);

        if (type !== "date" && formatter && displayValue) {
          displayValue = formatter(displayValue);
        }

        return (
          <TextField
            {...textFieldProps}
            name={field.name}
            value={displayValue}
            label={label}
            type={type}
            error={!!error}
            helperText={error?.message}
            onBlur={field.onBlur}
            onChange={(e) => {
              let value = e.target.value;

              if (formatter && value) {
                value = formatter(value);
              }

              field.onChange(value);
            }}
            InputProps={{
              startAdornment: startIcon,
              endAdornment: endIcon,
              ...textFieldProps.InputProps,
            }}
          />
        );
      }}
    />
  );
}
