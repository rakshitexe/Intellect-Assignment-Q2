import { useQuery } from '@tanstack/react-query';
import { fetchSlots } from '../utils/fetchSlots';
import { groupSlotsByDate } from '../utils/groupSlotsByDate';
import { useMemo } from 'react';

export const useSlots = () => {
  const query = useQuery({
    queryKey: ['slots'],
    queryFn: fetchSlots,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const groupedSlots = useMemo(() => {
    if (!query.data || query.data.length === 0) return {};
    return groupSlotsByDate(query.data);
  }, [query.data]);

  const availableDates = useMemo(() => Object.keys(groupedSlots), [groupedSlots]);

  return {
    ...query,
    groupedSlots,
    availableDates,
  };
};
