// Represents a single appointment slot
export interface Slot {
  displayDate: string;       // The date to display (e.g., "2025-07-16")
  displayTime: string;       // Start time in display format (e.g., "10:00 AM")
  displayTimeEnd: string;    // End time in display format (e.g., "11:00 AM")
  startTimeUtc: number;      // Start time in UTC (timestamp in ms)
  endTimeUtc: number;        // End time in UTC (timestamp in ms)
}