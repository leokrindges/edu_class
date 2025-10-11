import { User } from "@/interfaces/user/user.interface";
import { ExitToApp } from "@mui/icons-material";
import { Avatar, Box, IconButton, Tooltip, Typography } from "@mui/material";

export function DrawerFooter({
  user,
  signOut,
}: {
  user: User | null;
  signOut: () => void;
}) {
  return (
    <Box
      sx={{
        mt: "auto",
        p: 1,
        borderTop: "1px solid #eee",
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Avatar src={""} alt={user?.name} sx={{ width: 28, height: 28 }} />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2" fontWeight={400}>
          {user?.name || "Professora"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {"Matéria"}
        </Typography>
      </Box>
      <Tooltip title="Sair">
        <IconButton size="small" onClick={signOut}>
          <ExitToApp fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
