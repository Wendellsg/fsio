"use client";
import { AiFillHeart } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";

import { fisioFetcher } from "@/hooks/Apis";
import { useQuery } from "@tanstack/react-query";
import { DashboardBadge } from "./Badge";
export type ProfessionalDashBoardDto = {
  patients: number;
  appointments: number;
  routines: number;
};

export function HomeDashboardBadges() {
  const { data: professionalDashboardData } = useQuery({
    queryFn: async () => {
      return await fisioFetcher<ProfessionalDashBoardDto>({
        url: "/analytics/professional-dashboard",
        method: "GET",
      });
    },
    queryKey: ["professionalDashboardData"],
    staleTime: 1000 * 60 * 10,
  });

  return (
    <div className="w-full flex flex-col p-4 gap-8">
      <h2 className="font-bold text-lg">Você tem</h2>
      <div className="w-full flex flex-wrap gap-4">
        <DashboardBadge
          title="Pacientes Cadastrados"
          value={professionalDashboardData?.patients || 0}
          icon={<BsFillPeopleFill size={30} color="#000" />}
        />

        <DashboardBadge
          title="Rotinas Prescritas"
          value={professionalDashboardData?.routines || 0}
          icon={<AiFillHeart size={30} color="#000" />}
        />

        <DashboardBadge
          title="Consultas marcadas"
          value={professionalDashboardData?.appointments || 0}
          icon={<FaClipboardList size={30} color="#000" />}
        />
      </div>
    </div>
  );
}
