"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { type GetPatientResponseDTO, updatePatient } from "@/hooks/usePatients";
import { BRPhoneMask } from "@/lib/maskes";
import { type PatientData, patientDataSchema } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input, InputBox, InputError } from "../ui/input";
import { Label } from "../ui/label";

export function EditPatientForm({
  patient,
  trigger,
  onClose,
}: {
  patient: GetPatientResponseDTO;
  trigger: React.ReactNode;
  onClose: () => void;
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PatientData>({
    resolver: zodResolver(patientDataSchema),
    defaultValues: {
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      birthDate: new Date(patient.birthDate),
      height: patient.height,
      weight: patient.weight,
    },
  });

  const [saving, setSaving] = useState(false);

  const currentPhone = watch("phone");
  const currentBirthDate = watch("birthDate");

  useEffect(() => {
    setValue("phone", BRPhoneMask(currentPhone));
  }, [currentPhone, setValue]);

  async function onSubmit(data: PatientData) {
    setSaving(true);
    await updatePatient(patient.id, data);
    setSaving(false);
    onClose();
  }

  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {patient.name ? `Editando ${patient.name}` : "Editando paciente"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex h-fit gap-4 w-full flex-wrap">
            <InputBox>
              <Label htmlFor="name">Nome</Label>
              <Input
                placeholder="Nome"
                type={"text"}
                className="w-full min-w-20"
                id="name"
                {...register("name")}
              />

              {errors.name?.message && (
                <InputError>{errors.name?.message}</InputError>
              )}
            </InputBox>

            <InputBox>
              <Label htmlFor="email">email</Label>
              <Input
                placeholder="email"
                type={"email"}
                className="w-full min-w-20"
                id="email"
                {...register("email")}
                disabled
              />
            </InputBox>

            <InputBox>
              <Label htmlFor="phone">Telefone</Label>
              <Input
                placeholder="(12) 34567-8901"
                type={"tel"}
                className="w-full min-w-20"
                id="phone"
                {...register("phone")}
              />

              {errors.phone?.message && (
                <InputError>{errors.phone?.message}</InputError>
              )}
            </InputBox>

            <InputBox>
              <Label htmlFor="height">Data de nascimento</Label>
              <Input
                style={{
                  fontSize: "0.8rem",
                }}
                type="date"
                id="birthDate"
                value={new Date(currentBirthDate).toISOString().split("T")[0]}
                onChange={(e) => {
                  const dateValue = new Date(e.target.value);
                  if (!Number.isNaN(dateValue.getTime())) {
                    setValue("birthDate", dateValue);
                  }
                }}
                className="w-full min-w-20 text-xs"
              />
              {errors.birthDate?.message && (
                <InputError>{errors.birthDate?.message}</InputError>
              )}
            </InputBox>

            <InputBox>
              <Label htmlFor="height">Altura</Label>
              <Input
                placeholder="160"
                type={"number"}
                className="w-full min-w-20"
                id="height"
                {...register("height")}
              />
              {errors.height?.message && (
                <InputError>{errors.height?.message}</InputError>
              )}
            </InputBox>

            <InputBox>
              <Label htmlFor="weight">Peso</Label>
              <Input
                placeholder="60"
                type={"number"}
                className="w-full min-w-20"
                id="weight"
                {...register("weight")}
              />
            </InputBox>

            {errors.weight?.message && (
              <InputError>{errors.weight?.message}</InputError>
            )}
          </div>

          <DialogFooter>
            <DialogClose>
              <Button type="button" variant="destructive" onClick={onClose}>
                Cancelar
              </Button>
            </DialogClose>

            <Button disabled={saving} type="submit" variant="default">
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
