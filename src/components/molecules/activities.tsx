/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { THEME } from "@/constants/theme";
import { deleteActivity, useActivities } from "@/hooks/useActivities";
import { queryClient } from "@/providers";
import { format } from "date-fns";
import { Loader, Trash } from "lucide-react";
import { useState } from "react";
import { MdShowChart } from "react-icons/md";
import { Line, LineChart, Tooltip } from "recharts";
import { ActivityForm } from "../forms/activity-form";
import { ActivityToolTip } from "./activity-tooltip";
export const activitiesColors = {
  pain: THEME.colors.orange,
  effort: THEME.colors.sky,
};

export const Activities = ({ routineId }: { routineId: string }) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogTrigger asChild>
        <Button className="rounded-lg ">
          <MdShowChart size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {show && <ActivitiesList routineId={routineId} />}
      </DialogContent>
    </Dialog>
  );
};

function ActivitiesList({ routineId }: { routineId: string }) {
  const { activities, isLoading } = useActivities(routineId);

  const [showDetails, setShowDetails] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-start justify-start w-full h-full gap-4 p-4 overflow-y-auto">
      <h2 className="text-md p-2 bg-primary font-bold rounded-md">Histórico</h2>

      {isLoading && <Loader className="animate-spin" />}

      {!activities?.length ? (
        <p className="text-sm text-slate-600">Nenhuma atividade registrada</p>
      ) : (
        <>
          <div className="max-w-full overflow-x-hidden flex justify-center w-full rounded-md bg-gradient-to-b from-white to-gray-200 border border-gray-300 my-4 mx-auto">
            <LineChart
              width={500}
              height={300}
              data={activities}
              style={{
                paddingLeft: "20px",
                paddingRight: "20px",
                maxWidth: "100%",
              }}
            >
              <Tooltip
                content={({ active, payload, label }) => (
                  <ActivityToolTip
                    active={!!active}
                    payload={payload}
                    label={label}
                  />
                )}
              />
              <Line
                type="monotone"
                dataKey="effortLevel"
                stroke={activitiesColors.effort}
                activeDot={{ r: 8 }}
                strokeWidth={"3"}
              />
              <Line
                type="monotone"
                dataKey="painLevel"
                stroke={activitiesColors.pain}
                strokeWidth={"3"}
              />
            </LineChart>
          </div>
          <div className="flex gap-4 items-center w-full my-4 flex-wrap">
            <div className="gap-4 flex items-center">
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
                    minHeight: "15px",
                    minWidth: "15px",
                  }}
                  alt="Dor"
                />
              </div>
              <p
                style={{
                  color: activitiesColors.pain,
                }}
                className="font-bold text-sm whitespace-nowrap"
              >
                - Nível de dor
              </p>
            </div>
            <div className="gap-4 flex items-center">
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
                    minHeight: "15px",
                    minWidth: "15px",
                  }}
                  alt="Esforço"
                />
              </div>
              <p
                style={{
                  color: activitiesColors.effort,
                }}
                className="font-bold text-sm whitespace-nowrap"
              >
                - Nível de esforço
              </p>
            </div>
          </div>

          {showDetails && (
            <div className="flex flex-col min-h-fit w-ful mt-8 w-full">
              {activities.map((activity) => {
                return (
                  <div
                    key={activity.id}
                    className="flex flex-col w-full gap-2 my-4 border-b border-gray-300 group activity"
                  >
                    <div>
                      <p className="text-xs font-bold">Data</p>
                      <p className="text-sm font-bold text-slate-600">
                        {format(new Date(activity?.date), "dd/MM/yyyy - HH:mm")}
                      </p>
                    </div>

                    <div className="flex gap-4 w-full">
                      <div className="flex items-center gap-2">
                        <div
                          style={{
                            backgroundColor: activitiesColors.pain,
                          }}
                          className="p-2 rounded-full"
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
                        <p className="font-bold text-md">
                          {activity?.painLevel}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
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
                        <p className="font-bold text-md">
                          {activity?.effortLevel}
                        </p>
                      </div>

                      <div className="ml-auto">
                        <Button
                          onClick={async () => {
                            await deleteActivity(activity.id as string);
                            queryClient.invalidateQueries({
                              queryKey: ["activities", routineId],
                            });
                          }}
                          type="button"
                          variant={"ghost"}
                          className="group-hover:opacity-100 opacity-0"
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    </div>

                    {activity?.comments ? (
                      <div>
                        <p className="font-bold text-xs ">Comentário</p>
                        <p className="font-bold text-sm text-slate-600 mt-2">
                          {activity?.comments}
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-600 mt-2">
                        Nenhum comentário
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex w-full justify-center">
            <Button
              onClick={() => setShowDetails(!showDetails)}
              type="button"
              variant={"secondary"}
            >
              {showDetails ? "Ocultar detalhes" : "Mostrar detalhes"}
            </Button>
          </div>
        </>
      )}

      <ActivityForm routineId={routineId} />
    </div>
  );
}
