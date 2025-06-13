import { useGetDialog } from '../../get/api';
import { useSendMessage } from '../../send/api';

import { GetDialogResponseV2, UseDialog } from './model';


interface UseDialogProps {  
  dialogId: number;
}

export const useDialog = ({ dialogId }: UseDialogProps): UseDialog => {
  const { data } = useGetDialog(dialogId);
  const sendMessage = useSendMessage();

  const dto: GetDialogResponseV2 | null = data ? {
    ...data,
    hints: data.messages.filter((message) => message.role === 'suffler'),
    messages: data.messages.filter((message) => message.is_used || message.role !== 'suffler'),
  } : null;

  return {
    dialog: dto,
    sendMessage,
  };
}; 