import { render, screen, fireEvent } from "@testing-library/react";
import { SlotSelector } from "../baseline-ui/SlotSelector";
import type { Slot } from "../../types/Slot";
import { vi } from "vitest";

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
  test("renders heading and helper text", () => {
    render(
      <SlotSelector slots={mockSlots} selectedSlot={null} onSelect={() => {}} />
    );

    expect(
      screen.getByText("Available time slots")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Each session lasts for 30 minutes")
    ).toBeInTheDocument();
  });

  test("renders all available slots", () => {
    render(
      <SlotSelector slots={mockSlots} selectedSlot={null} onSelect={() => {}} />
    );

    mockSlots.forEach((slot) => {
      expect(screen.getByText(slot.displayTime)).toBeInTheDocument();
    });
  });

  test("highlights the selected slot correctly", () => {
    const selected = mockSlots[1];

    render(
      <SlotSelector
        slots={mockSlots}
        selectedSlot={selected}
        onSelect={() => {}}
      />
    );

    const selectedButton = screen.getByText(selected.displayTime);

    expect(selectedButton).toHaveClass("bg-[#e7e7e7]");
    expect(selectedButton).toHaveClass("text-black");
  });

  test("calls onSelect when a slot is clicked", () => {
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

  test("does not render any slot buttons if slots list is empty", () => {
    render(
      <SlotSelector slots={[]} selectedSlot={null} onSelect={() => {}} />
    );

    const buttons = screen.queryAllByRole("button");
    expect(buttons.length).toBe(0);
  });

  test("allows user to change selected slot", () => {
    const mockFn = vi.fn();

    const { rerender } = render(
      <SlotSelector
        slots={mockSlots}
        selectedSlot={mockSlots[0]}
        onSelect={mockFn}
      />
    );

    // Initially selected is first slot
    expect(screen.getByText(mockSlots[0].displayTime)).toHaveClass("bg-[#e7e7e7]");

    // User selects second slot
    fireEvent.click(screen.getByText(mockSlots[1].displayTime));
    expect(mockFn).toHaveBeenCalledWith(mockSlots[1]);

    // Rerender with second slot now selected
    rerender(
      <SlotSelector
        slots={mockSlots}
        selectedSlot={mockSlots[1]}
        onSelect={mockFn}
      />
    );

    expect(screen.getByText(mockSlots[1].displayTime)).toHaveClass("bg-[#e7e7e7]");
  });

  test("does not crash when selecting already selected slot", () => {
    const mockFn = vi.fn();

    render(
      <SlotSelector
        slots={mockSlots}
        selectedSlot={mockSlots[0]}
        onSelect={mockFn}
      />
    );

    // Click the already selected slot
    fireEvent.click(screen.getByText(mockSlots[0].displayTime));

    // Still should call handler (unless you want to block same selection)
    expect(mockFn).toHaveBeenCalledWith(mockSlots[0]);
  });


   test("shows fallback message when no slots are available", () => {
    render(
      <SlotSelector slots={[]} selectedSlot={null} onSelect={() => {}} />
    );

    expect(
      screen.getByText(/No available time slots/i)
    ).toBeInTheDocument();
  });
});


