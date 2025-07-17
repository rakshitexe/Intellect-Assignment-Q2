import type { Slot } from "../../types/Slot";
import SelectableCard from "./SelectableCard";

interface Props {
  slots: Slot[]; // List of available time slots
  selectedSlot: Slot | null; // Currently selected time slot
  onSelect: (slot: Slot) => void; // Callback to handle slot selection
}

export const SlotSelector = ({ slots, selectedSlot, onSelect }: Props) => {
  return (
    <div className="mt-6">
      {/* Section heading */}
      <h3 className="text-lg font-semibold text-gray-800">
        Available time slots
      </h3>
      <p className="text-sm text-gray-400 font-semibold mb-4">
        Each session lasts for 30 minutes
      </p>

      {/* Show message if no slots are available */}
      {slots.length === 0 ? (
        <p className="text-gray-500 text-center">No available time slots.</p>
      ) : (
        // Render each slot as a selectable card
        <div className="flex flex-wrap gap-2">
          {slots.map((slot) => {
            // Check if this slot is currently selected
            const isSelected = selectedSlot?.startTimeUtc === slot.startTimeUtc;

            return (
              <SelectableCard
                key={slot.startTimeUtc}
                labelTop={slot.displayTime} // Display time as card label
                isSelected={isSelected} // Highlight if selected
                onClick={() => onSelect(slot)} // Handle slot selection
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
