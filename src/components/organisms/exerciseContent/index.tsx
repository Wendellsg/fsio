"use client";
import { VideoPlayer } from "@/components/molecules/VideoPlayer";
import { Loading } from "@/components/ui/loading";
import { useExercise } from "@/hooks";

export default function ExerciseContent({ id }: { id: string }) {
  const { exercise, isLoading } = useExercise(id as string);

  if (isLoading || !exercise)
    return (
      <div className="flex flex-col items-center justify-center w-full h-full gap-8 p-4">
        <Loading />
      </div>
    );

  return (
    <div className="flex flex-col lg:flex-row items-start justify-start w-full h-full gap-4 lg:p-4">
      <VideoPlayer
        backUrl={"/exercicios"}
        name={exercise?.name}
        video={exercise?.video!}
        image={exercise?.image!}
        className="w-full min-w-full flex-1 lg:min-w-[450px] lg:w-[450px] lg:max-w-[450px]  lg:h-[450px] lg:min-h-[450px]"
      />

      <div className="w-full px-2 pb-4">
        <div className="flex flex-col gap-4  flex-1">
          <h2 className="text-xl font-bold">{exercise?.name}</h2>
          <p className="font-bold text-lg">Resumo</p>
          <p>{exercise?.summary}</p>
          <p className="font-bold text-lg">Instruções</p>
          <p>{exercise?.description}</p>
        </div>
      </div>
    </div>
  );
}
