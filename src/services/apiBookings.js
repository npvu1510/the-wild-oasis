import { getToday } from '../utils/helpers';
import supabase from './supabase';

import { PAGE_SIZE } from '../utils/constants';

export async function getBookings({ filter, sort, page }) {
  console.log('getBookings');

  let query = supabase
    .from('bookings')
    .select(
      'id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName,email)',
      { count: 'exact' }
    );

  //  1. FILTER
  if (filter) query = query.eq(filter.field, filter.value);

  // 2. SORT
  if (sort)
    query = query.order(sort.field, { ascending: sort.direction === 'asc' });

  // 3. PAGINATION
  const from = (page - 1) * PAGE_SIZE;
  const to = page * PAGE_SIZE - 1;

  query = query.range(from, to);

  const { data, count, error } = await query;

  if (error) throw error;

  console.log('FROM getBookings', data);

  return { data, count };
}

export async function getBooking(id) {
  console.log(`start run getBooking: ${id}`);

  const { data, error } = await supabase
    .from('bookings')
    .select(
      '*, guests(fullName, email, nationality, countryFlag, nationalID), cabins(name)'
    )
    // .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new error(error.message);
  }
  // console.log(data);
  console.log('end run getBooking');
  return data;
}

export async function checkinBooking(id, breakfast) {
  const { data, error } = await supabase
    .from('bookings')
    .update({ status: 'checked-in', isPaid: true, ...breakfast })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function checkoutBooking(id) {
  const { data, error } = await supabase
    .from('bookings')
    .update({ status: 'checked-out' })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteBooking(id) {
  const { error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Could not delete booking');
  }

  return;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from('bookings')
    .select('created_at, totalPrice, extrasPrice')
    .gte('created_at', date)
    .lte('created_at', getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from('bookings')
    // .select('*')
    .select('*, guests(fullName)')
    .gte('startDate', date)
    .lte('startDate', getToday());

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName, nationality, countryFlag)')
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order('created_at');

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from('bookings')
    .update(obj)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
  return data;
}

// export async function deleteBooking(id) {
//   // REMEMBER RLS POLICIES
//   const { data, error } = await supabase.from('bookings').delete().eq('id', id);

//   if (error) {
//     console.error(error);
//     throw new Error('Booking could not be deleted');
//   }
//   return data;
// }
