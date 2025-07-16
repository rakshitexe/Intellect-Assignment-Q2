import type { Slot } from "../types/Slot";

export type GroupedSlots = Record<string, Slot[]>;

export function groupSlotsByDate(slots: Slot[]): GroupedSlots {
  return slots.reduce((acc: GroupedSlots, slot) => {
    const date = slot.displayDate;
    if (!acc[date]) acc[date] = [];
    acc[date].push(slot);
    return acc;
  }, {});
}
