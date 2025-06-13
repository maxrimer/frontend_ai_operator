import { useMutation } from '@tanstack/react-query';

import axiosInstance from '../../../configs/axios.config';

import { CloseDialogResponse } from './model';

const closeDialog = async (chat_id: number): Promise<CloseDialogResponse> => {
  const response = await axiosInstance.post<CloseDialogResponse>('/dialog/close', null, {
    params: { chat_id }
  });

  return response.data;
};

export const useCloseDialog = () => {
  return useMutation({
    mutationFn: closeDialog,
  });
}; 