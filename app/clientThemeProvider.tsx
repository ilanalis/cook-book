"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import amberTheme from "./theme";
import ClientSessionWrapper from "./clientSessionWrapper";

export default function ClientThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={amberTheme}>
      <CssBaseline />
      <ClientSessionWrapper>{children}</ClientSessionWrapper>
    </ThemeProvider>
  );
}
