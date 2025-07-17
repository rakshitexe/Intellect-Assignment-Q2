import { useState } from "react";
import AppointmentScheduler from "./components/AppointmentScheduler";
import type { Slot } from "./types/Slot";

function App() {
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  const handleSlotSelected = (slot: Slot) => {
    setSelectedSlot(slot);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">intellect</h1>
      <AppointmentScheduler onSlotSelect={handleSlotSelected} />

      {/* Display selected slot */}
      {selectedSlot && (
        <div className="mt-8 bg-[#f7f4ed] p-6 rounded-xl shadow max-w-xl mx-auto">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Selected Slot
          </h2>
          <p className="text-gray-600">
            <span className="font-medium">Date:</span> {selectedSlot.displayDate}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Time:</span>{" "}
            {selectedSlot.displayTime} - {selectedSlot.displayTimeEnd}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
