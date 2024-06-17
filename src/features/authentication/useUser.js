import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuth';

function useUser() {
  // console.log('useUser');

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    retry: false,
  });

  console.log(`is useUser Loading: ${isLoading}`);
  return { user, isLoading, error };
}

export default useUser;
