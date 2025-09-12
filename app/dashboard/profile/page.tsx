import { SignOutButton } from "@/dashboard/profile/sign-out-button";
import Image from "next/image";
import { auth } from "../../../auth";

export default async function Profile() {
  const session = await auth();
  return (
    <div style={{ marginTop: "100px" }}>
      {session?.user?.image && (
        <Image src={session.user.image} width={48} height={48} alt="avatar" />
      )}
      <SignOutButton />
    </div>
  );
}
