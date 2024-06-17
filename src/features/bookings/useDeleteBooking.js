import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';

function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate, isPending: isDeleting } = useMutation({
    mutationFn: (bookingId) => {
      deleteBooking(bookingId);
    },
    onSuccess: () => {
      toast.success('Delete booking successfully');
      queryClient.invalidateQueries({ active: true });
      queryClient.invalidateQueries({ active: true });
      queryClient.invalidateQueries({ active: true });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    mutate,
    isDeleting,
  };
}

export default useDeleteBooking;
