import { atom } from "jotai";
import { Activity, Exercise } from "../types";

export const exercisesAtom = atom<Exercise[]>([]);
export const exerciseAtom = atom<Exercise>({} as Exercise);
export const activityAtom = atom<Activity>({} as Activity);
export const activitiesAtom = atom<Activity[]>([]);
export const patientActivitiesAtom = atom<Activity[]>([]);
export const isAuthenticatedAtom = atom<boolean>(false);
export const tokenAtom = atom<string>("");
