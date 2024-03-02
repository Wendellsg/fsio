"use client";
import { useUploader } from "@/hooks/useUploader/useUploader";
import { useUserData } from "@/hooks/useUserData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Loading from "@/components/LoadingIcon";
import { Select } from "@/components/molecules/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input, InputBox, InputError } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Role } from "@/types";
import { UserUpdateData, userDataSchema } from "@/utils/zod-schemas";

export default function EditProfilePage() {
  const { upload } = useUploader();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const router = useRouter();
  const { userData, updateUserProfileImage, updateUserProfileData, isLoading } =
    useUserData();

  const { register, handleSubmit, setValue, watch, formState } =
    useForm<UserUpdateData>({
      resolver: zodResolver(userDataSchema),
      defaultValues: userData || {},
    });

  useEffect(() => {
    if (userData) {
      for (const key in userData) {
        setValue(key as keyof UserUpdateData, userData[key]);
      }
    }
  }, [userData, setValue]);

  const { errors } = formState;

  const [imageUrl, setImageUrl] = useState<string | null>(
    userData?.image || null
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target?.files?.[0];
    setImageFile(file);
    if (!file) return;
    const url = URL?.createObjectURL(file);
    setImageUrl(url);
  };

  useEffect(() => {
    if (userData?.image) setImageUrl(userData?.image);
  }, [userData?.image]);
  if (isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loading />
      </div>
    );

  return (
    <div className="w-full md:max-w-screen-md mx-auto flex flex-col-reverse md:flex-row md:items-start md:justify-center items-center justify-between gap-4  p-4 ">
      <form
        onSubmit={handleSubmit(updateUserProfileData)}
        className="max-w-full flex"
      >
        <div className="flex flex-col w-full gap-4">
          <h2 className="font-bold">Dados pessoais</h2>

          <div className="flex w-full flex-wrap gap-4">
            <InputBox>
              <Label htmlFor="name">
                Nome <span className="text-red-500">*</span>
              </Label>

              <Input
                name="name"
                id="name"
                type={"text"}
                placeholder="Digite seu nome"
                register={register}
              />

              <InputError>{errors?.name?.message}</InputError>
            </InputBox>

            <InputBox>
              <Label htmlFor="email">E-mail</Label>
              <Input
                name="email"
                id="email"
                type={"text"}
                placeholder="Digite seu e-mail"
                register={register}
                disabled
              />

              <InputError>{errors?.email?.message}</InputError>
            </InputBox>
          </div>
          <div className="flex w-full flex-wrap gap-4">
            <InputBox>
              <Label htmlFor="birthDate">Data de nascimento</Label>

              <Input
                name="birthDate"
                id="birthDate"
                type={"date"}
                placeholder="Sua data de nascimento"
                register={register}
              />
              <InputError>{errors?.birthDate?.message}</InputError>
            </InputBox>
            <InputBox>
              <Label htmlFor="phone">Telefone</Label>
              <Input
                name="phone"
                id="phone"
                type={"text"}
                placeholder="Seu telefone"
                register={register}
              />
              <InputError>{errors?.phone?.message}</InputError>
            </InputBox>
          </div>

          <div className="flex w-full flex-wrap gap-4">
            <InputBox>
              <Label htmlFor="height">Altura</Label>

              <Input
                name="height"
                id="height"
                type={"number"}
                placeholder="Sua altura em cm"
                register={register}
              />
              <InputError>{errors?.height?.message}</InputError>
            </InputBox>
            <InputBox>
              <Label htmlFor="weight">Peso</Label>
              <Input
                name="weight"
                id="weight"
                type={"number"}
                placeholder="Seu peso em kg"
                register={register}
              />
              <InputError>{errors?.weight?.message}</InputError>
            </InputBox>
          </div>

          <div className="flex w-full flex-wrap gap-4">
            <InputBox>
              <Label htmlFor="zipCode">CEP</Label>
              <Input
                id="zipCode"
                name="zipCode"
                type={"text"}
                placeholder="Seu CEP"
                register={register}
              />
              <InputError>{errors?.zipCode?.message}</InputError>
            </InputBox>

            <InputBox>
              <Label htmlFor="address">Rua</Label>
              <Input
                name="address"
                id="address"
                type={"text"}
                placeholder="Sua rua"
                register={register}
              />
              <InputError>{errors?.address?.message}</InputError>
            </InputBox>
          </div>

          <div className="flex w-full flex-wrap gap-4">
            <InputBox>
              <Label htmlFor="addressNumber">Número</Label>
              <Input
                name="addressNumber"
                id="addressNumber"
                type={"text"}
                placeholder="Número da sua casa"
                register={register}
              />
              <InputError>{errors?.addressNumber?.message}</InputError>
            </InputBox>

            <InputBox>
              <Label htmlFor="addressComplement">Complemento</Label>
              <Input
                id="addressComplement"
                name="addressComplement"
                type={"text"}
                placeholder="Apto, bloco, etc."
                register={register}
              />
              <InputError>{errors?.addressComplement?.message}</InputError>
            </InputBox>
          </div>

          <div className="flex w-full flex-wrap gap-4">
            <InputBox>
              <Label htmlFor="addressNeighborhood">Bairro</Label>
              <Input
                name="addressNeighborhood"
                id="addressNeighborhood"
                type={"text"}
                placeholder="Seu bairro"
                register={register}
              />
              <InputError>{errors?.addressNeighborhood?.message}</InputError>
            </InputBox>

            <InputBox>
              <Label htmlFor="addressCity">Cidade</Label>
              <Input
                name="addressCity"
                id="addressCity"
                type={"text"}
                placeholder="Sua cidade"
                register={register}
              />
              <InputError>{errors?.addressCity?.message}</InputError>
            </InputBox>
          </div>

          <div className="flex w-full flex-wrap gap-4">
            <InputBox>
              <Label htmlFor="addressState">Estado</Label>
              <Input
                id="addressState"
                name="addressState"
                type={"text"}
                placeholder="Seu estado"
                register={register}
              />
              <InputError>{errors?.addressState?.message}</InputError>
            </InputBox>

            <InputBox>
              <Label htmlFor="addressCountry">País</Label>
              <Input
                id="addressCountry"
                name="addressCountry"
                type={"text"}
                placeholder="Seu país"
                register={register}
              />
              <InputError>{errors?.addressCountry?.message}</InputError>
            </InputBox>
          </div>

          <div className="flex w-full items-center gap-2">
            <Switch
              name="isProfessional"
              checked={watch("role") === Role.PROFESSIONAL}
              id="isProfessional"
              onCheckedChange={(value) => {
                setValue("role", value ? Role.PROFESSIONAL : Role.PATIENT);
              }}
            />

            <Label htmlFor="isProfessional">
              Você é profissional da saúde?
            </Label>
          </div>

          {watch("role") === Role.PROFESSIONAL && (
            <>
              <h2 color="black" style={{ marginTop: "2rem" }}>
                Dados Profissionais
              </h2>

              <div className="flex w-full flex-wrap gap-4">
                <Select
                  /*  label="Profissão" */
                  value={(watch("profession") && watch("profession")) || ""}
                  options={[
                    { value: "Fisioterapeura", label: "Fisioterapeura" },
                    {
                      value: "Teraupeuta Ocupacional",
                      label: "Teraupeuta Ocupacional",
                    },
                    { value: "Educador Físico", label: "Educador Físico" },
                  ]}
                  onChange={(value) => {
                    setValue("profession", value);
                  }}
                  placeholder="Profissão"
                  /*  error={errors?.profession?.message} */
                />

                <InputBox>
                  <Label htmlFor="professionalLicense">
                    Crefito ou Cref <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="professionalLicense"
                    name="professionalLicense"
                    type={"text"}
                    placeholder="Crefito ou Cref"
                    register={register}
                  />
                  <InputError>
                    {errors?.professionalLicense?.message}
                  </InputError>
                </InputBox>
              </div>

              <div>
                <InputBox>
                  <Label htmlFor="professionalLicenseState">
                    Estado do Crefito ou Cref{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="professionalLicenseState"
                    name="professionalLicenseState"
                    type={"text"}
                    placeholder="Digite o estado"
                    register={register}
                  />
                  <InputError>
                    {errors?.professionalLicenseState?.message}
                  </InputError>
                </InputBox>
              </div>
              <div className="w-full">
                <InputBox>
                  <Label htmlFor="introduction">Experiência profissional</Label>
                  <Textarea
                    id="introduction"
                    placeholder="Resuma sua experiência profissional"
                    {...register("introduction")}
                  />
                  <InputError>{errors?.introduction?.message}</InputError>
                </InputBox>
              </div>
            </>
          )}

          <div className="flex w-full gap-4">
            <Button
              variant="outline"
              onClick={() => {
                router.back();
              }}
            >
              Voltar
            </Button>
            <Button type="submit" onClick={handleSubmit(updateUserProfileData)}>
              Salvar
            </Button>
          </div>
        </div>
      </form>
      <div className="flex flex-col gap-4 justify-center items-center min-h-fit mt-4 mx-auto md:mx-0 md:ml-auto">
        <Avatar className="w-32 h-32">
          <AvatarImage src={imageUrl || ""} />
          <AvatarFallback>
            {userData?.name?.split(" ")[0]?.[0]}
            {userData?.name?.split(" ")[1]?.[0]}
          </AvatarFallback>
        </Avatar>

        {imageUrl !== userData?.image ? (
          <>
            <Button
              type="submit"
              onClick={async () => {
                if (imageFile) {
                  const url = await upload(imageFile);

                  if (url) {
                    updateUserProfileImage(url);
                  }
                }
              }}
            >
              Salvar
            </Button>

            <Button
              onClick={async () => {
                setImageUrl(userData?.image || null);
                setImageFile(null);
              }}
              variant={"outline"}
            >
              Cancelar
            </Button>
          </>
        ) : (
          <Button className="cursor-pointer">
            <label htmlFor="image" className="cursor-pointer">
              Alterar foto
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </Button>
        )}
      </div>
    </div>
  );
}
