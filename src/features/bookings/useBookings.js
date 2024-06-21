import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { getBookings } from '../../services/apiBookings';
import { PAGE_SIZE } from '../../utils/constants';

function useBookings() {
  // console.log('useBookings');

  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. FILTER
  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };

  // 2. SORT
  let sortValueRaw = searchParams.get('sortBy');
  sortValueRaw = sortValueRaw?.split('-');
  const sort = sortValueRaw
    ? { field: sortValueRaw[0], direction: sortValueRaw[1] }
    : { field: 'startDate', direction: 'desc' };

  // 3. PAGINATION
  const page = searchParams.get('page') * 1 || 1;

  const { isLoading, data: { data: bookings, count } = {} } = useQuery({
    queryKey: ['bookings', filter, sort, page],
    queryFn: () => getBookings({ filter, sort, page }),
  });

  // PREFETCHING PREV PAGE
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sort, page - 1],
      queryFn: () => getBookings({ filter, sort, page: page - 1 }),
    });

  // PREFETCHING NEXT PAGE
  const totalPage = Math.ceil(count / PAGE_SIZE);
  if (page < totalPage)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sort, page + 1],
      queryFn: () => getBookings({ filter, sort, page: page + 1 }),
    });

  return { bookings, count, isLoading };
}

export default useBookings;
