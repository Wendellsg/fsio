import { HomeDashboardBadges } from "@/components/organisms/HomeDashboardBadges";
import { DashBoardAppointments } from "@/components/organisms/dashboardAppointments";
import { DashboardPatients } from "@/components/organisms/dashboardPatients";
import { Greeter } from "@/components/ui/greeter";
import { ProfileMenu } from "@/components/ui/profile-menu";
import { DateProvider } from "@/contexts/date-context";

export default function HomePage() {
  return (
    <div className="flex flex-col justify-between w-full gap-8 max-w-full overflow-y-auto overflow-x-hidden">
      <div className="w-full justify-between md:p-4">
        <div className="flex w-full items-start justify-between p-4 md:p-0">
          <Greeter />

          <ProfileMenu />
        </div>

        <HomeDashboardBadges />

        <div className="mt-8">
          <h2 className="max-w-fit ml-4 bg-accent p-2 rounded-xl font-bold">
            Últimos Pacientes
          </h2>

          <DashboardPatients />
        </div>

        <div className="flex flex-col gap-4 max-w-full">
          <h2 className="max-w-fit ml-4 bg-accent p-2 rounded-xl font-bold">
            Próximas consultas
          </h2>

          <DateProvider date={new Date()}>
            <DashBoardAppointments />
          </DateProvider>
        </div>
      </div>
    </div>
  );
}
