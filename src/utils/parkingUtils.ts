import { TimeElapsed } from "../types";

export const formatTime = (date: string): string =>
  new Date(date).toLocaleString();

export const calculateTimeElapsed = (entryTime: string): TimeElapsed => {
  const now = new Date();
  const entry = new Date(entryTime);
  const diffMs = now.getTime() - entry.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const hours = Math.floor(diffSeconds / 3600);
  const minutes = Math.floor((diffSeconds % 3600) / 60);
  const seconds = diffSeconds % 60;
  return { hours, minutes, seconds, totalSeconds: diffSeconds };
};

export const calculateBill = (entryTime: string, exitTime?: string): number => {
  const exit = exitTime ? new Date(exitTime) : new Date();
  const entry = new Date(entryTime);
  const diffMs = exit.getTime() - entry.getTime();
  const totalSeconds = Math.floor(diffMs / 1000);
  if (totalSeconds <= 30) return 5;
  const additionalSeconds = totalSeconds - 30;
  const additionalIntervals = Math.ceil(additionalSeconds / 10);
  return 5 + additionalIntervals;
};
