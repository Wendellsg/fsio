"use client";
import { ExerciciesForm } from "@/components/ExerciciesForm";
import Loading from "@/components/LoadingIcon";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Modals } from "@/components/molecules/modals";
import { Button } from "@/components/ui/button";
import { useExercise, useExercises } from "@/hooks";
import { useUserData } from "@/hooks/useUserData";
import { Role } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PacientePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  const goBack = () => router.push("/exercicios");
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const { userData } = useUserData();

  const { exercise, isLoading } = useExercise(id as string);
  const { deleteExercise } = useExercises();

  if (isLoading || !exercise)
    return (
      <div className="flex flex-col items-center justify-center w-full h-full gap-8 p-4">
        <Loading />
      </div>
    );

  return (
    <div className="flex flex-col lg:flex-row items-start justify-start w-full h-full gap-4 lg:p-4">
      <Modals
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Editar exercício"
      >
        <ExerciciesForm
          onSubmit={() => setShowEditModal(false)}
          exercise={exercise!}
        />
      </Modals>

      <VideoPlayer
        goBack={goBack}
        name={exercise?.name}
        video={exercise?.video}
        image={exercise?.image}
        className="w-full min-w-full flex-1 lg:min-w-[450px] lg:w-[450px] lg:max-w-[450px]  lg:h-[450px] lg:min-h-[450px]"
      />

      <div className="w-full px-2 pb-4">
        <div className="flex flex-col gap-4  flex-1">
          {userData?.role === Role.ADMIN && (
            <div className="w-full flex gap-4 justify-end">
              <Button
                onClick={() => setShowEditModal(true)}
                variant={"secondary"}
              >
                Editar
              </Button>

              <Button
                onClick={async () => {
                  await deleteExercise(id as string);

                  router.push("/exercises");
                }}
                variant="destructive"
              >
                Excluir
              </Button>
            </div>
          )}
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
