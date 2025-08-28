import { SignOutButton } from "@/components/sign-out-button";
import { auth } from "../../../auth";
import Image from "next/image";

export default async function Profile() {
  const session = await auth();
  return (
    <>
      <div>User signed in with name {session?.user?.name}</div>
      {session?.user?.image && (
        <Image src={session.user.image} width={48} height={48} alt="avatar" />
      )}
      <SignOutButton />
    </>
  );
}
