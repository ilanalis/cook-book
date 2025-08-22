'use server';
import { signIn, signOut } from "../../../auth"

export const loginWithGithub = async () =>{
    await signIn("github", {redirectTo: "/"})
}

export const logout = async () => {
    await signOut({redirectTo: "/"})
}

export const loginWithGoogle = async () =>{
    await signIn("google", {redirectTo: "/"})
}