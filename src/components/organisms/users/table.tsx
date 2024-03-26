"use client";

import { UsersForm } from "@/components/forms/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { deleteUser, useUsers } from "@/hooks/useUsers";
import { translateUserRole } from "@/types";
import { User, UserRoleEnum } from "@prisma/client";
import { format } from "date-fns";
import { Trash2, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { FaUserMd } from "react-icons/fa";
import { FaEllipsisVertical, FaUser, FaUserTie } from "react-icons/fa6";

export function UsersTable() {
  const { users, isLoading, refetch } = useUsers();

  return (
    <div className="mx-auto p-4 border rounded-md">
      <div className="my-4 flex w-full justify-end">
        <UsersForm
          user={{} as User}
          refetch={refetch}
          trigger={<Button>Adicionar usuário</Button>}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]"></TableHead>
            <TableHead>Dados</TableHead>
            <TableHead>Funções</TableHead>
            <TableHead>Cadastro</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => {
            return (
              <TableRow key={user.id}>
                <TableCell>
                  <Avatar className="w-8 h-8 text-xs">
                    <AvatarImage src={user?.image || ""} />
                    <AvatarFallback>
                      {user?.name?.split(" ")[0][0]}
                      {user?.name?.split(" ")[1][0]}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>
                  <p className="font-bold text-md">{user.name}</p>
                  <p className="font-semibold text-slate-500">{user.email}</p>
                </TableCell>
                <TableCell className="flex gap-1 items-center">
                  {user.roles?.map((role) => (
                    <RoleIcon key={role} role={role} className="w-4 h-4" />
                  ))}
                </TableCell>

                <TableCell>
                  {format(new Date(user.createdAt), "dd/MM/yyyy")}
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
                          href={`/admin/usuarios/${user.id}`}
                        >
                          <UserIcon className="w-4 h-4 mr-2" />
                          Perfil
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => deleteUser(user.id, refetch)}
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

export function RoleIcon({
  role,
  className,
}: {
  role: UserRoleEnum;
  className?: string;
}) {
  const roleIcons = {
    [UserRoleEnum.admin]: <FaUserTie className={className} />,
    [UserRoleEnum.professional]: <FaUserMd className={className} />,
    [UserRoleEnum.patient]: <FaUser className={className} />,
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{roleIcons[role]}</TooltipTrigger>
        <TooltipContent>{translateUserRole(role)}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
