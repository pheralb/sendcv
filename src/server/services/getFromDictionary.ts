import { env } from "@/env.mjs";
import type { iDictionaryID, APIResultDictionary } from "@/types/dictionary";

export const getFromDictionaryUrl = "https://api.infojobs.net/api/1/dictionary";

export async function getFromDictionary(parameter: iDictionaryID) {
  const APIUrlWithParameter = `${getFromDictionaryUrl}/${parameter}`;

  const res = await fetch(APIUrlWithParameter, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${env.INFOJOBS_TOKEN}`,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = await res.json() as APIResultDictionary[];

  const dictionaryResult = data.map((item: APIResultDictionary) => {
    const { id, value, key } = item;
    return {
      id,
      value,
      key,
    };
  });

  return dictionaryResult;
}
