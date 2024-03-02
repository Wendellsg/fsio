"use client";

import { createContext, useContext } from "react";

const DateContext = createContext<{
  date: Date;
}>({
  date: new Date(),
});

export const DateProvider: React.FC<{
  date: Date;
  children: React.ReactNode;
}> = ({ children, date }) => {
  return (
    <DateContext.Provider value={{ date }}>{children}</DateContext.Provider>
  );
};

export function useDate() {
  const { date } = useContext(DateContext);

  return { date };
}
