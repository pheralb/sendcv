"use client";

import { Button } from "@/ui/button";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

interface SaveOfferProps {
  id: string;
  title: string;
  author: string;
  infojobsUrl: string;
}

const SaveOffer = (props: SaveOfferProps) => {
  const [loading, setLoading] = useState(false);
  const session = useSession();

  const handleSaveOffer = async () => {
    try {
      setLoading(true);
      await fetch(`/api/offers/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: props.id,
          title: props.title,
          author: props.author,
          infojobsUrl: props.infojobsUrl,
        }),
      });
      toast.success("Oferta guardada correctamente");
    } catch (error) {
      toast.error("No se ha podido guardar la oferta", {
        description: `${error}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return session?.data?.user ? (
    <Button onClick={handleSaveOffer} loadingstatus={loading}>
      Guardar
    </Button>
  ) : null;
};

export default SaveOffer;
