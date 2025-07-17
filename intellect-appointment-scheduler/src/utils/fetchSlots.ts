// Import the Slot type definition
import type { Slot } from "../types/Slot";

// Fetches appointment slots from the local JSON file
export const fetchSlots = async (): Promise<Slot[]> => {
  try {
    const res = await fetch("./data/slots.json");

    // Throw an error if the response is not successful
    if (!res.ok) {
      throw new Error(`Failed to load slots: ${res.statusText}`);
    }

    // Parse and return the JSON data
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching slots:", error);
    throw error;
  }
};
