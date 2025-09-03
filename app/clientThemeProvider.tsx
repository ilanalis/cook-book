"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import myTheme from "./theme";
import ClientSessionWrapper from "./clientSessionWrapper";

export default function ClientThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={myTheme}>
      <CssBaseline />
      <ClientSessionWrapper>{children}</ClientSessionWrapper>
    </ThemeProvider>
  );
}
