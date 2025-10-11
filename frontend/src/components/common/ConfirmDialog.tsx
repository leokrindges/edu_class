import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { Close, Warning, Delete, Info, Help } from "@mui/icons-material";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "danger" | "warning" | "info";
  loading?: boolean;
}

const variantConfig = {
  default: {
    icon: Help,
    confirmColor: "primary" as const,
    iconColor: "primary.main",
  },
  danger: {
    icon: Delete,
    confirmColor: "error" as const,
    iconColor: "error.main",
  },
  warning: {
    icon: Warning,
    confirmColor: "warning" as const,
    iconColor: "warning.main",
  },
  info: {
    icon: Info,
    confirmColor: "info" as const,
    iconColor: "info.main",
  },
};

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "Confirmar ação",
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "default",
  loading = false,
}: ConfirmDialogProps) {
  const config = variantConfig[variant];
  const IconComponent = config.icon;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{ color: "text.secondary" }}
          >
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
          <Box
            sx={{
              p: 1,
              borderRadius: 2,
              bgcolor: `${config.iconColor}15`,
              color: config.iconColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 40,
              height: 40,
            }}
          >
            <IconComponent />
          </Box>
          <Typography variant="body1" sx={{ flex: 1, pt: 0.5 }}>
            {message}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} variant="outlined" disabled={loading}>
          {cancelText}
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color={config.confirmColor}
          disabled={loading}
        >
          {loading ? "Processando..." : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
