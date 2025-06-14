import { useMutation, useQueryClient } from '@tanstack/react-query';

import axiosInstance from '../../../configs/axios.config';

import { SendMessageRequest, SendMessageResponse } from './model';

const sendMessage = async (data: SendMessageRequest[]): Promise<SendMessageResponse> => {
  const response = await axiosInstance.post<SendMessageResponse>('/dialog', data);

  return response.data;
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendMessage,
    onSuccess: (data) => {
      // Invalidate and refetch the specific dialog
      queryClient.invalidateQueries({
        queryKey: ['dialog', data.chat_id],
      });

      // Also invalidate the dialogs list
      queryClient.invalidateQueries({
        queryKey: ['dialogs', 'all'],
      });
    },
  });
}; 