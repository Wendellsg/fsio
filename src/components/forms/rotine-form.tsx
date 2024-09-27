/* eslint-disable @next/next/no-img-element */
"use client";
import { useExercises } from "@/hooks";
import type { RoutineWithExercise } from "@/hooks/usePatients";
import { resolvePath } from "@/lib/cdn";
import { type RoutineData, routineDataSchema } from "@/lib/zod-schemas";
import {
  translateExerciseCategory,
  translateFrequencyType,
  translatePeriodType,
} from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type Exercise,
  ExerciseCategoryEnum,
  RoutineFrequencyTypeEnum,
  RoutinePeriodEnum,
} from "@prisma/client";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Select } from "../molecules/select";
import { ExerciseCard } from "../organisms/exercises/card";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input, InputBox, InputError } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select as SNSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Skeleton } from "../ui/skeleton";
import { Textarea } from "../ui/textarea";

export const RoutineForm = ({
  onSubmit,
  routine,
  trigger,
}: {
  onSubmit: (routine: RoutineData) => void;
  trigger: React.ReactNode;
  routine: RoutineWithExercise;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RoutineData>({
    resolver: zodResolver(routineDataSchema),
    defaultValues: routine || {},
  });

  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    routine.exercise ?? null
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="max-w-screen-sm">
        <DialogTitle>
          <h2 className="text-lg font-bold">
            {routine.id ? "Editar rotina" : "Nova rotina"}
          </h2>
        </DialogTitle>
        {!selectedExercise && (
          <SelectExercise
            onExerciseSelect={(exercise) => {
              setSelectedExercise(exercise);
              setValue("exerciseId", exercise.id);
            }}
          />
        )}

        {selectedExercise && (
          <div className="flex flex-col h-fit pb-8">
            <div className="w-full flex justify-center items-start flex-wrap my-auto h-fit">
              <div className="flex flex-col gap-4 min-h-fit w-fit justify-start items-center">
                <ExerciseCard
                  exercise={selectedExercise}
                  key={selectedExercise.id}
                  showFavoriteButton
                  showAddButton={false}
                  showRemoveButton
                  removeAction={() => {
                    setValue("exerciseId", null);
                    setSelectedExercise(null);
                  }}
                />
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col w-fit justify-start items-start flex-wrap gap-3 p-4 ">
                  <div className="flex h-fit gap-4 w-full flex-wrap">
                    <InputBox>
                      <Label htmlFor="frequency">Frequência</Label>
                      <Input
                        placeholder="Vezes por..."
                        type={"number"}
                        className="w-full min-w-20"
                        id="frequency"
                        {...register("frequency")}
                      />

                      {errors.frequency?.message && (
                        <InputError>{errors.frequency?.message}</InputError>
                      )}
                    </InputBox>

                    <InputBox>
                      <Label htmlFor="frequencyType">Tipo de frequência</Label>
                      <Select
                        value={watch("frequencyType") && watch("frequencyType")}
                        onChange={(value) => {
                          setValue("frequencyType", value);
                        }}
                        options={Object.keys(RoutineFrequencyTypeEnum).map(
                          (key) => ({
                            value: key,
                            label: translateFrequencyType(
                              key as RoutineFrequencyTypeEnum
                            ),
                          })
                        )}
                        placeholder="Tipo de frequência"
                      />
                      {errors.frequencyType?.message && (
                        <InputError>{errors.frequencyType?.message}</InputError>
                      )}
                    </InputBox>

                    <InputBox>
                      <Label htmlFor="period">Período</Label>
                      <Select
                        value={watch("period") && watch("period")}
                        onChange={(value) => {
                          setValue("period", value);
                        }}
                        options={Object.keys(RoutinePeriodEnum).map((key) => ({
                          value: key,
                          label: translatePeriodType(key as RoutinePeriodEnum),
                        }))}
                        placeholder="Período"
                      />
                      {errors.period?.message && (
                        <InputError>{errors.period?.message}</InputError>
                      )}
                    </InputBox>
                  </div>

                  <div className="flex h-fit flex-wrap w-full gap-5">
                    <InputBox>
                      <Label htmlFor="series">Series</Label>
                      <Input
                        placeholder="Quantidade de series"
                        type={"number"}
                        id="series"
                        {...register("series")}
                      />

                      {errors.series?.message && (
                        <InputError>{errors.series?.message}</InputError>
                      )}
                    </InputBox>

                    <InputBox>
                      <Label htmlFor="repetitions">Repetições</Label>
                      <Input
                        {...register("repetitions")}
                        placeholder="Quantidade de repetições"
                        type={"number"}
                        id="repetitions"
                      />
                      {errors.repetitions?.message && (
                        <InputError>{errors.repetitions?.message}</InputError>
                      )}
                    </InputBox>
                  </div>

                  <div className="flex h-fit items-start w-full justify-start">
                    <Textarea
                      placeholder="Descrição da rotina"
                      {...register("description")}
                    />

                    {errors.description?.message && (
                      <InputError>{errors.description?.message}</InputError>
                    )}
                  </div>
                </div>
              </form>
            </div>

            <div className="flex justify-center items-center w-full my-4">
              <Button
                onClick={handleSubmit((v) => {
                  onSubmit({
                    ...v,
                    exerciseId: selectedExercise.id,
                    userId: routine.userId,
                  });
                })}
                type="submit"
                className="w-[200px]"
              >
                {routine.id ? "Atualizar rotina" : "Criar rotina"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

function SelectExercise({
  onExerciseSelect,
}: {
  onExerciseSelect: (exercise: Exercise) => void;
}) {
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<ExerciseCategoryEnum | undefined>(
    undefined
  );

  const debouncedSearchTerm = useDebounce(search, 300);

  const { exercises, isLoading } = useExercises({
    category,
    search: debouncedSearchTerm,
  });

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="font-semibold">Selecione um exercício</h2>
      <div className="w-full flex gap-2">
        <div className=" flex-1 min-w-40">
          <Label htmlFor="search">Pesquisa</Label>
          <Input
            type="text"
            name="search"
            id="search"
            placeholder="Pesquisar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex-1 min-w-40">
          <Label htmlFor="category">Categoria</Label>
          <SNSelect
            value={category}
            onValueChange={(v) => setCategory(v as ExerciseCategoryEnum)}
          >
            <SelectTrigger name="category" id="category" className="w-full">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(ExerciseCategoryEnum).map((category) => {
                return (
                  <SelectItem key={category} value={category}>
                    {translateExerciseCategory(category)}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </SNSelect>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto mt-4 min-h-60">
        {isLoading &&
          Array.from({ length: 6 }).map((_, index) => (
            <Skeleton
              key={`${`${index}`}-exercise-card-skeleton`}
              className="w-40 h-60 rounded-md"
            />
          ))}

        {!isLoading && exercises?.length === 0 && (
          <p className="text-center text-gray-400">
            Nenhum exercício encontrado
          </p>
        )}

        {exercises?.map((exercise) => {
          return (
            <button
              type="button"
              key={exercise.id}
              className="w-40 h-60 rounded-md relative"
              onClick={() => {
                onExerciseSelect(exercise);
              }}
            >
              <img
                className="absolute left-0 top-0 w-full h-full object-cover rounded-md hover:shadow-md"
                src={resolvePath(exercise.image || "")}
                alt={exercise.name}
              />
              <p className="z-10">{exercise.name}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
