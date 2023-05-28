import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Profile from "@/components/profilePage/profile";
import { env } from "@/env.mjs";
import { getSingleUser } from "@/server/services/getSingleUser";
import { absoluteUrl } from "@/utils/absoluteUrl";

interface PageProps {
  params: {
    username: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const user = await getSingleUser(params.username);

  if (!user) {
    return {};
  }

  const url = env.NEXT_PUBLIC_APP_URL;

  const ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set("heading", user.name || "");

  return {
    title: `${user.name!} | Sendcv`,
    description: user.description,
    openGraph: {
      title: `${user.name!} | Sendcv`,
      description: user.description!,
      type: "article",
      url: absoluteUrl(`/dashboard/${user.username}`),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: user.name!,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: user.name!,
      description: user.description!,
      images: [ogUrl.toString()],
    },
  };
}

export default async function Page(props: PageProps) {
  const user = await getSingleUser(props.params.username);
  if (!user) {
    return notFound();
  }
  return (
    <div className="mt-3 animate-in fade-in-100">
      <Profile
        user={user}
        experience={user.experiences}
        projects={user.Projects}
        edit={false}
      />
    </div>
  );
}
