import Container from "@/components/container";
import JobOffer from "@/components/job/offer";

import { getOffers } from "@/server/services/getOffers";
import { getDays } from "@/utils/getDays";

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
        <div className="relative overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-neutral-500 dark:text-neutral-400">
              <tr>
                <th scope="col" className="py-3 font-normal">
                  Equipo
                </th>
                <th scope="col" className="py-3 font-normal">
                  Oferta
                </th>
                <th scope="col" className="py-3"></th>
              </tr>
            </thead>
            <tbody>
              {listOfOffers
                .sort(
                  (a, b) =>
                    getDays(a.published.toString()) -
                    getDays(b.published.toString())
                )
                .map((offer) => (
                  <JobOffer
                    key={offer.id}
                    link={offer.infojobsUrl}
                    {...offer}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </Container>
    </>
  );
}
