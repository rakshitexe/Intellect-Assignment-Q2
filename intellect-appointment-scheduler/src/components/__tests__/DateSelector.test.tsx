import { render, screen, fireEvent } from "@testing-library/react";
import DateSelector from "../baseline-ui/DateSelector";
import { vi } from "vitest";

// Sample date strings to use for testing
const mockDates = [
  "2025-07-16T00:00:00.000Z",
  "2025-07-17T00:00:00.000Z",
  "2025-07-18T00:00:00.000Z",
  "2025-07-19T00:00:00.000Z",
  "2025-07-20T00:00:00.000Z",
];

// Mock function to track selected date callback
const mockOnSelectDate = vi.fn();

describe("DateSelector Component", () => {
  // Reset mock before each test
  beforeEach(() => {
    mockOnSelectDate.mockClear();
  });

  // Test if the component renders all given dates correctly
  test("renders correctly with given dates", () => {
    render(
      <DateSelector
        dates={mockDates}
        selectedDate={mockDates[0]}
        onSelectDate={mockOnSelectDate}
      />
    );

    expect(screen.getByText("Pick a date")).toBeInTheDocument();

    // Check if each date is rendered with correct day and weekday
    mockDates.forEach((dateStr) => {
      const date = new Date(dateStr);
      const day = date.getDate().toString().padStart(2, "0");
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

      expect(screen.getByText(day)).toBeInTheDocument();
      expect(screen.getByText(dayName)).toBeInTheDocument();
    });
  });

  // Test if selecting a date calls the onSelectDate callback
  test("calls onSelectDate when a date card is clicked", () => {
    render(
      <DateSelector
        dates={mockDates}
        selectedDate={mockDates[0]}
        onSelectDate={mockOnSelectDate}
      />
    );

    const secondDate = new Date(mockDates[1]);
    const day = secondDate.getDate().toString().padStart(2, "0");

    const button = screen.getByText(day);
    fireEvent.click(button);

    expect(mockOnSelectDate).toHaveBeenCalledWith(mockDates[1]);
  });

  // Check that left scroll button is disabled initially
  test("left scroll button is disabled initially", () => {
    render(
      <DateSelector
        dates={mockDates}
        selectedDate={mockDates[0]}
        onSelectDate={mockOnSelectDate}
      />
    );

    const buttons = screen.getAllByRole("button");
    const leftButton = buttons[0] as HTMLButtonElement;
    expect(leftButton).toBeDisabled();
  });

  // Check that right scroll button exists
  test("right scroll button is visible", () => {
    render(
      <DateSelector
        dates={mockDates}
        selectedDate={mockDates[0]}
        onSelectDate={mockOnSelectDate}
      />
    );

    const buttons = screen.getAllByRole("button");
    const rightButton = buttons[1] as HTMLButtonElement;
    expect(rightButton).toBeInTheDocument();
  });

  // Ensure selected date card has correct styling applied
  test("selected date card is highlighted", () => {
    render(
      <DateSelector
        dates={mockDates}
        selectedDate={mockDates[2]}
        onSelectDate={mockOnSelectDate}
      />
    );

    const selectedDate = new Date(mockDates[2]);
    const day = selectedDate.getDate().toString().padStart(2, "0");

    const selectedCard = screen.getByText(day).parentElement;
    expect(selectedCard?.className).toContain("border-gray-400");
  });

  // Ensure component handles empty date list gracefully
  test("does not crash when empty dates are provided", () => {
    render(
      <DateSelector
        dates={[]}
        selectedDate={""}
        onSelectDate={mockOnSelectDate}
      />
    );

    expect(screen.getByText("Pick a date")).toBeInTheDocument();
  });

  // Ensure scroll buttons do not crash on click
  test("clicking scroll buttons does not throw error", () => {
    render(
      <DateSelector
        dates={mockDates}
        selectedDate={mockDates[0]}
        onSelectDate={mockOnSelectDate}
      />
    );

    const buttons = screen.getAllByRole("button");
    const leftButton = buttons[0];
    const rightButton = buttons[1];

    fireEvent.click(leftButton);
    fireEvent.click(rightButton);
  });

  // Show appropriate message when no dates are available
  it('shows "No available dates" when dates array is empty', () => {
    render(
      <DateSelector
        dates={[]}
        selectedDate=""
        onSelectDate={vi.fn()}
      />
    );

    expect(screen.getByText(/no available dates/i)).toBeInTheDocument();
  });
});
