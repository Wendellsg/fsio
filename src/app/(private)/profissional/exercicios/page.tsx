import { Exercises } from "@/components/organisms/exercises";
import { ExerciseCategoryEnum } from "@prisma/client";

export default function ExercisesPage({
  searchParams,
}: {
  searchParams: { name: string; category: ExerciseCategoryEnum };
}) {
  return (
    <div className="flex flex-col items-start justify-start w-full h-full gap-8 p-8">
      <Exercises {...searchParams} />
    </div>
  );
}
