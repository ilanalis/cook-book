'use client';

import { loginWithGithub, loginWithGoogle } from "@/lib/actions/auth";

export const SignInButton = () => {
    return (
        <>
            <button onClick={() => loginWithGithub()}>sign in with githab</button>
            <button onClick={() => loginWithGoogle()}>sign in with google</button>
        </>    
    )
}