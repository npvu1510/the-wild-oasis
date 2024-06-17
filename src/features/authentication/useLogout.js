import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending: isLoggingOut } = useMutation({
    mutationFn: () => {
      logout();
    },
    onSuccess: () => {
      // toast.success('')
      queryClient.removeQueries();
      navigate('/login', { replace: true });
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  return { mutate, isLoggingOut };
}

export default useLogout;
