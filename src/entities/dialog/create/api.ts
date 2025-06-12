import { useMutation } from '@tanstack/react-query';

import axiosInstance from '../../../configs/axios.config';

import { CreateDialogRequest, CreateDialogResponse } from './model';

const createDialog = async (data: CreateDialogRequest): Promise<CreateDialogResponse> => {
  const response = await axiosInstance.post<CreateDialogResponse>('/dialog', data);

  return response.data;
};

export const useCreateDialog = () => {
  return useMutation({
    mutationFn: createDialog,
  });
}; 