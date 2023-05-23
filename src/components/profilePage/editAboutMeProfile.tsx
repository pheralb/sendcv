"use client";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";

import { TextArea } from "@/ui/input";
import { Button } from "@/ui/button";
import Alert from "@/ui/alert";
import FormGroup from "@/ui/formGroup";

import EditBtn from "./editBtn";
import { toast } from "sonner";

interface EditAboutMeProfileProps {
  description: string;
}

const EditAboutMeProfile = (props: EditAboutMeProfileProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditAboutMeProfileProps>();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    setCharacterCount(props.description.length);
  }, [props.description]);

  const onSubmit: SubmitHandler<EditAboutMeProfileProps> = async (data) => {
    setLoading(true);
    try {
      ("use server");
      await fetch("/api/profile/aboutme", {
        method: "POST",
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
      <DialogTrigger>
        <EditBtn />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sobre mi</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <TextArea
              placeholder="Sitio web"
              defaultValue={props.description}
              className="h-52"
              onKeyUp={(e) => setCharacterCount(e.currentTarget.value.length)}
              {...register("description", {
                maxLength: {
                  value: 500,
                  message:
                    "La descripción no puede tener más de 500 caracteres.",
                },
              })}
            />
            <div className="flex justify-end">
              <span className="text-neutral-400">
                {characterCount}/500 caracteres
              </span>
            </div>
            {errors.description && (
              <Alert color="warn">{errors.description.message}</Alert>
            )}
          </FormGroup>
          <div className="flex items-center justify-end">
            <Button
              type="submit"
              loadingstatus={loading}
              loadingtext="Guardando..."
            >
              Guardar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAboutMeProfile;
