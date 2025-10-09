import { TextField, MenuItem } from "@mui/material";
import { Controller, Control, FieldPath, FieldValues } from "react-hook-form";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface FormSelectProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  options: Option[];
  required?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
}

export default function FormSelect<T extends FieldValues>({
  name,
  control,
  label,
  options,
  required = false,
  fullWidth = true,
  placeholder,
}: FormSelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          fullWidth={fullWidth}
          required={required}
          label={label}
          error={!!error}
          helperText={error?.message}
          placeholder={placeholder}
        >
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
}
