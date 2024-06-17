import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../../services/apiSettings';

const useSettings = function () {
  const {
    data: settings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['setting'],
    queryFn: getSettings,
  });

  console.log('FETCHING SETTINGS');

  return {
    settings,
    isLoading,
    error,
  };
};

export default useSettings;
