import type { Metadata } from "next";

import { notFound } from "next/navigation";
import Profile from "@/components/profilePage/profile";
import { Link } from "lucide-react";
import { getCurrentAuthUser } from "@/server/services/getCurrentAuthUser";

export const metadata: Metadata = {
  title: "Dashboard - Sendcv",
};

const ProfileApp = async () => {
  const user = await getCurrentAuthUser();
  if (!user) {
    return notFound();
  }
  return (
    <>
      <div className="sticky top-0 flex w-full items-center justify-center border-b border-neutral-300 py-4 text-dark dark:text-neutral-400 dark:border-neutral-800">
        <div className="flex items-center space-x-2">
          <Link width={14} height={14} />
          <span className="font-medium">sendcv.vercel.app/{user.username}</span>
        </div>
      </div>
      <Profile
        edit={true}
        user={user}
        experience={user.experiences}
        projects={user.Projects}
      />
    </>
  );
};

export default ProfileApp;
