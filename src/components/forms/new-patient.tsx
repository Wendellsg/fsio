/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input, InputBox, InputError } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { addPatient, createPatient, searchPatient } from "@/hooks/usePatients";
import { queryClient } from "@/providers";
import { User } from "@prisma/client";
import { Plus } from "lucide-react";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { toast } from "react-toastify";

export const NewPatientModal: React.FC<{
  trigger: React.ReactNode;
  refetch: () => void;
}> = ({ trigger, refetch }) => {
  const [email, setEmail] = useState("");
  const [patientPreview, setPatientPreview] = useState<Partial<User> | null>(
    null
  );
  const [loadingPatient, setLoadingPatient] = useState(false);
  const [newPatient, setNewPatient] = useState<{
    name: string;
    email: string;
  }>({
    name: "",
    email: email,
  });

  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  const [creatingPatient, setCreatingPatient] = useState(false);

  const [createMode, setCreateMode] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {createMode ? (
          <div className="flex flex-col gap-4 w-full p-8">
            <h2 className="text-sm text-slate-400">Novo Paciente</h2>

            <p className="font-bold text-xs">
              O paciente não foi encontrado, deseja criar um novo paciente?
            </p>

            <InputBox>
              <Label htmlFor="name">Nome do paciente</Label>
              <Input
                onChange={(e) =>
                  setNewPatient({ ...newPatient, name: e.target.value })
                }
                value={newPatient.name}
                type="text"
                name="name"
                placeholder="Digite o nome do paciente"
              />
              <InputError>{errors.name}</InputError>
            </InputBox>

            <InputBox>
              <Label htmlFor="email">Email do paciente</Label>
              <Input
                onChange={(e) =>
                  setNewPatient({ ...newPatient, email: e.target.value })
                }
                value={newPatient.email}
                type="email"
                name="email"
                id="email"
                placeholder="Digite o e-mail do paciente"
              />
              <InputError>{errors.email}</InputError>
            </InputBox>
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full p-8">
            <h2 className="text-md font-bold">Procurar paciente</h2>

            <div className="flex items-end gap-4 w-full flex-wrap justify-center">
              <Input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                name="email"
                width="100%"
                placeholder="Digite o email do paciente"
              />

              <Button
                onClick={async () => {
                  if (!email || !email.includes("@")) return;

                  const patients = queryClient.getQueriesData({
                    queryKey: ["patients"],
                  })[0][1] as User[];

                  const patient = patients.find((p) => p.email === email);

                  if (patient) {
                    toast.warn("Paciente já adicionado");
                    return;
                  }

                  setLoadingPatient(true);
                  const response = await searchPatient(email);
                  setNewPatient({ ...newPatient, email });
                  if (!response) setCreateMode(true);
                  setPatientPreview(response);
                  setLoadingPatient(false);
                }}
                type="submit"
                disabled={!email || !email.includes("@")}
                className="w-full flex gap-2 items-center justify-center"
              >
                Procurar <BsSearch />
              </Button>
            </div>

            {loadingPatient && (
              <div className="flex w-full justify-start items-center gap-2">
                <Skeleton className="rounded-full w-12 h-12 object-cover border-mutted border-2" />
                <Skeleton className="w-20 h-4" />
              </div>
            )}

            {patientPreview?.id && !loadingPatient && (
              <div className="flex flex-col w-full justify-center items-center gap-4 mt-8">
                <p className="text-sm text-slate-400">Paciente encontrado</p>

                <div className="flex items-center justify-center gap-4">
                  <img
                    src={
                      patientPreview.image ||
                      "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                    }
                    alt={patientPreview.name}
                    className="rounded-full w-12 h-12 object-cover border-accent border-2"
                  />
                  <p className="font-bold text-sm">{patientPreview.name}</p>
                  <DialogClose asChild>
                    <Button
                      type="submit"
                      onClick={async () => {
                        await addPatient(patientPreview.id as string);

                        queryClient.refetchQueries({
                          queryKey: ["professionalRequests"],
                        });
                      }}
                    >
                      <Plus />
                    </Button>
                  </DialogClose>
                </div>

                <div>
                  <p className="text-sm mt-8">
                    Obs: Ao adicionar um paciente, ele será notificado e poderá
                    ou não aceitar a solicitação.
                    <br />
                    Só então ele será adicionado a sua lista de pacientes.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {createMode && (
          <>
            <DialogFooter className="flex gap-4 w-full justify-center items-center mt-8 px-8">
              <DialogClose asChild>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setCreateMode(false);
                  }}
                  className="w-full"
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                disabled={creatingPatient}
                type="submit"
                className="w-full"
                onClick={async () => {
                  if (!newPatient.name) {
                    setErrors({ ...errors, name: "Campo obrigatório" });
                    return;
                  }
                  if (!newPatient.email) {
                    setErrors({ ...errors, email: "Campo obrigatório" });
                    return;
                  }

                  setCreatingPatient(true);
                  const result = await createPatient(newPatient);

                  if (result) {
                    setCreateMode(false);
                    refetch();
                  }

                  setErrors({});
                  setCreatingPatient(false);
                }}
              >
                Criar
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
