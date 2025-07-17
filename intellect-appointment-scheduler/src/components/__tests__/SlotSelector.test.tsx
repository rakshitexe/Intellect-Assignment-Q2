
import { render, screen, fireEvent } from "@testing-library/react";
import { SlotSelector } from "../baseline-ui/SlotSelector";
import type { Slot } from "../../types/Slot";

// Sample test slots
const mockSlots: Slot[] = [
  {
    displayDate: "16 Jul 2025",
    displayTime: "10:00 AM",
    displayTimeEnd: "10:30 AM",
    startTimeUtc: 1626432600,
    endTimeUtc: 1626434400,
  },
  {
    displayDate: "16 Jul 2025",
    displayTime: "11:00 AM",
    displayTimeEnd: "11:30 AM",
    startTimeUtc: 1626436200,
    endTimeUtc: 1626438000,
  },
];

describe("SlotSelector", () => {
  test("renders all available slots", () => {
    // Render the component with slots
    render(
      <SlotSelector slots={mockSlots} selectedSlot={null} onSelect={() => {}} />
    );

    // Check that each slot time is displayed
    mockSlots.forEach((slot) => {
      expect(screen.getByText(slot.displayTime)).toBeInTheDocument();
    });
  });

  test("highlights the selected slot correctly with current class", () => {
    // Select the second slot
    const selected = mockSlots[1];

    render(
      <SlotSelector
        slots={mockSlots}
        selectedSlot={selected}
        onSelect={() => {}}
      />
    );

    const selectedButton = screen.getByText(selected.displayTime);

    // Match actual Tailwind classes used in your component
    expect(selectedButton).toHaveClass("bg-[#e7e7e7]");
    expect(selectedButton).toHaveClass("text-black");
  });

  test("calls onSelectSlot when a slot is clicked", () => {
    const mockFn = vi.fn();

    render(
      <SlotSelector
        slots={mockSlots}
        selectedSlot={null}
        onSelect={mockFn}
      />
    );

    const button = screen.getByText(mockSlots[0].displayTime);
    fireEvent.click(button);

    expect(mockFn).toHaveBeenCalledWith(mockSlots[0]);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test("does not crash when slot list is empty", () => {
    render(
      <SlotSelector slots={[]} selectedSlot={null} onSelect={() => {}} />
    );

    // Check that no buttons are rendered
    const buttons = screen.queryAllByRole("button");
    expect(buttons.length).toBe(0);
  });
});
