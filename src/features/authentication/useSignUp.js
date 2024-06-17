import { useMutation } from '@tanstack/react-query';
import { signup as signUpApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

function useSignUp() {
  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password, options }) => {
      return signUpApi(email, password, options);
    },
    onSuccess: (user) => {
      console.log(user);
      toast.success('Create successfully');
    },
  });

  return { signup, isLoading };
}

export default useSignUp;
