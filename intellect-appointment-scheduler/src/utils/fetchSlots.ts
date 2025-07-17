import type { Slot } from "../types/Slot";

export const fetchSlots = async (): Promise<Slot[]> => {
  try {
    const res = await fetch("./data/slots.json");

    if (!res.ok) {
      throw new Error(`Failed to load slots: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching slots:", error);
    throw error;
  }
};