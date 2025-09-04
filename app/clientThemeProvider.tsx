"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import myTheme from "./theme";
import ClientSessionWrapper from "./clientSessionWrapper";
import { SnackbarProvider } from "notistack";

export default function ClientThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={myTheme}>
      <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <CssBaseline />
        <ClientSessionWrapper>{children}</ClientSessionWrapper>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
