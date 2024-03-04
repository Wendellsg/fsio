/* "use client";
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
import { UserUpdateData, userDataSchema } from "@/utils/zod-schemas"; */

export default function EditProfilePage() {
  /*   const { upload } = useUploader();
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
    ); */

  return <></>;
}
