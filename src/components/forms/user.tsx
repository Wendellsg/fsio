"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { fisioFetcher } from "@/hooks/Apis";
import { User, UserRoleEnum } from "@prisma/client";
import { useState } from "react";
import { toast } from "sonner";
import { RoleIcon } from "../organisms/users/table";
import { Label } from "../ui/label";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

export function UsersForm({
  user,
  trigger,
  refetch,
}: {
  user: User;
  trigger: React.ReactNode;
  refetch: () => void;
}) {
  const [editingUser, setEditingUser] = useState(user);

  function handleSubmit() {
    if (user.id) {
      fisioFetcher({
        url: `/users/${user.id}`,
        method: "PATCH",
        data: editingUser,
        callback: () => {
          toast.success("Usuário editado com sucesso");
          refetch();
        },
        onError: () => {
          toast.error("Erro ao editar usuário");
        },
      });
    } else {
      fisioFetcher({
        url: `/users`,
        method: "POST",
        data: editingUser,
        callback: () => {
          toast.success("Usuário criado com sucesso");
          refetch();
        },
        onError: () => {
          toast.error("Erro ao criar usuário");
        },
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {user.id ? `Editando ${user.name}` : "Adicionando usuário"}
          </DialogTitle>
          <DialogDescription>
            {user.id
              ? "Edite as informações do usuário"
              : "Adicione um novo usuário"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              id="name"
              value={editingUser.name}
              className="col-span-3"
              placeholder="Nome do usuário"
              onChange={(e) =>
                setEditingUser((prev) => {
                  return { ...prev, name: e.target.value };
                })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Email do usuário"
              value={editingUser.email}
              onChange={(e) =>
                setEditingUser((prev) => {
                  return { ...prev, email: e.target.value };
                })
              }
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Funções
            </Label>
            <div className="w-full ml-4">
              <ToggleGroup
                type="multiple"
                defaultValue={user.roles || []}
                onValueChange={(value) => {
                  setEditingUser((prev: User) => {
                    if (!prev)
                      return {
                        roles: value as UserRoleEnum[],
                      } as User;

                    return { ...prev, roles: value as UserRoleEnum[] } as User;
                  });
                }}
              >
                <ToggleGroupItem value={UserRoleEnum.patient}>
                  <RoleIcon role={UserRoleEnum.patient} />
                </ToggleGroupItem>
                <ToggleGroupItem value={UserRoleEnum.professional}>
                  <RoleIcon role={UserRoleEnum.professional} />
                </ToggleGroupItem>
                <ToggleGroupItem value={UserRoleEnum.admin}>
                  <RoleIcon role={UserRoleEnum.admin} />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} type="submit">
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
