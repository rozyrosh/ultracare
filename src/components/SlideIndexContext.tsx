"use client";

import { createContext, useContext, type ReactNode } from "react";

type SlideIndexValue = {
  index: number;
  total: number;
};

const SlideIndexContext = createContext<SlideIndexValue | null>(null);

export function SlideIndexProvider({
  index,
  total,
  children,
}: {
  index: number;
  total: number;
  children: ReactNode;
}) {
  return (
    <SlideIndexContext.Provider value={{ index, total }}>
      {children}
    </SlideIndexContext.Provider>
  );
}

/** 1-based display index for the current slide order. */
export function useSlideIndex() {
  return useContext(SlideIndexContext)?.index ?? null;
}

export function useSlideTotal() {
  return useContext(SlideIndexContext)?.total ?? null;
}

export function useSlideNumber(fallback = "00") {
  const index = useSlideIndex();
  if (index == null) return fallback;
  return String(index).padStart(2, "0");
}
