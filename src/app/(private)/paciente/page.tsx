import { Greeter } from "@/components/ui/greeter";
import { ProfileMenu } from "@/components/ui/profile-menu";

export default function RootPage() {
  return (
    <div className="flex flex-col justify-between w-full gap-8 max-w-full overflow-y-auto overflow-x-hidden">
      <div className="w-full justify-between md:p-4">
        <div className="flex w-full items-start justify-between p-4 md:p-0">
          <Greeter />

          <ProfileMenu />
        </div>
      </div>
    </div>
  );
}
