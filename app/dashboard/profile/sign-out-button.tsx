"use client";

import { logout } from "@/auth/actions";

export const SignOutButton = () => {
  return <button onClick={() => logout()}>sign out </button>;
};
