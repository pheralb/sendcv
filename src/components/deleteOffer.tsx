"use client";

import { Button } from "@/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteOfferProps {
  id: string;
}

const DeleteOffer = (props: DeleteOfferProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDeleteOffer = async () => {
    try {
      setLoading(true);
      await fetch(`/api/offers/${props.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
        body: JSON.stringify({
          id: props.id,
        }),
      });
      toast.success("Oferta guardada correctamente");
      router.refresh();
    } catch (error) {
      toast.error("No se ha podido eliminar la oferta", {
        description: `${error}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleDeleteOffer} loadingstatus={loading}>
      Eliminar
    </Button>
  );
};

export default DeleteOffer;
