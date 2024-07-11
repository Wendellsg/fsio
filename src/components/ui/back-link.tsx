"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackLink({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <button className={cn("", className)}>
      <ArrowLeft size={24} onClick={() => router.back()} />
    </button>
  );
}
