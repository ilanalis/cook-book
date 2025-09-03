"use client";

import { Button, FormHelperText, Stack, TextField } from "@mui/material";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

const errorMessages: Record<string, string> = {
  CredentialsSignin: "Invalid email or password",
  Configuration: "Authentication configuration error",
  default: "Unknown error occurred",
};

interface LoginFormProps {
  setIsLoading: (value: boolean) => void;
  isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ setIsLoading, isLoading }) => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [errorText, setErrorText] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await signIn("credentials", {
      email: emailValue,
      password: passwordValue,
      redirect: false,
    });
    if (res?.error) {
      const readable = errorMessages[res.error] || errorMessages.default;
      setErrorText(readable);
    }

    setIsLoading(false);
  };

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        type="email"
        name="email"
        helperText="e.g., example@mail.com"
        label="Email"
        value={emailValue}
        onChange={handleEmailChange}
        error={!!errorText}
        variant="standard"
      />
      <TextField
        type="password"
        name="password"
        label="Password"
        value={passwordValue}
        onChange={handlePasswordChange}
        error={!!errorText}
        autoComplete="current-password"
        variant="standard"
      />
      {errorText && <FormHelperText error>{errorText}</FormHelperText>}
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2 }}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Log in"}
      </Button>
    </Stack>
  );
};

export default LoginForm;
