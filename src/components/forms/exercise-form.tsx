/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { useExercises } from "../../hooks";

import { resolvePath } from "@/lib/cdn";
import { translateExerciseCategory } from "@/types";
import {
  Exercise,
  ExerciseCategoryEnum,
  FileTypeEnum,
  Prisma,
} from "@prisma/client";
import { DialogTitle } from "@radix-ui/react-dialog";
import { UploadCard } from "../organisms/uploadCard";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

enum ContentEnum {
  IMAGE = "image",
  VIDEO = "video",
  BASIC = "basic",
}

export const ExercisesForm = ({
  onSubmit,
  exercise,
  trigger,
}: {
  onSubmit: () => void;
  exercise: Exercise;
  trigger: React.ReactNode;
}) => {
  const [newExercise, setNewExercise] = useState<Partial<Exercise>>({
    name: exercise?.name || "",
    category: exercise?.category || "",
    description: exercise?.description || "",
    image: exercise?.image,
    summary: exercise?.summary || "",
    video: exercise?.video || "",
  });

  const [content, setContent] = useState<ContentEnum>(ContentEnum.BASIC);

  const [submitting, setSubmitting] = useState<boolean>(false);

  const { createExercise, updateExercise } = useExercises();

  async function handleSave() {
    setSubmitting(true);

    const payload: Prisma.ExerciseUncheckedCreateInput = {
      ...exercise,
      ...newExercise,
      image: newExercise.image,
      video: newExercise.video,
    };

    if (exercise.id) {
      await updateExercise(payload);
      setSubmitting(false);
      return;
    }

    await createExercise(payload);
    setSubmitting(false);

    onSubmit();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-screen-sm">
        <DialogHeader>
          <DialogTitle>
            {exercise.id
              ? `Editando ${exercise.name}`
              : "Adicionando exercício"}
          </DialogTitle>
          <DialogDescription>
            {exercise.id
              ? "Edite as informações do exercício"
              : "Adicione um novo exercício"}
          </DialogDescription>
        </DialogHeader>

        {content === ContentEnum.BASIC && (
          <>
            <Label htmlFor="name" className="text-muted text-xs">
              Nome
            </Label>
            <Input
              value={newExercise.name}
              name="name"
              id="name"
              onChange={(e) => {
                setNewExercise({
                  ...newExercise,
                  name: e.target.value,
                });
              }}
              placeholder="Nome do exercício"
              type={"text"}
              width="100%"
            />

            <Label htmlFor="category" className="text-muted text-xs">
              Categoria
            </Label>
            <Select
              value={newExercise.category!}
              onValueChange={(value: ExerciseCategoryEnum) => {
                setNewExercise({
                  ...newExercise,
                  category: value,
                });
              }}
            >
              <SelectTrigger className="w-full" id="category">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>

              <SelectContent>
                {Object.values(ExerciseCategoryEnum).map((category) => (
                  <SelectItem key={category} value={category}>
                    {translateExerciseCategory(category)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Label htmlFor="description" className="text-muted text-xs">
              Descrição
            </Label>
            <Textarea
              value={newExercise.description}
              id="description"
              name="description"
              onChange={(e) => {
                setNewExercise({
                  ...newExercise,
                  description: e.target.value,
                });
              }}
              placeholder="Descrição do exercício"
            />

            <Label htmlFor="summary" className="text-muted text-xs">
              Descrição
            </Label>
            <Textarea
              value={newExercise.summary}
              name="summary"
              id="summary"
              onChange={(e) => {
                setNewExercise({
                  ...newExercise,
                  summary: e.target.value,
                });
              }}
              placeholder="Sumário do exercício"
            />

            <Label htmlFor="image" className="text-muted text-xs">
              Imagem
            </Label>

            <div className="w-full max-w-full overflow-clip rounded-md hover:shadow-md">
              <img
                onClick={() => {
                  setContent(ContentEnum.IMAGE);
                }}
                id="image"
                src={resolvePath(newExercise.image as string)}
                alt="image"
                className="w-full h-full object-cover rounded-md cursor-pointer  transition-transform duration-300 ease-in-out"
              />
            </div>

            <Label htmlFor="video" className="text-muted text-xs">
              Video
            </Label>

            <div className="w-full max-w-full overflow-clip rounded-md hover:shadow-md">
              <video
                onClick={() => {
                  setContent(ContentEnum.VIDEO);
                }}
                poster={
                  !!newExercise.video
                    ? ""
                    : "https://blog.iprocess.com.br/wp-content/uploads/2021/11/placeholder.png"
                }
                controls={!!newExercise.video}
                src={resolvePath(newExercise.video as string)}
                className="w-full h-full max-h-[70dvh]  object-cover rounded-md cursor-pointer transition-transform duration-300 ease-in-out"
              />
            </div>
          </>
        )}

        {content === ContentEnum.IMAGE && (
          <>
            <p>
              Selecione uma imagem para o exercício. A imagem deve ser quadrada
              e ter uma resolução de 500x500 pixels.
            </p>
            <UploadCard
              onSelect={(file) => {
                setNewExercise({
                  ...newExercise,
                  image: file,
                });
              }}
              selected={newExercise.image}
              type={FileTypeEnum.image}
              close={() => {
                setContent(ContentEnum.BASIC);
              }}
            />
          </>
        )}

        {content === ContentEnum.VIDEO && (
          <>
            <p>
              Selecione um vídeo para o exercício. O vídeo deve ter uma
              resolução de 1920x1080 pixels.
            </p>
            <UploadCard
              onSelect={(file) => {
                setNewExercise({
                  ...newExercise,
                  video: file,
                });
              }}
              type={FileTypeEnum.video}
              selected={newExercise.video}
              close={() => {
                setContent(ContentEnum.BASIC);
              }}
            />
          </>
        )}

        <div
          data-hide={content !== ContentEnum.BASIC}
          className="flex data-[hide=true]:hidden gap-4 items-center mt-4 w-full justify-center"
        >
          <DialogClose asChild>
            <Button onClick={onSubmit} className="w-36" variant="destructive">
              Cancelar
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              onClick={handleSave}
              className="w-36"
              disabled={submitting}
              type="submit"
            >
              Salvar
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
