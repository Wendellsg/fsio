"use client";
import { fisioFetcher } from "@/hooks/Apis";
import { Heart } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function LeadForm() {
  const [email, setEmail] = useState("");
  const [sended, setSended] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    fisioFetcher({
      url: "/leads",
      method: "POST",
      data: { email },
      callback: () => {
        setSended(true);
      },
    });
  }

  if (sended)
    return (
      <>
        <Heart className="w-20 mt-8 h-20 text-accent mx-auto" />
        <p className="text-center text-lg font-bold">
          E-mail cadastrado com sucesso!
        </p>
      </>
    );

  return (
    <form className="flex flex-col gap-4 w-full mt-4" onSubmit={handleSubmit}>
      <Label htmlFor="email" className="text-sm font-bold">
        E-mail
      </Label>
      <Input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        type="submit"
        className="w-full p-2 bg-accent text-white font-bold rounded-md"
      >
        Enviar
      </Button>
    </form>
  );
}
