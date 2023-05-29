import { env } from "@/env.mjs";
import { iFullOffer } from "@/types/fullOffer";

export const getOffersById = "https://api.infojobs.net/api/7/offer/";

export async function getOfferById(id: string) {
  const res = await fetch(`${getOffersById}${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${env.INFOJOBS_TOKEN}`,
    },
  });
  const data: iFullOffer = await res.json();
  return data;
}
