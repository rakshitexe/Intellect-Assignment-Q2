import { useState, useEffect } from 'react';
import { useSlots } from '../hooks/useSlots';
import type { Slot } from '../types/Slot';
import DateSelector from './baseline-ui/DateSelector';
import { SlotSelector } from './baseline-ui/SlotSelector';

interface AppointmentSchedulerProps {
  onSlotSelect?: (slot: Slot) => void;
}

const AppointmentScheduler: React.FC<AppointmentSchedulerProps> = ({ onSlotSelect }) => {
  // Fetch slot data using custom React Query hook
  const { isLoading, isError, groupedSlots, availableDates } = useSlots();

  // Track selected date and time slot
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  // Auto-select the first available date when data loads
  useEffect(() => {
    if (availableDates.length && !selectedDate) {
      setSelectedDate(availableDates[0]);
    }
  }, [availableDates]);

  return (
    <div className="bg-[#f7f4ed] p-6 rounded-xl shadow max-w-xl mx-auto">
      {/* Show loading state */}
      {isLoading && <div className="text-center py-6 text-gray-600">Loading...</div>}

      {/* Show error state */}
      {isError && <div className="text-center py-6 text-red-500">Error loading slots.</div>}

      {/* Show message if no slots available */}
      {!isLoading && !isError && !availableDates.length && (
        <div className="text-center py-6 text-gray-600">No appointment slots available.</div>
      )}

      {/* Render selectors if data is available */}
      {!isLoading && !isError && availableDates.length > 0 && (
        <>
          {/* Date selector at the top */}
          <DateSelector
            dates={availableDates}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />

          {/* Slot selector shown when a date is selected */}
          {selectedDate && groupedSlots[selectedDate] && (
            <SlotSelector
              slots={groupedSlots[selectedDate]}
              selectedSlot={selectedSlot}
              onSelect={(slot) => {
                setSelectedSlot(slot);
                onSlotSelect?.(slot); // Pass slot to parent callback if provided
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default AppointmentScheduler;
