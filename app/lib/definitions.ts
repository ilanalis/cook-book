import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const signupSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    surname: z
      .string()
      .min(2, { message: "Surname must be at least 2 characters" }),
    username: z
      .string()
      .min(5, { message: "Username must be at least 5 characters" }),
    email: z
      .email({ message: "Invalid email format" })
      .nonempty({ message: "Email is required" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupFormFields = z.infer<typeof signupSchema>;
