"use client";
import { appTheme } from "@/lib/mui-theme";
import { ThemeProvider } from "@mui/material";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type ThemeMode = "light" | "dark";
const ThemeContext = createContext<{
  mode: ThemeMode;
  toggleMode: () => void;
}>({
  mode: "light",
  toggleMode: () => {},
});

export const useThemeMode = () => useContext(ThemeContext);

export function CustomThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<ThemeMode>("light");

  useEffect(() => {
    const storedMode = localStorage.getItem("themeMode") as ThemeMode | null;
    if (storedMode) setMode(storedMode);
  }, []);

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const toggleMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  const theme = useMemo(() => appTheme(mode), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}
