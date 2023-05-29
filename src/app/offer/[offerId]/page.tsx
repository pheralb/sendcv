import { getOfferById } from "@/server/services/getOfferById";
import { ExternalLink, Link } from "@/ui/link";
import Infojobs from "@/ui/logos/infojobs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/tooltip";
import { formatText } from "@/utils/formatText";
import Avatar from "boring-avatars";
import { ChevronLeft, Verified } from "lucide-react";
import { notFound } from "next/navigation";

interface ParamsProps {
  params: {
    offerId: string;
  };
}

export default async function Page(props: ParamsProps) {
  const offer = await getOfferById(props.params.offerId);
  if (!offer || offer === null) {
    return notFound();
  }
  return (
    <>
      <div className="sticky top-0 mt-1 flex w-full items-center justify-between border-b border-neutral-300 bg-neutral-200 px-6 py-3 text-sm dark:border-neutral-800 dark:bg-neutral-900/90">
        <Link href="/">
          <div className="flex items-center space-x-2 text-neutral-700 duration-75 hover:text-dark dark:text-neutral-400 dark:hover:text-white">
            <ChevronLeft width={16} />
            <span>Volver</span>
          </div>
        </Link>
        <div className="dark:text-neutral-400">
          <ExternalLink href={offer.link} externalIcon={true}>
            <TooltipProvider delayDuration={0.2}>
              <Tooltip>
                <TooltipTrigger className="cursor-pointer">
                  <Infojobs height={18} />
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  sideOffset={10}
                  className="text-[12px]"
                  aria-label="Verified"
                >
                  <p>Ver en Infojobs</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </ExternalLink>
        </div>
      </div>
      <div className="mx-auto mb-12 max-w-4xl animate-in fade-in-100">
        <div className="flex flex-col space-y-5 pt-8">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center space-x-5">
              {offer.profile.logoUrl ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={offer.profile.logoUrl}
                    alt={offer.profile.name}
                    className="h-20 w-20 rounded-full"
                  />
                </>
              ) : (
                <Avatar size={80} name={offer.profile.name} variant="marble" />
              )}
              <div className="flex flex-col">
                <div className="flex items-center">
                  <h2 className="mb-1 text-2xl font-medium">{offer.title}</h2>
                </div>
                <div className="flex items-center space-x-2 text-neutral-500 dark:text-neutral-400">
                  <p>{offer.profile.name}</p>
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
                        <p>Empresa verificada</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  {offer.profile.web && (
                    <>
                      <span>-</span>
                      <ExternalLink
                        href={offer.profile.web}
                        externalIcon={true}
                      >
                        {offer.profile.web.split("/")[2]?.split("www.")?.[1]}
                      </ExternalLink>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          {offer.skillsList.length > 0 && (
            <div className="flex items-center space-x-2">
              {offer.skillsList.map((data) => (
                <span
                  key={data.skill}
                  title={data.skill}
                  className="inline-block cursor-default truncate rounded-full bg-neutral-300 px-2 py-1 text-xs font-medium text-dark dark:bg-neutral-800 dark:text-white"
                >
                  {formatText(data.skill)}
                </span>
              ))}
            </div>
          )}
          <div className="border-t-2 border-neutral-300 pt-5 dark:border-neutral-800">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-medium">Descripción</h3>
            </div>
            <article className="prose max-w-none dark:prose-invert">
              {offer.description}
            </article>
          </div>
          <div className="pt-2">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between border-b-2 border-neutral-300 pb-1 dark:border-neutral-800">
                <p>Localización</p>
                <p>{offer.city}</p>
              </div>
              <div className="flex items-center justify-between border-b-2 border-neutral-300 pb-1 dark:border-neutral-800">
                <p>Vacantes</p>
                <p>{offer.vacancies}</p>
              </div>
              <div className="flex items-center justify-between border-b-2 border-neutral-300 pb-1 dark:border-neutral-800">
                <p>Experiencia mínima</p>
                <p>{offer.experienceMin.value}</p>
              </div>
              <div className="flex items-center justify-between border-b-2 border-neutral-300 pb-1 dark:border-neutral-800">
                <p>Estudios mínimos</p>
                <p>{offer.studiesMin.value}</p>
              </div>
              <div className="flex items-center justify-between border-b-2 border-neutral-300 pb-1 dark:border-neutral-800">
                <p>Jornada</p>
                <p>{offer.journey.value}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
