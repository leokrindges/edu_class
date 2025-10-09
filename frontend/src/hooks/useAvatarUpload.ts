import { useState } from "react";

interface UseAvatarUploadOptions {
  maxSizeInMB?: number;
  allowedTypes?: string[];
  onError?: (message: string) => void;
}

export function useAvatarUpload({
  maxSizeInMB = 5,
  allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"],
  onError,
}: UseAvatarUploadOptions = {}) {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tamanho do arquivo
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      const message = `Arquivo deve ter no máximo ${maxSizeInMB}MB`;
      if (onError) {
        onError(message);
      } else {
        alert(message);
      }
      return;
    }

    // Validar tipo do arquivo
    if (!allowedTypes.includes(file.type)) {
      const message = "Formato de imagem não suportado";
      if (onError) {
        onError(message);
      } else {
        alert(message);
      }
      return;
    }

    setIsUploading(true);

    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
        setIsUploading(false);
      };
      reader.onerror = () => {
        const message = "Erro ao carregar a imagem";
        if (onError) {
          onError(message);
        } else {
          alert(message);
        }
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch {
      const message = "Erro ao processar a imagem";
      if (onError) {
        onError(message);
      } else {
        alert(message);
      }
      setIsUploading(false);
    }
  };

  const clearAvatar = () => {
    setAvatar(null);
  };

  return {
    avatar,
    isUploading,
    handleAvatarChange,
    clearAvatar,
    setAvatar,
  };
}
