import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser as updateUserApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: ({ fullName, avatar, password }) =>
      updateUserApi(fullName, avatar, password),
    onSuccess: ({ user }) => {
      toast.success('Update successfully');
      queryClient.invalidateQueries(['user']);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { updateUser, isUpdating };
}

export default useUpdateUser;
