import { getOffers } from "@/server/services/getOffers";
import { ExternalLink } from "@/ui/link";

export default function Home() {
  // const listOfOffers = await getOffers();
  // console.log(listOfOffers);
  return (
    <>
      <h1>Hello World 🚀</h1>
      <ExternalLink
        href="https://nextjs.org"
        external={true}
        externalIcon={true}
      >
        Next.js!
      </ExternalLink>
    </>
  );
}
