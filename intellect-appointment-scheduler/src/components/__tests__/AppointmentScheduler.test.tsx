import { vi, describe, test, afterEach, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AppointmentScheduler from '../AppointmentScheduler';
import type { Slot } from '../../types/Slot';
import type { UseQueryResult } from '@tanstack/react-query';
import { useSlots } from '../../hooks/useSlots';

// ✅ Mock the useSlots hook
vi.mock('../../hooks/useSlots');

// ✅ Type-safe cast
const mockedUseSlots = useSlots as unknown as vi.Mock;

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
  ];

  afterEach(() => {
    vi.clearAllMocks();
  });

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
});
