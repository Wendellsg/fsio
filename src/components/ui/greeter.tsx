"use client";

import { useUserData } from "@/hooks/useUserData";

export const Greeter = () => {
  const { userData } = useUserData();

  return (
    <div className="flex flex-col">
      <>
        <h2 className="text-lg font-bold md:text-xl lg:text-2xl">Olá,</h2>
        <h2 className="text-lg font-bold md:text-xl lg:text-2xl">
          {userData?.name}
        </h2>
      </>
    </div>
  );
};
