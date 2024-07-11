"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { fisioFetcher } from "@/hooks/Apis";
import { useUserData } from "@/hooks/useUserData";
import { resolvePath } from "@/lib/cdn";
import { cn } from "@/lib/utils";
import { FileTypeEnum } from "@prisma/client";
import { DialogClose } from "@radix-ui/react-dialog";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { UploadCard } from "../organisms/uploadCard";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export function ProfileImage({
  className,
  editable = false,
}: {
  className?: string;
  editable?: boolean;
}) {
  const { userData, refetch } = useUserData();

  const [currentImage, setCurrentImage] = useState<string | null>();

  return (
    <Dialog>
      <DialogTrigger disabled={!editable}>
        <Avatar className={cn("w-20 h-20", className)}>
          <AvatarImage src={resolvePath(userData?.image || "")} />
          <AvatarFallback>
            {userData?.name?.split(" ")[0][0]}
            {userData?.name?.split(" ")[1][0]}
          </AvatarFallback>
        </Avatar>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Altere sua imagem de perfil</DialogTitle>
          <DialogDescription>
            Faça upload de uma nova imagem ou escolha uma das opções abaixo.
          </DialogDescription>
        </DialogHeader>

        <div className="my-4 flex items-center mx-auto gap-2">
          <Avatar className="w-20 h-20">
            <AvatarImage src={resolvePath(userData?.image || "")} />
            <AvatarFallback>
              {userData?.name?.split(" ")[0][0]}
              {userData?.name?.split(" ")[1][0]}
            </AvatarFallback>
          </Avatar>
          {currentImage && (
            <>
              <ArrowRight className="w-8 h-8" />
              <Avatar className="w-20 h-20">
                <AvatarImage src={resolvePath(currentImage || "")} />
                <AvatarFallback>
                  {userData?.name?.split(" ")[0][0]}
                  {userData?.name?.split(" ")[1][0]}
                </AvatarFallback>
              </Avatar>
            </>
          )}
        </div>
        <UploadCard
          onSelect={(file) => {
            setCurrentImage(file);
          }}
          selected={currentImage || null}
          type={FileTypeEnum.image}
          close={() => {
            /*  setContent(ContentEnum.BASIC); */
          }}
        />
        <DialogFooter className="w-full flex justify-center">
          {userData?.image !== currentImage && currentImage && (
            <DialogClose>
              <Button
                onClick={() => {
                  fisioFetcher({
                    url: `/users/${userData?.id}`,
                    method: "PATCH",
                    data: { image: currentImage },
                    callback: () => {
                      refetch();
                    },
                    onError: (e) => {
                      toast.error(e);
                    },
                  });
                }}
                type="submit"
              >
                Salvar
              </Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
