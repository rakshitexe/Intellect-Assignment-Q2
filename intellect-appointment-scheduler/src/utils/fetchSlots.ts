import type { Slot } from "../types/Slot";

export const fetchSlots = async (): Promise<Slot[]> => {
  const res = await fetch("./data/slots.json");

  if (!res.ok) {
    throw new Error("Failed to load slots");
  }

  return res.json();
};
