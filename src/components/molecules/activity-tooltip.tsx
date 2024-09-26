import { THEME } from "@/constants/theme";
import type { Activity } from "@prisma/client";
/* eslint-disable @next/next/no-img-element */
import { format } from "date-fns";
import type {
  NameType,
  Payload,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

export const activitiesColors = {
  pain: THEME.colors.orange,
  effort: THEME.colors.sky,
};

export const ActivityToolTip = ({
  active,
  payload,
}: {
  active: boolean;
  payload: Payload<ValueType, NameType>[] | undefined;
  label: string;
}) => {
  if (!active || !payload?.length) return null;

  const activity: Activity = payload[0]?.payload;

  return (
    <div className="flex w-48 border rounded-md bg-white p-4 border-slate-50 gap-4 flex-col">
      <div>
        <p className="text-xs font-bold">Data</p>
        <p className="text-sm font-bold text-slate-600">
          {format(new Date(activity?.date), "dd/MM/yyyy - HH:mm")}
        </p>
      </div>

      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div
              className="p-2 rounded-full"
              style={{
                backgroundColor: activitiesColors.pain,
              }}
            >
              <img
                src="/assets/pain.png"
                style={{
                  width: "15px",
                  height: "15px",
                }}
                alt="Esforço"
              />
            </div>
            <p className="font-bold text-md">{activity?.painLevel}</p>
          </div>
          <div
            className="p-2 rounded-full"
            style={{
              backgroundColor: activitiesColors.effort,
            }}
          >
            <img
              src="/assets/strength.png"
              style={{
                width: "15px",
                height: "15px",
              }}
              alt="Esforço"
            />
          </div>
          <p className="font-bold text-md">{activity?.effortLevel}</p>
        </div>
      </div>

      {activity?.comments && (
        <div>
          <p className="font-bold text-xs">Comentário</p>
          <p className="font-bold text-sm whitespace-nowrap max-w-40 overflow-hidden text-ellipsis text-slate-600">
            {activity?.comments}
          </p>
        </div>
      )}
    </div>
  );
};
