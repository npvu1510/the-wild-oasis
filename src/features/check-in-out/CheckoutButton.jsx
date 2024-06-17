import Button from '../../ui/Button';
import useCheckout from '../bookings/useCheckout';

function CheckoutButton({ bookingId }) {
  const { isLoading, checkOut } = useCheckout();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkOut(bookingId)}
      disabled={isLoading}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
