import { useMutation } from '@tanstack/react-query';

import axiosInstance from '../../../configs/axios.config';

import { AddHintRequest, AddHintResponse } from './model';

const addHint = async (data: AddHintRequest): Promise<AddHintResponse> => {
  const response = await axiosInstance.post<AddHintResponse>('/dialog/hint', data);

  return response.data;
};

export const useAddHint = () => {
  return useMutation({
    mutationFn: addHint,
  });
}; 