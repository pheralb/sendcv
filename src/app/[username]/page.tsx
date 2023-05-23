import Profile from "@/components/profilePage/profile";
import { getSingleUser } from "@/server/services/getSingleUser";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    username: string;
  };
}

export default async function Page(props: PageProps) {
  const user = await getSingleUser(props.params.username);
  if (!user) {
    return notFound();
  }
  return <Profile user={user as any} edit={false} />;
}
