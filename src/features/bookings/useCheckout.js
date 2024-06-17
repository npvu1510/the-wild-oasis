import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checkoutBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function useCheckout() {
  // const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: checkOut, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId) => {
      checkoutBooking(bookingId);
    },
    onSuccess: () => {
      toast.success('Check out successfully !');
      queryClient.invalidateQueries({ active: true });
      queryClient.invalidateQueries({ active: true });
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { checkOut, isCheckingOut };
}

export default useCheckout;
