import { useGetDialog } from '../../get/api';

import { GetDialogResponseV2, UseDialog } from './model';


interface UseDialogProps {  
  dialogId: number;
}

export const useDialog = ({ dialogId }: UseDialogProps): UseDialog => {
  const { data } = useGetDialog(dialogId);

  const dto: GetDialogResponseV2 | null = data ? {
    ...data,
    hints: data.messages.filter((message) => message.role === 'hint'),
    messages: data.messages.filter((message) => message.role !== 'hint'),
  } : null;

  return {
    dialog: dto,
  };
}; 