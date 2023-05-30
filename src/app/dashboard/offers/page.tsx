import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getOffersByUser } from "@/server/services/getOffersByUser";
import { Box, PackageOpen, Pin } from "lucide-react";
import Container from "@/components/container";
import { ExternalLink } from "@/ui/link";
import { formatText } from "@/utils/formatText";
import DeleteOffer from "@/components/deleteOffer";

export const metadata: Metadata = {
  title: "My offers - Sendcv",
};

const Page = async () => {
  const offers = await getOffersByUser();

  if (!offers) {
    return notFound();
  }

  const handleDeleteOffer = async (id: string) => {
    try {
      await fetch(`/api/offers`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return offers.length > 0 ? (
    <>
      <div className="sticky top-0 mb-4 flex w-full items-center justify-center border-b border-neutral-300 py-4 text-dark dark:border-neutral-800 dark:text-neutral-400">
        <div className="flex items-center space-x-2">
          <Box width={14} height={14} />
          <span className="font-medium">Mis ofertas</span>
        </div>
      </div>
      <Container>
        <div className="flex flex-col space-y-2">
          {offers?.map((offer) => (
            <div
              key={offer.id}
              className="flex w-full items-center justify-between rounded-md border border-neutral-400 dark:border-neutral-700 p-4"
            >
              <div className="flex flex-col space-y-1">
                <ExternalLink href={offer.infojobsUrl} externalIcon={true}>
                  <h3 className="text-md">{offer.title}</h3>
                </ExternalLink>
                <p className="text-neutral-400">{formatText(offer.author)}</p>
              </div>
              <DeleteOffer id={offer.id} />
            </div>
          ))}
        </div>
      </Container>
    </>
  ) : (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-1">
      <PackageOpen className="mb-2" />
      <h2 className="text-2xl">Aquí aparecerán tus ofertas guardadas</h2>
      <div className="flex items-center text-neutral-300">
        <p>Accede a una oferta y presiona el icono </p>
        <Pin className="ml-2 mr-2" width={15} />
        <p>para guardarla.</p>
      </div>
    </div>
  );
};

export default Page;
