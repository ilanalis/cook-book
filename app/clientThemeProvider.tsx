"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import amberTheme from "./theme";

export default function ClientThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={amberTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
