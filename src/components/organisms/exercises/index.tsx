"use client";

import {
  ExerciseCard,
  ExerciseCardSkeleton,
} from "@/components/organisms/exercises/card";
import { useExercises } from "@/hooks";
import type { ExerciseCategoryEnum } from "@prisma/client";
import { ExercisesFilters } from "./filters";

export function Exercises({
  search,
  category,
}: {
  search?: string;
  category?: ExerciseCategoryEnum;
}) {
  const { exercises, isLoading } = useExercises({
    search,
    category,
  });

  return (
    <>
      <div className="flex w-full justify-between items-end min-h-fit flex-wrap md:flex-nowrap gap-2">
        <div>
          <h2 className="text-lg bg-accent p-2 rounded-xl font-bold">
            Exercícios
          </h2>
        </div>
        <div className="flex gap-4 items-center h-fit w-fil flex-wrap md:flex-nowrap">
          <ExercisesFilters search={search} category={category} />
        </div>
      </div>
      <div className="justify-items-center w-full grid grid-cols-[1fr] sm:grid-cols-[repeat(auto-fill,_256px)] gap-4 py-4">
        {isLoading &&
          Array.from({ length: 6 }).map((_, index) => (
            <ExerciseCardSkeleton
              key={`${`${index}`}-exercise-card-skeleton`}
            />
          ))}

        {exercises?.map((exercise) => {
          return (
            <ExerciseCard
              exercise={exercise}
              showFavoriteButton={true}
              url={`/profissional/exercicios/${exercise.id}`}
              key={exercise.id}
            />
          );
        })}

        {exercises?.length === 0 && !isLoading && (
          <div className="w-full text-center text-lg font-bold">
            Nenhum exercício encontrado
          </div>
        )}
      </div>
    </>
  );
}
