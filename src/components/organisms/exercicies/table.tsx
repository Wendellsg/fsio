"use client";

import { ExercisesForm } from "@/components/forms/exercise-form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useExercises } from "@/hooks";
import { Exercise } from "@prisma/client";
import { format } from "date-fns";
import { Trash2, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { FaEllipsisVertical } from "react-icons/fa6";

export function ExercisesTable() {
  const { exercises, isLoading, refetch, deleteExercise } = useExercises();

  console.log(exercises);

  return (
    <div className="mx-auto p-4 border rounded-md">
      <div className="my-4 flex w-full justify-end">
        <ExercisesForm
          onSubmit={refetch}
          exercise={{} as Exercise}
          trigger={<Button>Adicionar</Button>}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nome</TableHead>
            <TableHead>Cadastro</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exercises?.map((exercise) => {
            return (
              <TableRow key={exercise.id}>
                <TableCell>
                  <p>{exercise.name}</p>
                </TableCell>

                <TableCell>
                  {format(new Date(exercise.createdAt), "dd/MM/yyyy")}
                </TableCell>

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <FaEllipsisVertical className="rotate-90" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Link
                          className="flex w-full h-full"
                          href={`/admin/exercicios/${exercise.id}`}
                        >
                          <UserIcon className="w-4 h-4 mr-2" />
                          Perfil
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => deleteExercise(exercise.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}

          {isLoading && (
            <>
              {new Array(5).fill(0).map((_, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <Avatar className="w-8 h-8 text-xs">
                        <AvatarFallback />
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-40 h-6 mb-2" />
                      <Skeleton className="w-20 h-4" />
                    </TableCell>
                    <TableCell className="flex gap-1 items-center">
                      <Skeleton className="w-4 h-4 rounded-full" />
                      <Skeleton className="w-4 h-4 rounded-full" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="w-16 h-6 mb-2" />
                      <Skeleton className="w-16 h-6" />
                    </TableCell>
                  </TableRow>
                );
              })}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
