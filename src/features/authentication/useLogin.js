import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { login } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function useLogin() {
  // console.log('useLogin');

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending: isLogging } = useMutation({
    mutationFn: ({ email, password }) => login(email, password),
    onSuccess: (user) => {
      // console.log('useLogin onSuccess');
      toast.success('Login successfully');
      queryClient.setQueryData(['user'], user);
      navigate('/', { replace: true });
    },
    onError: (err) => {
      console.error(err.message);
      toast.error('Login failed :(');
    },
  });
  console.log(`is useLogin Loading: ${isLogging}`);

  return { mutate, isLogging };
}

export default useLogin;
