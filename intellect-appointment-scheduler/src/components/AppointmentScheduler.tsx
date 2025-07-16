import { useState, useEffect } from 'react';
import { useSlots } from '../hooks/useSlots';
import type { Slot } from '../types/Slot';
import DateSelector from './baseline-ui/DateSelector';
import { SlotSelector } from './baseline-ui/SlotSelector';

interface AppointmentSchedulerProps {
  onSlotSelect?: (slot: Slot) => void;
}

const AppointmentScheduler: React.FC<AppointmentSchedulerProps> = ({ onSlotSelect }) => {
  const { isLoading, isError, groupedSlots, availableDates } = useSlots();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  useEffect(() => {
    if (availableDates.length && !selectedDate) {
      setSelectedDate(availableDates[0]);
    }
  }, [availableDates]);

  if (isLoading) return <div className="text-center py-6">Loading...</div>;
  if (isError) return <div className="text-center py-6 text-red-500">Error loading slots.</div>;
  if (!availableDates.length)
    return <div className="text-center py-6 text-gray-600">No appointment slots available.</div>;

  return (
    <div className="bg-[#f7f4ed] p-6 rounded-xl shadow max-w-xl mx-auto">
      <DateSelector
        dates={availableDates}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />
      {selectedDate && groupedSlots[selectedDate] && (
        <SlotSelector
          slots={groupedSlots[selectedDate]}
          selectedSlot={selectedSlot}
          onSelect={(slot) => {
            setSelectedSlot(slot);
            onSlotSelect?.(slot);
          }}
        />
      )}
    </div>
  );
};

export default AppointmentScheduler;
