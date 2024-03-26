'use client";';
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { useFileUploaded } from "@/hooks/useFileUploaded";
import { resolvePath } from "@/lib/cdn";
import { FileTypeEnum, FileUploaded } from "@prisma/client";
import { ImageUp, Images, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function UploadCard({
  onSelect,
  close,
}: {
  close: () => void;
  onSelect: (file: string) => void;
}) {
  const [selectedFile, setSelectedFile] = useState<FileUploaded | null>(null);
  const { files, isLoading, refetch } = useFileUploaded();

  return (
    <div className="w-full">
      <div className="w-full">
        <h4 className="font-bold">Seus arquivos</h4>

        <div className="w-full max-w-full flex-wrap flex">
          {isLoading && <Loading />}

          {files?.map((file) => {
            return (
              <div
                key={file.id}
                data-selected={selectedFile?.id === file.id}
                className="w-32 h-32 bg-gray-200 rounded-md m-2 data-[selected=true]:outline outline-offset-2 outline-accent cursor-pointer"
                onClick={() => {
                  setSelectedFile(file);
                }}
              >
                {file.type.includes("image") ? (
                  <Image
                    src={
                      resolvePath(file.key) ||
                      "https://blog.iprocess.com.br/wp-content/uploads/2021/11/placeholder.png"
                    }
                    alt={file.name}
                    className="w-full h-full object-cover rounded-md"
                    width={120}
                    height={120}
                  />
                ) : (
                  <video
                    src={resolvePath(file.key)}
                    className="w-full h-full object-cover rounded-md"
                  />
                )}
              </div>
            );
          })}
        </div>

        <UploadSection />
      </div>

      <div className="w-full flex justify-end items-center gap-2">
        <Button variant={"outline"} onClick={close}>
          Cancelar
        </Button>

        <Button
          disabled={!selectedFile}
          onClick={() => {
            if (selectedFile) {
              onSelect(selectedFile.key);
              close();
            }
          }}
        >
          Selecionar
        </Button>
      </div>
    </div>
  );
}

function UploadSection() {
  const [newFile, setNewFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const { progress, upload, refetch } = useFileUploaded();

  return (
    <>
      <hr className="my-4" />

      {!newFile && (
        <div
          onClick={() => {
            const input = document.getElementById("file-upload");
            if (input) {
              input.click();
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => {
            setDragging(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              setNewFile(e.dataTransfer.files[0]);
            }
          }}
          data-dragging={dragging}
          className="my-8 relative border text-muted data-[dragging=true]:border-accent data-[dragging=true]:border-2 border-dashed flex p-8 rounded-md items-center justify-center cursor-pointer"
        >
          <div className="w-fit ">
            <Images className="mx-auto" />
            <p>Arraste e solte arquivos aqui ou clique para selecionar</p>
          </div>

          <input
            type="file"
            accept={Object.values(FileTypeEnum).join(",")}
            className="absolute inset-0 w-0 h-0 opacity-0 cursor-pointer"
            id="file-upload"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setNewFile(e.target.files[0]);
              }
            }}
          />
        </div>
      )}

      {newFile && (
        <div className="my-4 w-fit flex flex-col mx-auto relative">
          <div className="w-32 h-32 bg-white rounded-md border border-muted p-2">
            {newFile.type.includes("image") ? (
              <Image
                src={URL.createObjectURL(newFile)}
                alt={newFile.name}
                className="w-full h-full object-cover rounded-md"
                width={120}
                height={120}
              />
            ) : (
              <video
                src={URL.createObjectURL(newFile)}
                className="w-full h-full object-cover rounded-md"
              />
            )}
          </div>

          <Trash
            className="absolute hover:text-destructive transition-colors right-[1px] top-[1px] cursor-pointer bg-white rounded-md p-1"
            onClick={() => {
              setNewFile(null);
            }}
          />

          <div className="mt-2 mx-auto flex">
            {progress > 0 ? (
              <div className="w-full">
                <div className="w-full bg-slate-200 h-2 rounded-md relative">
                  <div
                    className="bg-accent h-2 rounded-md"
                    style={{ width: `${progress}%` }}
                  />
                  <p className="mx-auto">{progress}%</p>
                </div>
              </div>
            ) : (
              <Button
                className="w-full gap-2 text-sx"
                variant={"outline"}
                onClick={async () => {
                  if (newFile) {
                    const type = newFile.type;

                    let fileType = null;

                    if (type.includes("video")) {
                      fileType = FileTypeEnum.video;
                    }
                    if (type.includes("image")) {
                      fileType = FileTypeEnum.image;
                    }

                    if (fileType) {
                      const response = await upload(newFile, fileType);

                      if (response) {
                        setNewFile(null);
                        refetch();
                      }
                    }
                  }
                }}
              >
                Enviar <ImageUp size={15} />
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
