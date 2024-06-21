import { useQuery } from '@tanstack/react-query';

import { getCabins } from '../../services/apiCabins';

export default function useCabin() {
  let {
    data: cabins,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  });

  return { cabins, isFetching, error };
}
