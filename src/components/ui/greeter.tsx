import { getSession } from "@/lib/auth.guard";

export const Greeter = () => {
  const session = getSession();

  return (
    <div className="flex flex-col">
      <>
        <h2 className="text-lg font-bold md:text-xl lg:text-2xl">Olá,</h2>
        <h2 className="text-lg font-bold md:text-xl lg:text-2xl">
          {session?.name}
        </h2>
      </>
    </div>
  );
};
