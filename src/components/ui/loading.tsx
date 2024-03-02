import { cn } from "@/lib/utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
export function Loading({
  color,
  size = 35,
  className,
}: {
  color?: string;
  size?: number;
  className?: string;
}) {
  return (
    <AiOutlineLoading3Quarters
      className={cn("animate-spin", className)}
      size={size}
    />
  );
}
