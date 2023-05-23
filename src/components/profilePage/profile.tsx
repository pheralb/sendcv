import type { iUser } from "@/types/user";
import { ExternalLink } from "@/ui/link";
import { GithubIcon } from "lucide-react";
import EditMainProfile from "./editMainProfile";

interface ProfileProps {
  edit: boolean;
  user: iUser;
}

const Profile = ({ user, edit }: ProfileProps) => {
  const githubUrl = `https://github.com/${user.username}`;
  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex flex-col space-y-5 pt-12">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.image}
              alt={user.name}
              className="h-20 w-20 rounded-full"
            />
            <div className="flex flex-col">
              <h2 className="text-2xl font-medium">{user.name}</h2>
              <p className="text-neutral-400">{user.username}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <ExternalLink href={githubUrl}>
              <GithubIcon width={20} />
            </ExternalLink>
            {edit && (
              <EditMainProfile
                name={user.name}
                website={user.website}
              />
            )}
          </div>
        </div>
        <div className="border-t-2 border-neutral-800 pt-5">
          <h3 className="text-xl font-medium">Sobre mi</h3>
          <p className="text-neutral-400">{user.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
