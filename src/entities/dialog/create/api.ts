import { useMutation } from '@tanstack/react-query';

import axiosInstance from '../../../configs/axios.config';

import { CreateDialogRequest, CreateDialogResponse } from './model';

const createDialog = async (data: CreateDialogRequest): Promise<CreateDialogResponse> => {
  const response = await axiosInstance.post<CreateDialogResponse>('/dialog', data);

  return response.data;
};

interface CreateNewDialogResponse {
  chat_id: number;
  messages: string[];
  status: string;
}

const createNewDialog = async (): Promise<CreateNewDialogResponse> => {
  const response = await axiosInstance.post<CreateNewDialogResponse>('/dialog/create');

  return response.data;
};

export const useCreateDialog = () => {
  return useMutation({
    mutationFn: createDialog,
  });
};

export const useCreateNewDialog = () => {
  return useMutation({
    mutationFn: createNewDialog,
  });
}; 