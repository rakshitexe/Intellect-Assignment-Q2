import type { Slot } from "../types/Slot";

// Defines a type where keys are date strings and values are arrays of slots
export type GroupedSlots = Record<string, Slot[]>;

// Groups an array of slots by their displayDate property
export function groupSlotsByDate(slots: Slot[]): GroupedSlots {
  return slots.reduce((acc: GroupedSlots, slot) => {
    const date = slot.displayDate;

    // Initialize array for the date if not already present
    if (!acc[date]) acc[date] = [];

    // Add the current slot to the corresponding date group
    acc[date].push(slot);
    return acc;
  }, {});
}
