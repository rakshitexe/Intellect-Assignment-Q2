import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Slot } from "../types/Slot";
import { fetchSlots } from "../utils/fetchSlots";
import { groupSlotsByDate } from "../utils/groupSlotsByDate";
import { getDayName, getDayNumber } from "../utils/formatDateForUI";

// ✅ Define props interface
interface AppointmentSchedulerProps {
  onSlotSelect?: (slot: Slot) => void;
}

const AppointmentScheduler: React.FC<AppointmentSchedulerProps> = ({ onSlotSelect }) => {
  const { data: slots, isLoading, isError } = useQuery({
    queryKey: ["slots"],
    queryFn: fetchSlots,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: true,
  });

  const groupedSlots = useMemo(() => (slots ? groupSlotsByDate(slots) : {}), [slots]);
  const availableDates = useMemo(() => Object.keys(groupedSlots), [groupedSlots]);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  useMemo(() => {
    if (!selectedDate && availableDates.length > 0) {
      setSelectedDate(availableDates[0]);
    }
  }, [availableDates]);

  if (isLoading) return <div className="text-center py-6">Loading...</div>;
  if (isError) return <div className="text-center py-6 text-red-500">Error loading slots.</div>;
  if (!selectedDate || !groupedSlots[selectedDate]) return null;

  return (
    <div className="bg-[#f5f2eb] rounded p-6 max-w-xl mx-auto space-y-6">
      {/* Date Picker */}
      <div>
        <p className="text-lg font-semibold mb-3">Pick a date</p>
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide">
          <button className="w-10 h-10 bg-[#ebe7de] rounded-full flex justify-center items-center text-xl">←</button>
          {availableDates.map((date) => (
            <div
              key={date}
              className={`min-w-[60px] px-4 py-2 text-center rounded-lg border cursor-pointer transition
                ${selectedDate === date ? "bg-blue-600 text-white font-semibold" : "bg-white text-gray-800"}`}
              onClick={() => setSelectedDate(date)}
            >
              <div className="text-md">{getDayNumber(date)}</div>
              <div className="text-sm">{getDayName(date)}</div>
            </div>
          ))}
          <button className="w-10 h-10 bg-[#ebe7de] rounded-full flex justify-center items-center text-xl">→</button>
        </div>
      </div>

      {/* Time Slots */}
      <div>
        <p className="text-md font-semibold mb-1">Available time slots</p>
        <p className="text-sm text-gray-600 mb-4">Each session lasts for 30 minutes</p>
        <div className="flex flex-wrap gap-3">
          {groupedSlots[selectedDate].map((slot) => (
            <button
              key={slot.startTimeUtc}
              onClick={() => {
                setSelectedSlot(slot);
                if (onSlotSelect) onSlotSelect(slot); // ✅ Callback
              }}
              className={`px-4 py-2 rounded-full text-sm border transition
                ${selectedSlot?.startTimeUtc === slot.startTimeUtc
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-800 border-gray-300"}`}
            >
              {slot.displayTime}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppointmentScheduler;
