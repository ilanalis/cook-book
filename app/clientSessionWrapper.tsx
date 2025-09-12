"use client";

import { SessionProvider } from "next-auth/react";
import Header from "./components/header";

export default function ClientSessionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Header />
      {children}
    </SessionProvider>
  );
}
