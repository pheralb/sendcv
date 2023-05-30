import type { Metadata } from "next";

import Container from "@/components/container";
import JobOffer from "@/components/job/offer";

import { getOffers } from "@/server/services/getOffers";
import { getDays } from "@/utils/getDays";
import { Link } from "@/ui/link";

export const metadata: Metadata = {
  title: "Explore - Sendcv",
};

export default async function Home() {
  const listOfOffers = await getOffers();
  return (
    <>
      <section className="mb-2 border-b border-neutral-300 dark:border-neutral-800">
        <div className="mx-auto px-4 py-32 lg:flex lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-3xl font-medium text-dark animate-in fade-in-20 duration-400 dark:text-white sm:text-5xl">
              Crea un perfil profesional
            </h1>
            <p className="mx-auto mt-2 max-w-xl sm:text-xl/relaxed">
              y comparte tus redes sociales, proyectos y experiencias
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                className="block w-full rounded border border-neutral-300 px-4 py-2 text-center text-neutral-700 transition duration-150 ease-in-out hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                href="/auth"
              >
                ✨ Crear perfil
              </Link>
            </div>
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
