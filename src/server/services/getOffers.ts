import { env } from "@/env.mjs";
import type { APIResultOffer } from "@/types/offer";

export const getOffersUrl =
  "https://api.infojobs.net/api/9/offer?category=informatica-telecomunicaciones";

export async function getOffers() {

  const res = await fetch(getOffersUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${env.INFOJOBS_TOKEN}`,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { items }: { items: APIResultOffer[] } = await res.json();

  const listOfOffers = items.map((item) => {
    const { id, title, province, experienceMin, link, teleworking } = item;
    return {
      id,
      title,
      province: province.value,
      experienceMin: experienceMin.value,
      link,
      teleworking: teleworking?.value ?? "No especificado",
    };
  });

  return listOfOffers;
}
