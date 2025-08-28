"use server";
import bcrypt from "bcrypt";
import { signIn, signOut } from "../../../auth";
import { signupSchema } from "../definitions";
import { prisma } from "../prisma";
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

export const signupWithCredentials = async (
  _state: any,
  formData: FormData
) => {
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
    return { errors };
  }

  const { name, surname, username, email, password } = validationResult.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const profile = await prisma.profile.create({
    data: {
      name,
      surname,
      username,
      email,
      password: hashedPassword,
    },
  });

  if (!profile) {
    return { errors: { email: ["User already exists or DB error"] } };
  }
  return { success: true, email, password };
};
