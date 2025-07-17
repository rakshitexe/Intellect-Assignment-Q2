import { useQuery } from '@tanstack/react-query';
import { fetchSlots } from '../utils/fetchSlots';
import { groupSlotsByDate } from '../utils/groupSlotsByDate';
import { useMemo } from 'react';

export const useSlots = () => {
  // Fetches slot data using React Query with caching, retries, and staleTime
  const query = useQuery({
    queryKey: ['slots'],           // Unique key for caching
    queryFn: fetchSlots,           // Function to fetch data
    staleTime: 5 * 60 * 1000,      // Cache stays fresh for 5 minutes
    retry: 1,                      // Retry once on failure
  });

  // Memoizes grouped slots to avoid unnecessary recalculations
  const groupedSlots = useMemo(() => {
    if (!query.data || query.data.length === 0) return {};
    return groupSlotsByDate(query.data);  // Group slots by displayDate
  }, [query.data]);

  // Extract available dates from grouped slots
  const availableDates = useMemo(() => Object.keys(groupedSlots), [groupedSlots]);

  return {
    ...query,            // Includes status, data, error, etc.
    groupedSlots,        // Slots grouped by date
    availableDates,      // List of unique display dates
  };
};
