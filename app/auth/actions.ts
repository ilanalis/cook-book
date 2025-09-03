"use server";
import bcrypt from "bcrypt";
import { signIn, signOut } from "../../auth";
import { SignupFormFields, signupSchema } from "../lib/definitions/users";
import { prisma } from "../lib/prisma";
import z from "zod";

export const loginWithGithub = async () => {
  await signIn("github", { redirectTo: "/" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};

export const loginWithGoogle = async () => {
  await signIn("google", { redirectTo: "/" });
};

type FieldErrors<T> = {
  [K in keyof T]?: { errors: string[] };
};

export interface SignupState {
  validationErrors?: {
    errors: string[];
    properties?: FieldErrors<SignupFormFields>;
  };
  systemErrors?: string[];
  success?: boolean;
  email?: string;
  password?: string;
}

export const signupWithCredentials = async (
  _state: SignupState | undefined,
  formData: FormData
): Promise<SignupState> => {
  const validationResult = signupSchema.safeParse({
    name: formData.get("name"),
    surname: formData.get("surname"),
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validationResult.success) {
    const errors = z.treeifyError(validationResult.error);
    return { validationErrors: errors };
  }

  const { name, surname, username, email, password } = validationResult.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.profile.create({
      data: { name, surname, username, email, password: hashedPassword },
    });

    return { success: true, email, password };
  } catch (err) {
    return { systemErrors: ["User already exists or DB error"] };
  }
};
