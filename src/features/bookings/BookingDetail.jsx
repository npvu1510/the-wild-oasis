import styled from 'styled-components';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Modal from '../../ui/Modal';

import { useMoveBack } from '../../hooks/useMoveBack';
import useBooking from './useBooking';
import Spinner from '../../ui/Spinner';
import { useNavigate } from 'react-router-dom';
import useCheckout from './useCheckout';
import useDeleteBooking from './useDeleteBooking';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Empty from '../../ui/Empty';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();

  const { data: booking, isLoading: isBooking } = useBooking();
  const { checkOut, isCheckingOut } = useCheckout();
  const { mutate, isDeleting } = useDeleteBooking();
  const moveBack = useMoveBack();

  const isWorking = isBooking || isCheckingOut || isDeleting;

  if (isWorking) return <Spinner />;

  if (!booking)
    return <Empty resource="booking">No booking could be found</Empty>;

  // const status = 'checked-in';
  const { id, status } = booking;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Modal>
        <ButtonGroup>
          {status === 'checked-in' && (
            <Button
              variation="primary"
              onClick={() => {
                checkOut(id);
              }}
            >
              Check out
            </Button>
          )}
          {status === 'unconfirmed' && (
            <Button
              variation="primary"
              onClick={() => {
                navigate(`/check-in/${id}`);
              }}
            >
              Checkin
            </Button>
          )}

          <Modal.Trigger triggerOf="confirm-delete">
            <Button variation="danger">Delete</Button>
          </Modal.Trigger>

          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>

        <Modal.Window name="confirm-delete">
          <ConfirmDelete
            resource="booking"
            onConfirm={() => {
              mutate(id, {
                onSettled: () => {
                  navigate(-1);
                },
              });
            }}
          />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default BookingDetail;
