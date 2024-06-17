import styled from 'styled-components';
import BookingDataBox from '../../features/bookings/BookingDataBox';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import CheckBox from '../../ui/Checkbox';

import useBooking from '../bookings/useBooking';
import { useMoveBack } from '../../hooks/useMoveBack';
import Spinner from '../../ui/Spinner';
import { formatCurrency } from '../../utils/helpers';
import React, { useEffect, useState } from 'react';
import useCheckin from '../bookings/useCheckin';
import useSettings from '../settings/useSetting';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { data: booking, isLoading: isBookingLoading } = useBooking();
  const { settings, isLoading: isSettingsLoading } = useSettings();
  const { checkin, isPending: isCheckingLoading } = useCheckin();

  const [confirmPaid, setConfirmPaid] = useState(false);
  const [breakfast, setBreakfast] = useState(false);

  useEffect(() => {
    setConfirmPaid(booking?.isPaid || false);
  }, [booking]);

  const isWorking = isBookingLoading || isSettingsLoading || isCheckingLoading;

  if (isWorking) return <Spinner />;

  // const { data: booking, isLoading: isBookingLoading } = useBooking();

  // if (isBookingLoading) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;
  console.log(booking);

  const additionalPrice = settings.breakfastPrice * numGuests * numNights;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (breakfast)
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: breakfast,
          extrasPrice: additionalPrice,
          totalPrice: totalPrice + additionalPrice,
        },
      });
    else checkin({ bookingId, breakfast: {} });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <CheckBox
            id="breakfast"
            checked={breakfast}
            onChange={() =>
              setBreakfast((breakfast) => {
                setBreakfast(!breakfast);
                setConfirmPaid(false);
              })
            }
          >
            Want to breakfast ? {formatCurrency(additionalPrice)}
          </CheckBox>
        </Box>
      )}

      <Box>
        <CheckBox
          id="confirmPaid"
          checked={confirmPaid}
          disabled={confirmPaid}
          onChange={() => setConfirmPaid((confirmPaid) => !confirmPaid)}
        >
          I confirm customer {guests.fullName} paid{' '}
          {!breakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + additionalPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                additionalPrice
              )})`}
        </CheckBox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isWorking}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
