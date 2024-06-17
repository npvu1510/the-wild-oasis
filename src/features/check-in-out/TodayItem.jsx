import styled from 'styled-components';

import Tag from '../../ui/Tag';
import Flag from '../../ui/Flag';
import Button from '../../ui/Button';
import CheckoutButton from './CheckoutButton';

import { Link } from 'react-router-dom';

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const {
    id,
    status,
    guests: { fullName, countryFlag },
    numNights,
  } = activity;

  return (
    <StyledTodayItem>
      {status === 'unconfirmed' ? (
        <Tag type="green">Arriving</Tag>
      ) : (
        <Tag type="red">Departing</Tag>
      )}

      <Flag src={countryFlag} />
      <Guest>{fullName}</Guest>
      <div>{numNights > 1 ? `${numNights} nights` : `${numNights} night`}</div>

      {status === 'unconfirmed' ? (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/check-in/${id}`}
        >
          Check in
        </Button>
      ) : (
        <CheckoutButton bookingId={id} />
      )}
    </StyledTodayItem>
  );
}

export default TodayItem;
