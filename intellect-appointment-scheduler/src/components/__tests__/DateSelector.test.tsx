import { render, screen, fireEvent } from "@testing-library/react";
import DateSelector from "../baseline-ui/DateSelector";

// Mock data
const mockDates = [
  "2025-07-16T00:00:00.000Z",
  "2025-07-17T00:00:00.000Z",
  "2025-07-18T00:00:00.000Z",
  "2025-07-19T00:00:00.000Z",
  "2025-07-20T00:00:00.000Z",
];

const mockOnSelectDate = vi.fn();

describe("DateSelector Component", () => {
  test("renders correctly with given dates", () => {
    render(
      <DateSelector
        dates={mockDates}
        selectedDate={mockDates[0]}
        onSelectDate={mockOnSelectDate}
      />
    );

    // Check heading
    expect(screen.getByText("Pick a date")).toBeInTheDocument();

    // Check that all date cards render
    mockDates.forEach((dateStr) => {
      const date = new Date(dateStr);
      const day = date.getDate().toString().padStart(2, "0");
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

      expect(screen.getByText(day)).toBeInTheDocument();
      expect(screen.getByText(dayName)).toBeInTheDocument();
    });
  });

  test("calls onSelectDate when a card is clicked", () => {
    render(
      <DateSelector
        dates={mockDates}
        selectedDate={mockDates[0]}
        onSelectDate={mockOnSelectDate}
      />
    );

    // Find and click on second date card
    const secondDate = new Date(mockDates[1]);
    const day = secondDate.getDate().toString().padStart(2, "0");

    const dayButton = screen.getByText(day);
    fireEvent.click(dayButton);

    expect(mockOnSelectDate).toHaveBeenCalledWith(mockDates[1]);
  });

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

  test("right scroll button should exist", () => {
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
});
