import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getBookingsAfterDate } from '../../services/apiBookings';

function useBookings() {
  const [searchParams, setSearchParams] = useSearchParams();

  const numDays = searchParams.get('last') * 1 || 7;
  const dateForQuery = subDays(new Date(), numDays).toISOString();

  const { data: bookings, isLoading: isLoadingBookings } = useQuery({
    queryKey: ['bookings', `last-${numDays}`],
    queryFn: () => getBookingsAfterDate(dateForQuery),
  });

  return { bookings, isLoadingBookings };
}

export default useBookings;
