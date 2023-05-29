import React from "react";
import type { Offer } from "@/types/offer";
import { Compass } from "lucide-react";
import { formatText } from "@/utils/formatText";
import { getDays } from "@/utils/getDays";
import Avatar from "boring-avatars";
import { ExternalLink, Link } from "@/ui/link";

const JobCard = (props: Offer) => {
  return (
    <tr className="border-b border-neutral-300 dark:border-neutral-800">
      <th scope="row" className="py-4 font-normal text-neutral-400">
        <ExternalLink href={props.author.uri} externalIcon={true}>
          <div className="flex items-center space-x-3">
            <Avatar size={23} name={props.author.name} variant="marble" />
            <span>{formatText(props.author.name)}</span>
          </div>
        </ExternalLink>
      </th>
      <td className="py-4">
        <div className="flex flex-col">
          <Link href={`/offer/${props.id}`}>
            <h3 className="mb-1 font-medium">{props.title}</h3>
          </Link>
          <p className="text-md text-neutral-400">{props.province}</p>
        </div>
      </td>
      <td className="py-4">
        <p>{props.experienceMin}</p>
      </td>
      <td className="py-4 text-right text-neutral-400">
        <p>Publicado hace {getDays(props.published.toString())} días</p>
      </td>
    </tr>
  );
};

export default JobCard;
