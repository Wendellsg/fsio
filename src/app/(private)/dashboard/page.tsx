import HomeDashboardBadges from "@/components/organisms/HomeDashboardBadges";
import {
  AppointmentsSkeleton,
  DashBoardAppointments,
} from "@/components/organisms/dashboardAppointments";
import {
  DashboardPatients,
  DashboardPatientsSkeleton,
} from "@/components/organisms/dashboardPatients";
import { Greeter } from "@/components/ui/greeter";
import { ProfileMenu, ProfileMenuSkeleton } from "@/components/ui/profile-menu";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <div className="flex flex-col justify-between w-full gap-8 max-w-full overflow-y-auto overflow-x-hidden">
      <div className="w-full justify-between md:p-4">
        <div className="flex w-full items-start justify-between p-4 md:p-0">
          <Greeter />

          <Suspense fallback={<ProfileMenuSkeleton />}>
            {/* @ts-expect-error Async Server Component */}
            <ProfileMenu />
          </Suspense>
        </div>

        <Suspense fallback={""}>
          {/* @ts-expect-error Async Server Component */}
          <HomeDashboardBadges />
        </Suspense>

        <div className="mt-8">
          <h2 className="max-w-fit ml-4 bg-accent p-2 rounded-xl font-bold">
            Últimos Pacientes
          </h2>
          <Suspense fallback={<DashboardPatientsSkeleton />}>
            {/* @ts-expect-error Async Server Component */}
            <DashboardPatients />
          </Suspense>
        </div>

        <div className="flex flex-col gap-4 max-w-full">
          <h2 className="max-w-fit ml-4 bg-accent p-2 rounded-xl font-bold">
            Próximas consultas
          </h2>
          <Suspense fallback={<AppointmentsSkeleton />}>
            {/* @ts-expect-error Async Server Component */}
            <DashBoardAppointments />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
