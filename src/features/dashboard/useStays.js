import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getStaysAfterDate } from '../../services/apiBookings';

function useStays() {
  const [searchParams, setSearchParams] = useSearchParams();

  const numDays = searchParams.get('last') * 1 || 7;
  const dateForQuery = subDays(new Date(), numDays).toISOString();

  const { data: stays, isLoading: isLoadingStays } = useQuery({
    queryKey: ['stays', `last-${numDays}`],
    queryFn: () => getStaysAfterDate(dateForQuery),
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status !== 'unconfirmmed'
  );

  return { stays, confirmedStays, isLoadingStays };
}

export default useStays;
