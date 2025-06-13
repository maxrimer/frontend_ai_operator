import { useMutation, useQueryClient } from '@tanstack/react-query';

import axiosInstance from '../../../configs/axios.config';

import { CreateDialogRequest, CreateDialogResponse } from './model';

const createDialog = async (data: CreateDialogRequest): Promise<CreateDialogResponse> => {
  const response = await axiosInstance.post<CreateDialogResponse>('/dialog', data);

  return response.data;
};

interface CreateNewDialogRequest {
  customer_number: string;
}

interface CreateNewDialogResponse {
  chat_id: number;
  messages: string[];
  status: string;
}

const createNewDialog = async (data: CreateNewDialogRequest): Promise<CreateNewDialogResponse> => {
  const response = await axiosInstance.post<CreateNewDialogResponse>('/dialog/create', data, {
    params: {
      customer_number: data.customer_number,
    }
  });

  return response.data;
};

export const useCreateDialog = () => {
  return useMutation({
    mutationFn: createDialog,
  });
};

export const useCreateNewDialog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNewDialog,
    onSuccess: () => {
      // Invalidate and refetch the dialogs list
      queryClient.invalidateQueries({
        queryKey: ['dialogs', 'all'],
      });
    },
  });
}; 