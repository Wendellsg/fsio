"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { resolvePath } from "@/lib/cdn";
import { Exercise } from "@prisma/client";
import { useRouter } from "next/navigation";
import { AiFillHeart } from "react-icons/ai";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
export const ExerciseCard: React.FC<{
  exercise: Exercise;
  showFavoriteButton?: boolean;
  url?: string;
  showAddButton?: boolean;
  showRemoveButton?: boolean;
  addAction?: (id: string) => void;
  removeAction?: (id: string) => void;
}> = ({
  exercise,
  url,
  showFavoriteButton,
  showAddButton,
  showRemoveButton,
  addAction,
  removeAction,
}) => {
  const router = useRouter();

  return (
    <div
      className="mx-auto flex flex-col w-64 justify-between flex-1 md:flex-grow-0 min-w-64 h-80 min-h-80 rounded-lg shadow-md transition-all duration-200 bg-center bg-no-repeat bg-cover m-2 relative hover:shadow-xl"
      style={{
        backgroundImage: `url(${resolvePath(exercise.image || "")})`,
      }}
    >
      <div className="flex w-full justify-end items-start gap-2 p-2">
        {showFavoriteButton && (
          <Button
            variant={"link"}
            onClick={() => {
              /* if (isFavorite) {
                removeFavoriteExercise(exercise?.id);
              } else {
                addFavoriteExercise(exercise?.id);
              } */
            }}
            className="p-0"
          >
            <AiFillHeart
              size={30}
              /*  className={` ${
                isFavorite ? "text-destructive" : "text-accent"
              } hover:scale-110 transform transition-all duration-300`} */
            />
          </Button>
        )}
        {showAddButton && (
          <Button
            variant={"link"}
            onClick={() => {
              addAction && addAction(exercise?.id);
            }}
            className="p-0"
          >
            <IoIosAddCircle
              size={30}
              className="text-accent hover:scale-110 transform transition-all duration-300"
            />
          </Button>
        )}
        {showRemoveButton && (
          <Button
            variant={"link"}
            onClick={() => {
              removeAction && removeAction(exercise?.id);
            }}
            className="p-0"
          >
            <IoIosRemoveCircle size={30} className="text-destructive" />
          </Button>
        )}
      </div>
      <div
        className="group p-4 ease-out duration-300 flex flex-col justify-center items-start w-full h-fit  pb-4  bg-gradient-to-t rounded-lg overflow-hidden cursor-pointer from-white hover:from-60% to-transparent "
        onClick={() => {
          if (!url) return;
          router.push(url);
        }}
      >
        <p className="text-lg  font-bold text-white drop-shadow-md mb-4">
          {exercise?.name}
        </p>
        <p className="max-h-0 group-hover:max-h-fit overflow-hidden text-sm font-bold">
          {exercise?.summary.length > 250
            ? exercise?.summary.slice(0, 250) + "..."
            : exercise?.summary}
        </p>
      </div>
    </div>
  );
};

export function ExerciseCardSkeleton() {
  return (
    <Skeleton className="w-64 h-80 flex flex-col justify-end gap-1 p-4">
      <Skeleton className="w-3/4 h-6 bg-gray-400 rounded-lg" />
      <Skeleton className="w-2/4 h-4 bg-gray-400 rounded-lg" />
    </Skeleton>
  );
}
