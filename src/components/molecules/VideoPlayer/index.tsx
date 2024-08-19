"use client";
import { resolvePath } from "@/lib/cdn";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AiOutlinePauseCircle, AiOutlinePlayCircle } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";
import { ProgressBar } from "../ProgressBar";

export type VideoPlayerProps = {
  backUrl?: string;
  videoName?: string;
  name: string;
  video: string;
  image: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  backUrl = "/",
  videoName,
  video,
  image,
  className = "",
  ...props
}) => {
  const $videoRef = useRef<HTMLVideoElement>(null);
  const Player = $videoRef.current;
  const playing = !Player?.paused;
  const [playerPressed, setPlayerPressed] = useState(true);
  const currentTime = Player?.currentTime || 0;

  useEffect(() => {
    if (playing) {
      setPlayerPressed(false);
    }
  }, [playing]);

  useEffect(() => {
    if (Player) {
      Player.onended = () => {
        Player.currentTime = 0;
        Player.pause();
      };
    }
  }, [Player]);

  const fixTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    if (seconds < 10) {
      return `${minutes}:0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  };
  return (
    <div
      className={cn("relative overflow-hidden w-full md:rounded-md", className)}
      {...props}
    >
      <video
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          objectFit: "cover",
        }}
        ref={$videoRef}
        poster={resolvePath(image)}
        src={resolvePath(video)}
      />

      <div
        className={`w-full h-full bg-black/50 absolute flex items-center justify-between flex-col p-8 top-0 left-0 ${
          !playerPressed && playing ? "fadeOut" : "show"
        }`}
        onClick={() => setPlayerPressed(!playerPressed)}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {backUrl && (
            <Link href={backUrl} passHref>
              <IoMdArrowBack size={30} className="text-accent cursor-pointer" />
            </Link>
          )}
          {videoName && <h2 className="text-primary text-md">{videoName}</h2>}
        </div>

        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          {!playing ? (
            <AiOutlinePlayCircle
              size={50}
              className="cursor-pointer text-primary"
              onClick={() => [Player?.play()]}
            />
          ) : (
            <AiOutlinePauseCircle
              size={50}
              className="cursor-pointer text-primary"
              onClick={() => [Player?.pause()]}
            />
          )}
        </div>
        <div className="flex justify-between w-full items-center h-fit gap-2">
          <div className="bg-primary text-sm font-bold py-1 px-2 rounded-md ">
            {fixTime(currentTime)}
          </div>
          <ProgressBar
            progress={(currentTime / (Player?.duration || 0)) * 100}
            onSeek={(percentage) => {
              if (Player) {
                Player.currentTime = (Player.duration * percentage) / 100;
              }
            }}
            playerRef={$videoRef}
            className="w-full h-1 rounded-sm"
          />
          <div className="bg-primary text-sm font-bold py-1 px-2 rounded-md ">
            {fixTime(Player?.duration || 0)}
          </div>
        </div>
      </div>
    </div>
  );
};
