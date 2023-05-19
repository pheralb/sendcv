import Container from "@/components/container";
import JobCard from "@/components/job/card";

import { getOffers } from "@/server/services/getOffers";

export default async function Home() {
  const listOfOffers = await getOffers();
  return (
    <>
      <section className="mb-5 border-b border-neutral-300 dark:border-neutral-800">
        <div className="grid max-w-screen-xl p-12 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="mb-4 max-w-2xl text-4xl font-bold leading-none tracking-tight dark:text-white md:text-5xl xl:text-5xl">
              Sendcv
            </h1>
            <p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
              Crea tu perfil y encuentra tu próximo empleo.
            </p>
          </div>
        </div>
      </section>
      <Container>
        <div className="flex flex-col space-y-2">
          {listOfOffers.map((offer) => (
            <JobCard key={offer.id} {...offer} />
          ))}
        </div>
      </Container>
    </>
  );
}
