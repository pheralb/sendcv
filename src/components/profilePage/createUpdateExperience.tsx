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

interface CreateUpdateExperienceProps {
  status: "edit" | "create";
  id?: string;
  title?: String;
  description?: String;
  company?: String;
  url?: String;
  location?: String;
  startDate?: Date | String | null;
  endDate?: Date | String | null;
}

const CreateUpdateExperience = (props: CreateUpdateExperienceProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUpdateExperienceProps>();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Create or update experience:
  const onSubmit: SubmitHandler<CreateUpdateExperienceProps> = async (data) => {
    setLoading(true);
    try {
      await fetch(
        props.status === "edit"
          ? `/api/profile/experience/${props.id}`
          : "/api/profile/experience",
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
          color={props.status === "edit" ? "text-dark dark:text-green-200" : "text-dark dark:text-yellow-200"}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {props.status === "edit" ? "Editar" : "Añadir"} experiencia
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label htmlFor="title">Nombre del puesto</Label>
            <Input
              type="text"
              placeholder="Nombre del puesto"
              defaultValue={`${props.status === "edit" ? props.title : ""}`}
              {...register("title", {
                required: "Nombre del puesto.",
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
            <Label htmlFor="company">Empresa</Label>
            <Input
              type="text"
              placeholder="Empresa"
              defaultValue={`${props.status === "edit" ? props.company : ""}`}
              {...register("company", {
                required: "La empresa es obligatoria.",
              })}
            />
            {errors.company && (
              <Alert color="warn">{errors.company.message}</Alert>
            )}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="url">Url de la empresa</Label>
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
          <div className="flex w-full items-center space-x-2">
            <FormGroup>
              <Label htmlFor="startDate">Inicio:</Label>
              <Input
                type="date"
                defaultValue={`${
                  props.status === "edit" ? props.startDate : ""
                }`}
                {...register("startDate", {
                  required: "El inicio es obligatorio.",
                })}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="endDate">Final:</Label>
              <Input
                type="date"
                defaultValue={`${props.status === "edit" ? props.endDate : ""}`}
                {...register("endDate", {
                  required: "El inicio es obligatorio.",
                })}
              />
            </FormGroup>
          </div>
          {errors.startDate && (
            <div className="mb-2">
              <Alert color="warn">{errors.startDate.message}</Alert>
            </div>
          )}
          <Alert color="tip">
            Si actualmente trabajas en esta empresa, deja el campo de final
            vacío.
          </Alert>
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

export default CreateUpdateExperience;
