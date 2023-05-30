import type { User, UserExperience, Projects } from "@prisma/client";
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
import { TimelineItem, TimelineProvider } from "../timeline";

import EditMainProfile from "./editMainProfile";
import EditAboutMeProfile from "./editAboutMeProfile";
import CreateUpdateExperience from "./createUpdateExperience";
import CreateUpdateProject from "./createUpdateProject";

interface ProfileProps {
  edit: boolean;
  user: User;
  experience: UserExperience[];
  projects: Projects[];
}

const iconClassName = cn(
  "dark:text-neutral-400 dark:hover:text-white hover:text-neutral-700 duration-75 transition-colors"
);

const animateInClassName = cn("animate-in slide-in-from-bottom-50");

const Profile = ({ user, edit, experience, projects }: ProfileProps) => {
  const githubUrl = `https://github.com/${user.username}`;
  return (
    <div className="mx-auto mb-12 max-w-2xl animate-in fade-in-100">
      <div className="flex flex-col space-y-5 pt-12">
        <div
          className={cn(
            "flex w-full items-center justify-between",
            animateInClassName
          )}
        >
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
                          className="text-blue-500"
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
              <div className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400">
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
        <div className="border-t-2 border-neutral-300 pt-5 dark:border-neutral-800">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-xl font-medium">Sobre mi</h3>
            {edit && <EditAboutMeProfile description={user.description!} />}
          </div>
          <p className="dark:text-neutral-400">
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
        <div className="border-t-2 border-neutral-300 pt-5 dark:border-neutral-800">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-medium">Proyectos</h3>
            {edit && <CreateUpdateProject status="create" {...experience} />}
          </div>
          {projects && projects.length > 0 ? (
            <div className="mb-2 grid grid-cols-1 gap-2">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex flex-col space-y-1 rounded-md border border-neutral-300 p-4 dark:border-neutral-800"
                >
                  <div className="flex w-full items-center justify-between">
                    <ExternalLink href={project.url!} externalIcon={true}>
                      <span className="text-md font-medium dark:text-neutral-300">
                        {project.title}
                      </span>
                    </ExternalLink>
                    <div className="flex items-center space-x-2">
                      <ExternalLink href={project.repository!}>
                        <GithubIcon width={18} className={iconClassName} />
                      </ExternalLink>
                      {edit && (
                        <CreateUpdateProject
                          status="edit"
                          id={project.id}
                          title={project.title}
                          description={project.description}
                          url={project.url}
                          repository={project.repository}
                        />
                      )}
                    </div>
                  </div>
                  <p className="truncate text-neutral-500 dark:text-neutral-400">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <Alert color="tip">
              No tienes proyectos, puedes agregar uno haciendo click en el icono
              del lapiz.
            </Alert>
          )}
        </div>
        <div className="border-t-2 border-neutral-300 pt-5 dark:border-neutral-800">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-medium">Experiencia</h3>
            {edit && <CreateUpdateExperience status="create" {...experience} />}
          </div>
          <div className="text-neutral-400">
            {experience && experience.length > 0 ? (
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
                No tienes experiencia, puedes agregar una haciendo click en el
                icono del lapiz.
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
