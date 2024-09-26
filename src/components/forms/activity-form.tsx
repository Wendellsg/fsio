/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { useActivities } from "@/hooks/useActivities";
import { cn } from "@/lib/utils";
import { queryClient } from "@/providers";
import type { Routine } from "@prisma/client";
import { PopoverContent } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { CalendarIcon, Plus } from "lucide-react";
import { useState } from "react";
import { activitiesColors } from "../molecules/activities";

export function ActivityForm({ routine }: { routine: Routine }) {
  const [show, setShow] = useState<boolean>(false);
  const [newActivity, setNewActivity] = useState({
    effortLevel: 1,
    painLevel: 1,
    comments: "",
    date: new Date(),
    routineId: routine.id,
  });

  const [creating, setCreating] = useState<boolean>(false);

  const { createActivity } = useActivities();

  async function handleCreateActivity() {
    setCreating(true);
    await createActivity({
      routine,
      ...newActivity,
    });

    setNewActivity({
      effortLevel: 1,
      painLevel: 1,
      comments: "",
      date: new Date(),
      routineId: routine.id,
    });

    queryClient.invalidateQueries({
      queryKey: ["patientData", routine.userId],
    });
    setCreating(false);

    setShow(false);
  }

  if (!show)
    return (
      <Button
        type="button"
        variant="default"
        onClick={() => setShow(true)}
        className="flex gap-2"
      >
        Nova atividade <Plus />
      </Button>
    );

  return (
    <div className="flex flex-col gap-4 w-full mt-8 border-t-2 pt-4">
      <h2 className="text-md p-2 bg-primary font-bold rounded-md w-fit">
        Novo registro de atividade
      </h2>
      <div className="flex flex-col gap-4 w-full mt-8">
        <div className="flex gap-2 flex-col w-full">
          <div>
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

          <div className="w-full flex items-center justify-between gap-4">
            <Slider
              defaultValue={[newActivity.effortLevel]}
              min={1}
              max={10}
              step={1}
              onValueChange={(value) =>
                setNewActivity((prev) => {
                  return { ...prev, effortLevel: value[0] };
                })
              }
            />

            <span>{newActivity.effortLevel}</span>
          </div>
        </div>
        <div className="flex gap-2 flex-col w-full">
          <div>
            <div className="gap-4 flex items-center">
              <div
                className="p-2 rounded-full"
                style={{
                  backgroundColor: activitiesColors.pain,
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
                  color: activitiesColors.pain,
                }}
                className="font-bold text-sm whitespace-nowrap"
              >
                - Nível de Dor
              </p>
            </div>
          </div>

          <div className="w-full flex items-center justify-between gap-4">
            <Slider
              defaultValue={[newActivity.painLevel]}
              min={1}
              max={10}
              step={1}
              onValueChange={(value) =>
                setNewActivity((prev) => {
                  return { ...prev, painLevel: value[0] };
                })
              }
            />

            <span>{newActivity.painLevel}</span>
          </div>
        </div>

        <label className="font-bold text-sm" htmlFor="date">
          Data
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              id="date"
              className={cn(
                "w-[240px] pl-3 text-left font-normal",
                !newActivity.date && "text-muted-foreground"
              )}
            >
              {newActivity.date ? (
                format(newActivity.date, "PPP")
              ) : (
                <span>Selecione uma data</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              className="bg-card border rounded-lg"
              mode="single"
              selected={newActivity.date}
              onSelect={(date) =>
                setNewActivity((prev) => {
                  if (!date) return prev;
                  return { ...prev, date };
                })
              }
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <label className="font-bold text-sm" htmlFor="time">
          Horário
        </label>

        <input
          type="time"
          value={new Date(newActivity.date)
            .toISOString()
            .split("T")[1]
            .split(".")[0]
            .slice(0, 5)}
          className="picker"
          onChange={(e) =>
            setNewActivity((prev) => {
              const time = new Date(
                `${new Date(newActivity.date).toISOString().split("T")[0]}T${
                  e.target.value
                }`
              );

              return { ...prev, date: time };
            })
          }
        />

        <div className="flex flex-col gap-2 w-full">
          <label className="font-bold text-sm" htmlFor="comments">
            Comentários
          </label>
          <textarea
            name="comments"
            id="comments"
            className="p-2 rounded-md border border-gray-300"
            value={newActivity.comments}
            onChange={(e) =>
              setNewActivity((prev) => {
                return { ...prev, comments: e.target.value };
              })
            }
          />
        </div>
      </div>
      <div className="flex w-full justify-center gap-2">
        <Button type="button" variant="outline" onClick={() => setShow(false)}>
          Cancelar
        </Button>

        <Button
          type="button"
          variant="default"
          disabled={creating}
          onClick={handleCreateActivity}
        >
          {creating ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </div>
  );
}
