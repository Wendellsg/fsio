"use client";
import { Input } from "@/components/ui/input";
import { BR_STATES } from "@/constants/geo";
import { fisioFetcher } from "@/hooks/Apis";
import { useProfessionalData } from "@/hooks/useProfessionalData";
import { useUserData } from "@/hooks/useUserData";
import { cn } from "@/lib/utils";
import { type Professional, ProfessionalTitleEnum } from "@prisma/client";
import { SelectValue } from "@radix-ui/react-select";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ProfileImage } from "../molecules/profile-image";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Loading } from "../ui/loading";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { Textarea } from "../ui/textarea";

export function ProfessionalForm({ className }: { className?: string }) {
  const { professionalData, refetch, isLoading } = useProfessionalData();
  const { userData } = useUserData();
  const [editingProfessional, setEditingProfessional] = useState<
    Professional | undefined
  >(professionalData);

  useEffect(() => {
    if (professionalData) {
      setEditingProfessional(professionalData);
    }
  }, [professionalData]);

  function handleSubmit() {
    if (editingProfessional?.id) {
      fisioFetcher({
        url: `/professionals/${editingProfessional.id}`,
        method: "PATCH",
        data: editingProfessional,
        callback: () => {
          toast.success("Cadastro profissional editado com sucesso");
          refetch();
        },
        onError: () => {
          toast.error("Erro ao editar cadastro profissional");
        },
      });
    } else {
      fisioFetcher({
        url: "/professionals",
        method: "POST",
        data: editingProfessional,
        callback: () => {
          toast.success("Cadastro profissional criado com sucesso");
          refetch();
        },
        onError: () => {
          toast.error("Erro ao criar cadastro profissional");
        },
      });
    }
  }
  if (isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loading />
      </div>
    );

  return (
    <div
      className={cn(
        "mt-8 px-4 w-full md:max-w-screen-md  mx-auto flex flex-col",
        className
      )}
    >
      <div className="flex md:justify-between justify-center flex-col-reverse md:flex-row">
        <div className="flex flex-col gap-2 md:max-w-[600px]">
          <div className="flex items-end gap-2 w-full">
            <div>
              <Label htmlFor="name" className="">
                Nome
              </Label>
              <Select
                value={editingProfessional?.title}
                onValueChange={(v) =>
                  setEditingProfessional((prev) => ({
                    ...prev!,
                    title: v as ProfessionalTitleEnum,
                  }))
                }
              >
                <SelectTrigger className="w-fit">
                  <SelectValue className="col-span-3" placeholder="Dr." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ProfessionalTitleEnum.dr}>Dr.</SelectItem>
                  <SelectItem value={ProfessionalTitleEnum.dra}>
                    Dra.
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <Input
                id="name"
                value={userData?.name || ""}
                disabled
                className="w-full"
                placeholder="Nome do usuário"
              />
            </div>
          </div>

          <div className="flex items-end gap-2 w-full">
            <div className="w-full">
              <Label htmlFor="profession" className="text-right">
                Profissão
              </Label>
              <Input
                id="profession"
                value={editingProfessional?.profession || ""}
                onChange={(e) =>
                  setEditingProfessional((prev) => ({
                    ...prev!,
                    profession: e.target.value,
                  }))
                }
                placeholder="Fisioterapeuta"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="license" className="text-right">
                Registro Profissional
              </Label>
              <Input
                autoComplete="document"
                id="license"
                value={
                  editingProfessional?.license === "DEFAULT" ||
                  !editingProfessional?.license
                    ? ""
                    : editingProfessional?.license
                }
                onChange={(e) =>
                  setEditingProfessional((prev) => ({
                    ...prev!,
                    license: e.target.value,
                  }))
                }
                placeholder="123456-F"
              />
            </div>

            <div className="w-full">
              <Label htmlFor="license" className="text-right">
                Estado de Registro
              </Label>
              <Select
                value={editingProfessional?.licenseState || "SP"}
                onValueChange={(v) =>
                  setEditingProfessional((prev) => ({
                    ...prev!,
                    licenseState: v,
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue className="col-span-3" placeholder="SP" />
                </SelectTrigger>
                <SelectContent>
                  {BR_STATES.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-end gap-2 w-full">
            <div className="">
              <Label htmlFor="phone" className="text-right">
                Telefone
              </Label>
              <Input
                id="phone"
                value={editingProfessional?.phone || ""}
                onChange={(e) =>
                  setEditingProfessional((prev) => ({
                    ...prev!,
                    phone: e.target.value,
                  }))
                }
                className="w-full md:w-40"
                placeholder="(00) 00000-0000"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="email" className="text-right">
                Email(Profissional)
              </Label>
              <Input
                id="email"
                type="email"
                value={editingProfessional?.email || ""}
                onChange={(e) =>
                  setEditingProfessional((prev) => ({
                    ...prev!,
                    email: e.target.value,
                  }))
                }
                className="w-full"
                placeholder="email@profissional.com"
              />
            </div>
          </div>

          <div className="">
            <Label htmlFor="presentation" className="text-right">
              Apresentação
            </Label>
            <Textarea
              id="presentation"
              value={editingProfessional?.presentation || ""}
              onChange={(e) =>
                setEditingProfessional((prev) => ({
                  ...prev!,
                  presentation: e.target.value,
                }))
              }
              className="md:w-full"
              placeholder="Fale um pouco sobre você"
            />
          </div>

          <div className="flex justify-center mt-8">
            <Button className="w-40" onClick={handleSubmit}>
              Salvar
            </Button>
          </div>
        </div>

        <div className="mx-auto md:mx-0 md:ml-8">
          <ProfileImage className="w-40 h-40" editable />
        </div>
      </div>
    </div>
  );
}
