import { useMutation, useQueryClient } from '@tanstack/react-query';

import axiosInstance from '../../../configs/axios.config';

import { CloseDialogResponse } from './model';

const closeDialog = async (chat_id: number): Promise<CloseDialogResponse> => {
  const response = await axiosInstance.post<CloseDialogResponse>('/dialog/close', null, {
    params: { chat_id }
  });

  return response.data;
};

export const useCloseDialog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: closeDialog,
    onSuccess: (_, variables) => {
      // Invalidate and refetch the specific dialog
      queryClient.invalidateQueries({
        queryKey: ['dialog', variables],
      });

      // Also invalidate the dialogs list
      queryClient.invalidateQueries({
        queryKey: ['dialogs', 'all'],
      });
    },
  });
}; 