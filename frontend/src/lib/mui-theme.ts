// lib/mui-theme.ts
import { createTheme } from "@mui/material/styles";

export const appTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      primary: { main: "#1976d2" },
      secondary: { main: "#9c27b0" },
    },
    shape: { borderRadius: 12 },
  });
