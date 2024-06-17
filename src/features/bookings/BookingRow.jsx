import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import useCheckout from './useCheckout';

import Menus from '../../ui/Menus';
import Modal from '../../ui/Modal';
import Tag from '../../ui/Tag';
import Table from '../../ui/Table';
import Spinner from '../../ui/Spinner';

import { format, isToday } from 'date-fns';
import { formatCurrency } from '../../utils/helpers';
import { formatDistanceFromNow } from '../../utils/helpers';

import { HiEye, HiTrash } from 'react-icons/hi';

import { HiArrowDownOnSquare, HiMiniArrowUpOnSquare } from 'react-icons/hi2';
import useDeleteBooking from './useDeleteBooking';
import ConfirmDelete from '../../ui/ConfirmDelete';

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  const navigate = useNavigate();
  const { checkOut, isCheckingOut } = useCheckout();
  const { mutate, isDeleting } = useDeleteBooking();

  const isWorking = isCheckingOut || isDeleting;
  if (isWorking) return <Spinner />;

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}{' '}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), 'MMM dd yyyy')} &mdash;{' '}
          {format(new Date(endDate), 'MMM dd yyyy')}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle triggerOf={bookingId} />

          <Menus.Select id={bookingId}>
            <Menus.Option
              icon={<HiEye />}
              onClick={() => {
                navigate(`/bookings/${bookingId}`);
              }}
            >
              See details
            </Menus.Option>

            {status === 'checked-in' && (
              <Menus.Option
                icon={<HiArrowDownOnSquare />}
                onClick={() => {
                  checkOut(bookingId);
                }}
              >
                Check out
              </Menus.Option>
            )}

            {status === 'unconfirmed' && (
              <Menus.Option
                icon={<HiMiniArrowUpOnSquare />}
                onClick={() => {
                  navigate(`/check-in/${bookingId}`);
                }}
              >
                Check in
              </Menus.Option>
            )}

            <Modal.Trigger triggerOf="confirm-delete">
              <Menus.Option icon={<HiTrash />}>Delete</Menus.Option>
            </Modal.Trigger>
          </Menus.Select>
        </Menus.Menu>

        <Modal.Window name="confirm-delete">
          <ConfirmDelete
            resource="booking"
            onConfirm={() => {
              mutate(bookingId);
            }}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
