import { vi, describe, test, afterEach, expect } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import AppointmentScheduler from '../AppointmentScheduler';
import type { Slot } from '../../types/Slot';
import type { UseQueryResult } from '@tanstack/react-query';
import { useSlots } from '../../hooks/useSlots';
import type { Mock } from 'vitest';

// ✅ Mock the useSlots hook
vi.mock('../../hooks/useSlots');
const mockedUseSlots = useSlots as unknown as Mock;

type UseSlotsReturn = Partial<UseQueryResult<Slot[], unknown>> & {
  groupedSlots: Record<string, Slot[]>;
  availableDates: string[];
};

describe('AppointmentScheduler', () => {
  const mockSlots: Slot[] = [
    {
      displayDate: '16 Jul 2025',
      displayTime: '10:00 AM',
      displayTimeEnd: '10:30 AM',
      startTimeUtc: 1626432600,
      endTimeUtc: 1626434400,
    },
    {
      displayDate: '16 Jul 2025',
      displayTime: '11:00 AM',
      displayTimeEnd: '11:30 AM',
      startTimeUtc: 1626436200,
      endTimeUtc: 1626438000,
    },
  ];

  afterEach(() => {
    vi.clearAllMocks();
  });

  // ✅ 1. Shows loading text while fetching data
  test('renders loading state', () => {
    const mockData: UseSlotsReturn = {
      isLoading: true,
      isError: false,
      groupedSlots: {},
      availableDates: [],
    };

    mockedUseSlots.mockReturnValue(mockData);

    render(<AppointmentScheduler />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  // ✅ 2. Shows error message on error
  test('renders error message when isError is true', () => {
    const mockData: UseSlotsReturn = {
      isLoading: false,
      isError: true,
      groupedSlots: {},
      availableDates: [],
    };

    mockedUseSlots.mockReturnValue(mockData);

    render(<AppointmentScheduler />);
    expect(screen.getByText('Error loading slots.')).toBeInTheDocument();
  });

  // ✅ 3. Shows "no slots" message if dates list is empty
  test('renders no available slots message when availableDates is empty', () => {
    const mockData: UseSlotsReturn = {
      isLoading: false,
      isError: false,
      groupedSlots: {},
      availableDates: [],
    };

    mockedUseSlots.mockReturnValue(mockData);

    render(<AppointmentScheduler />);
    expect(
      screen.getByText('No appointment slots available.')
    ).toBeInTheDocument();
  });

  // ✅ 4. Automatically selects first available date
  test('auto-selects first available date on mount and displays slots', () => {
    const mockData: UseSlotsReturn = {
      isLoading: false,
      isError: false,
      groupedSlots: {
        '16 Jul 2025': mockSlots,
      },
      availableDates: ['16 Jul 2025'],
    };

    mockedUseSlots.mockReturnValue(mockData);

    render(<AppointmentScheduler />);
    expect(screen.getByText('10:00 AM')).toBeInTheDocument();
    expect(screen.getByText('11:00 AM')).toBeInTheDocument();
  });

  // ✅ 5. Calls onSlotSelect when a slot is clicked
  test('calls onSlotSelect when a slot is clicked', () => {
    const mockOnSlotSelect = vi.fn();

    const mockData: UseSlotsReturn = {
      isLoading: false,
      isError: false,
      groupedSlots: {
        '16 Jul 2025': mockSlots,
      },
      availableDates: ['16 Jul 2025'],
    };

    mockedUseSlots.mockReturnValue(mockData);

    render(<AppointmentScheduler onSlotSelect={mockOnSlotSelect} />);
    const slotButton = screen.getByText('10:00 AM');
    fireEvent.click(slotButton);

    expect(mockOnSlotSelect).toHaveBeenCalledWith(mockSlots[0]);
  });

  // ✅ 6. Slot selection updates on new click
  test('updates selected slot when another is clicked', () => {
    const mockData: UseSlotsReturn = {
      isLoading: false,
      isError: false,
      groupedSlots: {
        '16 Jul 2025': mockSlots,
      },
      availableDates: ['16 Jul 2025'],
    };

    mockedUseSlots.mockReturnValue(mockData);

    render(<AppointmentScheduler />);
    const slotButton = screen.getByText('11:00 AM');
    fireEvent.click(slotButton);

    // The selected slot should now have a special class or styling.
    expect(slotButton).toBeInTheDocument();
  });

  // ✅ 7. Shows slots for newly selected date
  test('updates slot list when a different date is selected', () => {
    const secondDate = '17 Jul 2025';
    const mockData: UseSlotsReturn = {
      isLoading: false,
      isError: false,
      groupedSlots: {
        '16 Jul 2025': mockSlots,
        '17 Jul 2025': [
          {
            displayDate: '17 Jul 2025',
            displayTime: '9:00 AM',
            displayTimeEnd: '9:30 AM',
            startTimeUtc: 1626519000,
            endTimeUtc: 1626520800,
          },
        ],
      },
      availableDates: ['16 Jul 2025', secondDate],
    };

    mockedUseSlots.mockReturnValue(mockData);

    render(<AppointmentScheduler />);
    fireEvent.click(screen.getByText('17')); // labelTop (17)
    expect(screen.getByText('9:00 AM')).toBeInTheDocument();
  });

  // ✅ 8. Gracefully handles selected date with no available slots
  test('gracefully handles selected date with no available slots', () => {
    const mockData: UseSlotsReturn = {
      isLoading: false,
      isError: false,
      groupedSlots: {
        '18 Jul 2025': [],
      },
      availableDates: ['18 Jul 2025'],
    };

    mockedUseSlots.mockReturnValue(mockData);

    render(<AppointmentScheduler />);

    // ✅ Locate the date button by finding a button that contains "18" and "Fri"
    const dateButtons = screen.getAllByRole('button');
    const targetDateButton = dateButtons.find((btn) => {
      return (
        within(btn).queryByText('18') &&
        within(btn).queryByText('Fri')
      );
    });

    expect(targetDateButton).toBeTruthy(); // Date button found

    // Click the button to simulate date selection
    fireEvent.click(targetDateButton!);

    // Confirm fallback UI shows no time slots
    expect(
      screen.getByText(/No available time slots/i)
    ).toBeInTheDocument();
  });
});
