import { useMutation, useQueryClient } from '@tanstack/react-query';

import axiosInstance from '../../../configs/axios.config';

import { AddHintRequest, AddHintResponse } from './model';

const addHint = async (data: AddHintRequest): Promise<AddHintResponse> => {
  const response = await axiosInstance.post<AddHintResponse>('/dialog/hint', data);

  return response.data;
};

export const useAddHint = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addHint,
    onSuccess: (_, variables) => {
      // Invalidate and refetch the specific dialog
      queryClient.invalidateQueries({
        queryKey: ['dialog', variables.chat_id],
      });

      // Also invalidate the dialogs list
      queryClient.invalidateQueries({
        queryKey: ['dialogs', 'all'],
      });
    },
  });
}; 