import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { checkinBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';

function useCheckin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: checkin, isPending } = useMutation({
    mutationFn: ({ bookingId, breakfast }) => {
      console.log(breakfast);
      checkinBooking(bookingId, breakfast);
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success(`Checkin booking successfully!`);
      queryClient.invalidateQueries({ active: true });
      navigate('/');
    },
    onError: (err) => {
      console.error(err);
      toast.error('Checkin failed');
    },
  });

  return { checkin, isPending };
}

export default useCheckin;
