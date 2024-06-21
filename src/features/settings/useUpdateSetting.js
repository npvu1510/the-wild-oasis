import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateSetting } from '../../services/apiSettings';

export default function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate: editSetting, isPending: isEditing } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success('Create successfully');
      queryClient.invalidateQueries({
        queryKey: ['setting'],
      });
      // console.log('SUCCESS');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { editSetting, isEditing };
}
