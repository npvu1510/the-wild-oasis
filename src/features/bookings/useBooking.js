import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../../services/apiBookings';
import { useParams } from 'react-router-dom';

function useBooking() {
  // console.log('useBooking');
  const { bookingId } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['bookings', bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });
  // console.log(isLoading, data);
  // console.log(`is useUser Loading: ${isLoading}`);
  return { data, isLoading, error };
}

export default useBooking;
