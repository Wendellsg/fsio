'use client";';
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { useFileUploaded } from "@/hooks/useFileUploaded";
import { resolvePath } from "@/lib/cdn";
import { FileTypeEnum, FileUploaded } from "@prisma/client";
import { ImageIcon, ImageUp, Images, Trash, Video } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function UploadCard({
  onSelect,
  close,
  selected,
  type,
}: {
  close: () => void;
  onSelect: (file: string) => void;
  selected?: string | null;
  type: FileTypeEnum;
}) {
  const [selectedFile, setSelectedFile] = useState<FileUploaded | null>(null);
  const { files, isLoading, refetch } = useFileUploaded();

  function playVideo(key: string) {
    const video = document.getElementById(key) as HTMLVideoElement;

    if (video) {
      video.play();
    }
  }

  function stopVideo(key: string) {
    const video = document.getElementById(key) as HTMLVideoElement;

    if (video) {
      //Back to the beginning
      video.currentTime = 0;
      video.pause();
    }
  }

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
                data-prevSelected={selected === file.key}
                data-disabled={file.type !== type}
                className="w-32 relative h-32 bg-gray-200 rounded-md m-2 data-[selected=true]:outline-accent data-[prevSelected=true]:outline-sky/50 outline outline-offset-2 outline-transparent cursor-pointer data-[disabled=true]:bg-gray-400 data-[disabled=true]:opacity-50 transition-colors duration-300 ease-in-out"
                onClick={() => {
                  if (file.type === type) {
                    if (selectedFile?.id === file.id) {
                      setSelectedFile(null);
                      return;
                    }

                    setSelectedFile(file);
                  }
                }}
              >
                {file.type.includes("image") ? (
                  <Image
                    src={resolvePath(file.key)}
                    alt={file.name}
                    className="w-full h-full object-cover rounded-md "
                    width={120}
                    height={120}
                  />
                ) : (
                  <video
                    id={file.key}
                    data-disabled={file.type !== type}
                    src={resolvePath(file.key)}
                    className="w-full h-full object-cover rounded-md"
                    onMouseOver={() => playVideo(file.key)}
                    onMouseOut={() => stopVideo(file.key)}
                  />
                )}

                <div className="absolute bg-gray-400 text-white text-xs p-1 rounded-full right-1 bottom-2">
                  {file.type === FileTypeEnum.image ? (
                    <ImageIcon size={15} />
                  ) : (
                    <Video size={15} />
                  )}
                </div>
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
