import { useQuery } from '@tanstack/react-query';

import axiosInstance from '../../../configs/axios.config';

import { GetDialogResponse } from './model';

const getDialog = async (id: number): Promise<GetDialogResponse> => {
  const response = await axiosInstance.get<GetDialogResponse>(`/dialog/${id}`);

  return response.data;
};

export const useGetDialog = (id: number) => {
  return useQuery({
    queryKey: ['dialog', id],
    queryFn: () => getDialog(id),
  });
}; 