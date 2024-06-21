import styled from 'styled-components';

import Stats from './Stats';
import Spinner from '../../ui/Spinner';
import SaleChart from './SalesChart';
import DurationChart from './DurationChart';
import TodayActivity from '../check-in-out/TodayActivity';

import useBookings from './useBookings';
import useStays from './useStays';
import useCabins from '../cabins/useCabin';
import { useSearchParams } from 'react-router-dom';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const [searchParams] = useSearchParams();

  const { bookings, isLoadingBookings } = useBookings();
  const { stays, confirmedStays, isLoadingStays } = useStays();
  const { cabins, isLoading: isLoadingCabins } = useCabins();

  if (isLoadingBookings || isLoadingStays || isLoadingCabins)
    return <Spinner />;

  if (!cabins) return;

  const cabinCount = cabins.length;
  const numDays = searchParams.get('last') || 7;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        stays={stays}
        confirmedStays={confirmedStays}
        cabinCount={cabinCount}
        numDays={numDays}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SaleChart data={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
