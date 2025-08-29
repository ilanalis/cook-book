"use client";

import React, {
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material";
import { signIn } from "next-auth/react";
import { signupWithCredentials } from "@/lib/actions/auth";
import { SignupFormFields } from "@/lib/definitions";

interface SignUpFormProps {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

type FieldErrorsFromSchema = {
  [K in keyof SignupFormFields]?: { errors: string[] };
};

const SignUpForm: React.FC<SignUpFormProps> = ({ isLoading, setIsLoading }) => {
  const [state, action, isPending] = useActionState(
    signupWithCredentials,
    undefined
  );
  const [validationError, setValidationError] =
    useState<FieldErrorsFromSchema | null>(null);

  useEffect(() => {
    setIsLoading(isPending);
  }, [isPending, setIsLoading]);

  useEffect(() => {
    setValidationError(state?.validationErrors?.properties ?? null);
  }, [state]);

  useEffect(() => {
    if (state?.success) {
      signIn("credentials", {
        email: state.email,
        password: state.password,
        redirect: true,
      });
    }
  }, [state]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      action(formData);
    });
  };

  return (
    <Stack
      component="form"
      sx={{
        width: "100%",
        "& .MuiTextField-root": { width: "100%", mb: 2 },
        "& .MuiInputBase-input": { color: "#fff" },
        "& input::placeholder": { color: "rgba(255,255,255,0.7)" },
        "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.85)" },
        "& .MuiInputLabel-root.Mui-focused": { color: "#fff" },
        "& .MuiOutlinedInput-root > fieldset": {
          borderColor: "rgba(255,255,255,0.4)",
        },
        "& .MuiOutlinedInput-root:hover > fieldset": {
          borderColor: "#fff",
        },
        "& .MuiOutlinedInput-root.Mui-focused > fieldset": {
          borderColor: "#fff",
        },
        "& .MuiFormHelperText-root": { color: "#ffe0e0" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        type="text"
        name="name"
        label="Name"
        error={!!validationError?.name}
        helperText={validationError?.name?.errors[0]}
      />
      <TextField
        type="text"
        name="surname"
        label="Surname"
        error={!!validationError?.surname}
        helperText={validationError?.surname?.errors[0]}
      />
      <TextField
        type="text"
        name="username"
        label="Username"
        error={!!validationError?.username}
        helperText={validationError?.username?.errors[0]}
      />
      <TextField
        type="email"
        name="email"
        label="Email"
        error={!!validationError?.email}
        helperText={
          validationError?.email?.errors[0] ?? "e.g., example@mail.com"
        }
      />
      <TextField
        type="password"
        name="password"
        label="Password"
        autoComplete="new-password"
        error={!!validationError?.password}
        helperText={validationError?.password?.errors[0]}
      />
      <TextField
        type="password"
        name="confirmPassword"
        label="Confirm Pasword"
        autoComplete="new-password"
        error={!!validationError?.confirmPassword}
        helperText={validationError?.confirmPassword?.errors[0]}
      />
      {state?.systemErrors && (
        <Alert severity="error">{state.systemErrors.join(", ")}</Alert>
      )}
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2 }}
        disabled={isPending || isLoading}
      >
        {isPending ? (
          <CircularProgress size={24} sx={{ color: "white" }} />
        ) : (
          "Sign up"
        )}
      </Button>
    </Stack>
  );
};

export default SignUpForm;
