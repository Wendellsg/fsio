import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { MouseEvent, useEffect, useState } from "react";

export const ProgressBar: React.FC<{
  progress: number;
  className?: string;
  onSeek?: (percentage: number) => void;
  playerRef: React.RefObject<HTMLVideoElement>;
}> = ({ progress: initialProgress, onSeek, className, playerRef }) => {
  const [progress, setProgress] = useState(initialProgress);

  useEffect(() => {
    const player = playerRef?.current;
    if (!player) return;

    const onTimeUpdate = () => {
      const progress = (player.currentTime / player.duration) * 100;
      setProgress(progress);
    };

    player.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      player.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [playerRef, onSeek]);

  const getPercentageOnClick = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    const rect = (e.target as HTMLElement)?.getBoundingClientRect();
    const x = e.clientX - rect.left; //x position within the element.
    const percentage = (x / rect.width) * 100;
    return percentage;
  };

  return (
    <div
      onClick={(e) => {
        onSeek && onSeek(getPercentageOnClick(e));
      }}
      style={
        onSeek && {
          cursor: "pointer",
        }
      }
      className={cn(`flex justify-start items-center w-full gap-4 `, className)}
    >
      <Progress value={progress} className="w-full h-2" />
    </div>
  );
};
