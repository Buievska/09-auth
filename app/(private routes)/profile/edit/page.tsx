import { getCurrentUserServer } from "@/lib/api/serverApi";
import { redirect } from "next/navigation";
import EditProfileForm from "./EditProfileForm.client";
import css from "./page.module.css";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function EditProfilePage() {
  const user = await getCurrentUserServer();
  if (!user) redirect("/sign-in");

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <Image
          src="/avatar.png"
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
          priority
        />
        <EditProfileForm user={user} />
      </div>
    </main>
  );
}
