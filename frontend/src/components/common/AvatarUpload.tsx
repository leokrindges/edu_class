import { Avatar, IconButton, Box, CircularProgress } from "@mui/material";
import { PhotoCamera, Person, Delete } from "@mui/icons-material";
import { useState } from "react";

interface AvatarUploadProps {
  avatar: string | null;
  onAvatarChange: (avatar: string | null) => void;
  size?: { xs: number; sm: number };
  disabled?: boolean;
  showDeleteButton?: boolean;
  maxSizeInMB?: number;
  allowedTypes?: string[];
}

export default function AvatarUpload({
  avatar,
  onAvatarChange,
  size = { xs: 80, sm: 100 },
  disabled = false,
  showDeleteButton = false,
  maxSizeInMB = 5,
  allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"],
}: AvatarUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validações
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      alert(`Arquivo deve ter no máximo ${maxSizeInMB}MB`);
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      alert("Formato de imagem não suportado");
      return;
    }

    setIsUploading(true);

    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        onAvatarChange(reader.result as string);
        setIsUploading(false);
      };
      reader.onerror = () => {
        alert("Erro ao carregar a imagem");
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch {
      alert("Erro ao processar a imagem");
      setIsUploading(false);
    }
  };

  const handleClearAvatar = () => {
    onAvatarChange(null);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
      <Box sx={{ position: "relative" }}>
        <Avatar
          src={avatar || undefined}
          sx={{
            width: { xs: size.xs, sm: size.sm },
            height: { xs: size.xs, sm: size.sm },
            bgcolor: "primary.main",
          }}
        >
          <Person sx={{ fontSize: { xs: size.xs / 2, sm: size.sm / 2 } }} />
        </Avatar>

        {/* Botão de Upload */}
        <IconButton
          color="primary"
          component="label"
          disabled={disabled || isUploading}
          sx={{
            position: "absolute",
            bottom: -8,
            right: showDeleteButton && avatar ? 8 : -8,
            bgcolor: "background.paper",
            boxShadow: 2,
            "&:hover": { bgcolor: "grey.100" },
          }}
        >
          {isUploading ? <CircularProgress size={20} /> : <PhotoCamera />}
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={handleFileChange}
          />
        </IconButton>

        {/* Botão de Deletar */}
        {showDeleteButton && avatar && (
          <IconButton
            color="error"
            size="small"
            onClick={handleClearAvatar}
            disabled={disabled || isUploading}
            sx={{
              position: "absolute",
              bottom: -8,
              right: -8,
              bgcolor: "background.paper",
              boxShadow: 2,
              "&:hover": { bgcolor: "grey.100" },
            }}
          >
            <Delete />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}
