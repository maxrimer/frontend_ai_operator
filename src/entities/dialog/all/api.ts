import { useQuery } from '@tanstack/react-query';

import axiosInstance from '../../../configs/axios.config';

import { GetAllDialogsResponse } from './model';

const getAllDialogs = async (): Promise<GetAllDialogsResponse> => {
  const response = await axiosInstance.get<GetAllDialogsResponse>('/dialog/all');

  return response.data;
};

export const useGetAllDialogs = () => {
  return useQuery({
    queryKey: ['dialogs', 'all'],
    queryFn: getAllDialogs,
  });
}; 