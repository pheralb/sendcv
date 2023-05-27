import type { User, UserExperience } from "@prisma/client";
import { GithubIcon, LinkedinIcon, TwitterIcon, Verified } from "lucide-react";
import { cn } from "@/utils/cn";

import { ExternalLink } from "@/ui/link";
import Alert from "@/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/tooltip";

import EditMainProfile from "./editMainProfile";
import EditAboutMeProfile from "./editAboutMeProfile";
import CreateUpdateExperience from "./createUpdateExperience";
import { TimelineItem, TimelineProvider } from "../timeline";

interface ProfileProps {
  edit: boolean;
  user: User;
  experience: UserExperience[];
}

const iconClassName = cn(
  "text-neutral-400 hover:text-white duration-75 transition-colors"
);

const Profile = ({ user, edit, experience }: ProfileProps) => {
  const githubUrl = `https://github.com/${user.username}`;
  return (
    <div className="mx-auto max-w-2xl mb-12">
      <div className="flex flex-col space-y-5 pt-12">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.image!}
              alt={user.name!}
              className="h-20 w-20 rounded-full"
            />
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl font-medium">{user.name}</h2>
                {user.verified && (
                  <TooltipProvider delayDuration={0.2}>
                    <Tooltip>
                      <TooltipTrigger className="cursor-default">
                        <Verified
                          className="text-neutral-300"
                          width={16}
                          height={16}
                        />
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        sideOffset={10}
                        className="text-[12px]"
                        aria-label="Verified"
                      >
                        <p>Usuario verificado</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <div className="flex items-center space-x-2 text-neutral-400">
                <p>{user.username}</p>
                {user.website && (
                  <>
                    <span>-</span>
                    <ExternalLink href={user.website} externalIcon={true}>
                      {user.website.split("/")[2]?.split("www.")?.[1]}
                    </ExternalLink>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ExternalLink href={githubUrl}>
              <GithubIcon width={20} className={iconClassName} />
            </ExternalLink>
            {user.twitterUrl && (
              <ExternalLink href={user.twitterUrl}>
                <TwitterIcon width={20} className={iconClassName} />
              </ExternalLink>
            )}
            {user.linkedinUrl && (
              <ExternalLink href={user.linkedinUrl}>
                <LinkedinIcon width={20} className={iconClassName} />
              </ExternalLink>
            )}
            {edit && (
              <EditMainProfile
                name={user.name!}
                website={user.website!}
                linkedinUrl={user.linkedinUrl!}
                twitterUrl={user.twitterUrl!}
              />
            )}
          </div>
        </div>
        <div className="border-t-2 border-neutral-800 pt-5">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-xl font-medium">Sobre mi</h3>
            {edit && <EditAboutMeProfile description={user.description!} />}
          </div>
          <p className="text-neutral-400">
            {edit ? (
              user.description ? (
                user.description
              ) : (
                <Alert color="tip">
                  No tienes una descripción, puedes agregar una haciendo click
                  en el icono del lapiz.
                </Alert>
              )
            ) : user.description ? (
              user.description
            ) : (
              <Alert color="tip">Este usuario no tiene una descripción.</Alert>
            )}
          </p>
        </div>
        <div className="border-t-2 border-neutral-800 pt-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-medium">Proyectos</h3>
            {edit && <CreateUpdateExperience status="create" {...experience} />}
          </div>
        </div>
        <div className="border-t-2 border-neutral-800 pt-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-medium">Experiencia</h3>
            {edit && <CreateUpdateExperience status="create" {...experience} />}
          </div>
          <div className="text-neutral-400">
            {experience ? (
              <TimelineProvider>
                {experience
                  .sort((a, b) => {
                    if (a.startDate! > b.startDate!) return -1;
                    if (a.startDate! < b.startDate!) return 1;
                    return 0;
                  })
                  .map((exp) => (
                    <TimelineItem
                      key={exp.id}
                      id={exp.id}
                      title={exp.title}
                      company={exp.company}
                      description={exp.description}
                      startDate={exp.startDate}
                      endDate={exp.endDate}
                      url={exp.url ?? ""}
                      edit={edit}
                    />
                  ))}
              </TimelineProvider>
            ) : (
              <Alert color="tip">
                No tienes una descripción, puedes agregar una haciendo click en
                el icono del lapiz.
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
