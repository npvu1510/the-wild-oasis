import { useQuery } from '@tanstack/react-query';
import { getStaysTodayActivity } from '../../services/apiBookings';

function useTodayActivity() {
  const { data: activities, isLoading } = useQuery({
    queryKey: ['today-activities'],
    queryFn: getStaysTodayActivity,
  });
  // console.log(activities);
  return { activities, isLoading };
}

export default useTodayActivity;
