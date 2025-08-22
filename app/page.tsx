"use server"

import Image from "next/image";
import { auth } from "../auth";
import { SignInButton } from "./components/sign-in-button";
import { SignOutButton } from "./components/sign-out-button";
import Link from "next/link";

export  default async function Home() {
  const session = await auth();
  if(session?.user){
    return (
  <div>
      <Link href="dashboard/profile">profile</Link>
    </div>
    )
  
  }

  console.log(session)

  return (
    <>hello</>
  );
}
