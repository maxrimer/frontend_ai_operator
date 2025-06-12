import { useMutation } from '@tanstack/react-query';

import axiosInstance from '../../../configs/axios.config';

import { CloseDialogResponse } from './model';

const closeDialog = async (): Promise<CloseDialogResponse> => {
  const response = await axiosInstance.post<CloseDialogResponse>('/dialog/close');

  return response.data;
};

export const useCloseDialog = () => {
  return useMutation({
    mutationFn: closeDialog,
  });
}; 