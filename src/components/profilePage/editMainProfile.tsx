"use client";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { Label } from "@/ui/label";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import Alert from "@/ui/alert";
import FormGroup from "@/ui/formGroup";

import EditBtn from "./editBtn";
import { toast } from "sonner";

interface EditMainProfileProps {
  name: string;
  website: string;
  twitterUrl: string;
  linkedinUrl: string;
}

const EditMainProfile = (props: EditMainProfileProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditMainProfileProps>();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<EditMainProfileProps> = async (data) => {
    setLoading(true);
    try {
      ("use server");
      await fetch("/api/profile", {
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
          <DialogTitle>Editar nombre</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label htmlFor="name">Nombre *</Label>
            <Input
              type="text"
              placeholder="Nombre"
              defaultValue={props.name}
              {...register("name", {
                required: "Introduce un nombre para tu perfil.",
              })}
            />
            {errors.name && <Alert color="warn">{errors.name.message}</Alert>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="website">Sitio web</Label>
            <Input
              type="url"
              placeholder="Sitio web"
              defaultValue={props.website}
              {...register("website", {
                pattern: {
                  value: /^(ftp|http|https):\/\/[^ "]+$/,
                  message: "Introduce una url válida.",
                },
              })}
            />
            {errors.website && (
              <Alert color="warn">{errors.website.message}</Alert>
            )}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="twitterUrl">URL de Twitter</Label>
            <Input
              type="url"
              placeholder="URL de Twitter"
              defaultValue={props.twitterUrl}
              {...register("twitterUrl", {
                pattern: {
                  value: /^(ftp|http|https):\/\/[^ "]+$/,
                  message: "Introduce una url válida.",
                },
              })}
            />
            {errors.website && (
              <Alert color="warn">{errors.twitterUrl?.message}</Alert>
            )}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="linkedinUrl">URL de LinkedIn</Label>
            <Input
              type="url"
              placeholder="URL de LinkedIn"
              defaultValue={props.linkedinUrl}
              {...register("linkedinUrl", {
                pattern: {
                  value: /^(ftp|http|https):\/\/[^ "]+$/,
                  message: "Introduce una url válida.",
                },
              })}
            />
            {errors.website && (
              <Alert color="warn">{errors.linkedinUrl?.message}</Alert>
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

export default EditMainProfile;
