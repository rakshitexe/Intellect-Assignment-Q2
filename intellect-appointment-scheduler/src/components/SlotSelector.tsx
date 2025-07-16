import type { Slot } from "../types/Slot";
import SelectableCard from "./baseline-ui/SelectableCard";

interface Props {
  slots: Slot[];
  selectedSlot: Slot | null;
  onSelect: (slot: Slot) => void;
}

export const SlotSelector = ({ slots, selectedSlot, onSelect }: Props) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-800">
        Available time slots
      </h3>
      <p className="text-sm text-gray-400 font-semibold mb-4">
        Each session lasts for 30 minutes
      </p>

      <div className="flex flex-wrap gap-2">
        {slots.map((slot) => {
          const isSelected = selectedSlot?.startTimeUtc === slot.startTimeUtc;

          return (
            <SelectableCard
              key={slot.startTimeUtc}
              labelTop={slot.displayTime}
              isSelected={isSelected}
              onClick={() => onSelect(slot)}
            />
          );
        })}
      </div>
    </div>
  );
};
