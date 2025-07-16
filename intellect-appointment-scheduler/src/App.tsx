
import AppointmentScheduler from "./components/AppointmentScheduler";
import type { Slot } from "./types/Slot";

function App() {
  const handleSlotSelected = (slot: Slot) => {
    console.log("Selected Slot:", slot);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Book an Appointment</h1>
      <AppointmentScheduler onSlotSelect={handleSlotSelected} />
    </div>
  );
}

export default App;