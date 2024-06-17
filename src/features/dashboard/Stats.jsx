import Stat from './Stat';

import { CiBookmark } from 'react-icons/ci';
import { HiOutlineBanknotes } from 'react-icons/hi2';
import { IoCalendarOutline } from 'react-icons/io5';
import { HiOutlineBriefcase } from 'react-icons/hi2';
import { formatCurrency } from '../../utils/helpers';

function Stats({ bookings, stays, confirmedStays, cabinCount, numDays }) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const numCheckins = confirmedStays.length;
  const occupancyRate =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        icon={<CiBookmark />}
        title="bookings"
        value={numBookings}
        color="red"
      ></Stat>
      <Stat
        icon={<HiOutlineBanknotes />}
        title="sales"
        value={formatCurrency(sales)}
        color="green"
      ></Stat>

      <Stat
        icon={<IoCalendarOutline />}
        title="check ins"
        value={numCheckins}
        color="yellow"
      ></Stat>

      <Stat
        icon={<HiOutlineBriefcase />}
        title="occupancy rate"
        value={`${Math.round(occupancyRate * 100)}%`}
        color="indigo"
      ></Stat>
    </>
  );
}

export default Stats;
