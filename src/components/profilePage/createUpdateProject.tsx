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

import { Input, TextArea } from "@/ui/input";
import { Button } from "@/ui/button";
import Alert from "@/ui/alert";
import FormGroup from "@/ui/formGroup";
import { Label } from "@/ui/label";

import EditBtn from "./editBtn";
import { toast } from "sonner";

interface CreateUpdateProjectProps {
  status: "edit" | "create";
  id?: string;
  title?: String;
  description?: String;
  url?: String;
  repository?: String;
}

const CreateUpdateProject = (props: CreateUpdateProjectProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUpdateProjectProps>();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Create or update project:
  const onSubmit: SubmitHandler<CreateUpdateProjectProps> = async (data) => {
    setLoading(true);
    try {
      await fetch(
        props.status === "edit"
          ? `/api/profile/projects/${props.id}`
          : "/api/profile/projects",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: props.status === "edit" ? "PATCH" : "POST",
          body: JSON.stringify(data),
        }
      );
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
        <EditBtn
          border={props.status === "edit" ? false : true}
          color={props.status === "edit" ? "text-green-200" : "text-yellow-200"}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {props.status === "edit" ? "Editar" : "Añadir"} proyecto
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label htmlFor="title">Nombre del proyecto</Label>
            <Input
              type="text"
              placeholder="Nombre del proyecto"
              defaultValue={`${props.status === "edit" ? props.title : ""}`}
              {...register("title", {
                required: "Nombre del proyecto.",
              })}
            />
            {errors.title && <Alert color="warn">{errors.title.message}</Alert>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="description">Descripción</Label>
            <TextArea
              placeholder="Descripción"
              defaultValue={`${
                props.status === "edit" ? props.description : ""
              }`}
              {...register("description", {
                required: "La descripción es obligatoria.",
              })}
            />
            {errors.description && (
              <Alert color="warn">{errors.description.message}</Alert>
            )}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="url">Url del proyecto:</Label>
            <Input
              type="url"
              placeholder="URL"
              defaultValue={`${props.status === "edit" ? props.url : ""}`}
              {...register("url", {
                pattern: {
                  value: /^(ftp|http|https):\/\/[^ "]+$/,
                  message: "Introduce una url válida.",
                },
              })}
            />
            {errors.url && <Alert color="warn">{errors.url.message}</Alert>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="repository">Repositorio:</Label>
            <Input
              type="url"
              placeholder="Repositorio"
              defaultValue={`${props.status === "edit" ? props.repository : ""}`}
              {...register("repository", {
                pattern: {
                  value: /^(ftp|http|https):\/\/[^ "]+$/,
                  message: "Introduce una url válida.",
                },
              })}
            />
            {errors.url && <Alert color="warn">{errors.url.message}</Alert>}
          </FormGroup>
          <div className="mt-2 flex items-center justify-end">
            <Button
              type="submit"
              loadingstatus={loading}
              loadingtext={props.status === "edit" ? "Editando" : "Guardando"}
            >
              {props.status === "edit" ? "Editar" : "Añadir"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUpdateProject;
