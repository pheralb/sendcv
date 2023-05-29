"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { cn } from "@/utils/cn";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { Button } from "@/ui/button";
import { Trash } from "lucide-react";
import { toast } from "sonner";

interface DeleteExperienceProps {
  id: string;
}

const DeleteExperience = (props: DeleteExperienceProps) => {
  const { handleSubmit } = useForm<DeleteExperienceProps>();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<DeleteExperienceProps> = async (data) => {
    setLoading(true);
    try {
      await fetch(`/api/profile/experience/${props.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
        body: JSON.stringify(data),
      });
      toast.success("Perfil actualizado correctamente.");
      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.error("Ha ocurrido un error.", {
        description: `${error}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={cn(
          "rounded-full p-2 transition-colors duration-75 hover:bg-neutral-300 dark:hover:bg-neutral-700"
        )}
      >
        <Trash width={14} height={14} className="text-dark dark:text-red-200" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¿Eliminar experiencia?</DialogTitle>
        </DialogHeader>
        <div className="flex justify-end">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Button
              type="submit"
              loadingstatus={loading}
              loadingtext="Eliminando..."
            >
              Eliminar
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteExperience;
