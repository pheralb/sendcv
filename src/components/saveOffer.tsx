"use client";

import { Button } from "@/ui/button";
import { useState } from "react";

interface SaveOfferProps {
  id: string;
  title: string;
  author: string;
  infojobsUrl: string;
}

const SaveOffer = (props: SaveOfferProps) => {
  const [loading, setLoading] = useState(false);

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
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleSaveOffer} loadingstatus={loading}>
      Guardar oferta
    </Button>
  );
};

export default SaveOffer;
