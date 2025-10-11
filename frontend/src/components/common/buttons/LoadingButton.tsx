import { Button, ButtonProps, CircularProgress } from "@mui/material";
import { ReactNode } from "react";

interface LoadingButtonProps extends Omit<ButtonProps, "children"> {
  loading?: boolean;
  loadingText?: string;
  children: ReactNode;
  startIcon?: ReactNode;
}

export default function LoadingButton({
  loading = false,
  loadingText,
  children,
  startIcon,
  disabled,
  ...props
}: LoadingButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Button
      {...props}
      disabled={isDisabled}
      startIcon={
        loading ? <CircularProgress size={20} color="inherit" /> : startIcon
      }
    >
      {loading && loadingText ? loadingText : children}
    </Button>
  );
}
