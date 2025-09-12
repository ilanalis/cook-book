"use client";

import { loginWithGithub, loginWithGoogle } from "@/auth/actions";
import { Button, Stack } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import React from "react";

interface OAuthButtonsProps {
  isLoading: boolean;
}

export const OAthButtons: React.FC<OAuthButtonsProps> = ({ isLoading }) => {
  return (
    <Stack sx={{ mt: 2 }}>
      <Button
        onClick={() => loginWithGoogle()}
        variant="outlined"
        startIcon={<GoogleIcon />}
        disabled={isLoading}
      >
        sign in with google
      </Button>

      <Button
        sx={{ mt: 1 }}
        onClick={() => loginWithGithub()}
        variant="contained"
        startIcon={<GitHubIcon />}
        disabled={isLoading}
      >
        Sign in with github
      </Button>
    </Stack>
  );
};

export default OAthButtons;
