import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const signupSchema = z
  .object({
    name: z
      .string({
        error: (issue) =>
          issue.input === undefined ? "Required" : "Not a string",
      })
      .min(2, { message: "Name must be at least 2 characters" }),
    surname: z
      .string({
        error: (issue) =>
          issue.input === undefined ? "Required" : "Not a string",
      })
      .min(2, { message: "Surname must be at least 2 characters" }),
    username: z
      .string({
        error: (issue) =>
          issue.input === undefined ? "Required" : "Not a string",
      })
      .min(5, { message: "Username must be at least 5 characters" }),
    email: z
      .email({ message: "Invalid email format" })
      .nonempty({ message: "Email is required" }),
    password: z
      .string({
        error: (issue) =>
          issue.input === undefined ? "Required" : "Not a string",
      })
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string({
      error: (issue) =>
        issue.input === undefined ? "Required" : "Not a string",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
