import { FC, useState, useEffect } from 'react';

import { 
  SendIcon,
  SupportIcon,
  UserIcon,
} from '@ozen-ui/icons';
import { IconButton } from '@ozen-ui/kit/IconButtonNext';
import { Input } from '@ozen-ui/kit/Input';
import { Stack } from '@ozen-ui/kit/Stack';
import { Typography } from '@ozen-ui/kit/Typography';

import { useSendMessage } from '../../../../entities/dialog';

import s from './DualInput.module.css';

type DualInputProps = {
  dialogId: number;
  onSendMessage?: (message: string, type: 'customer' | 'operator') => void;
  operatorMessageValue?: string;
  disabled?: boolean;
};

export const DualInput: FC<DualInputProps> = ({ 
  dialogId, 
  onSendMessage, 
  operatorMessageValue,
  disabled = false 
}) => {
  const [customerMessage, setCustomerMessage] = useState('');
  const [operatorMessage, setOperatorMessage] = useState('');

  const sendMessage = useSendMessage();

  // Update operator message when prop changes
  useEffect(() => {
    if (operatorMessageValue !== undefined) {
      setOperatorMessage(operatorMessageValue);
    }
  }, [operatorMessageValue]);

  const handleSend = (messageType: 'customer' | 'operator') => {
    if (disabled) return;
    
    const message = messageType === 'customer' ? customerMessage : operatorMessage;

    if (message.trim()) {
      // Use the sendMessage directly
      sendMessage.mutate({
        chat_id: dialogId,
        role: messageType,
        text: message.trim(),
      });

      // Keep the callback for backward compatibility
      onSendMessage?.(message.trim(), messageType);

      if (messageType === 'customer') {
        setCustomerMessage('');
      } else {
        setOperatorMessage('');
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, messageType: 'customer' | 'operator') => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(messageType);
    }
  };

  const isLoading = sendMessage.isPending;
  const isInputDisabled = disabled || isLoading;

  return (
    <div className={s.dualInput}>
      {/* Customer Input */}
      <Stack align="center" gap="s" className={s.inputRow} fullWidth>
        <Typography variant="text-xs" color="secondary" className={s.inputLabel}>
          Клиент:
        </Typography>
        <Input 
          placeholder={disabled ? "Диалог закрыт" : "Сообщение от клиента..."}
          value={customerMessage}
          onChange={(e) => setCustomerMessage(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e, 'customer')}
          renderLeft={UserIcon}
          disabled={isInputDisabled}
          fullWidth
        />
        <IconButton 
          icon={SendIcon} 
          size="s"
          onClick={() => handleSend('customer')}
          disabled={!customerMessage.trim() || isInputDisabled}
        />
      </Stack>

      {/* Operator Input */}
      <Stack align="center" gap="s" className={s.inputRow} fullWidth>
        <Typography variant="text-xs" color="secondary" className={s.inputLabel}>
          Оператор:
        </Typography>
        <Input 
          placeholder={disabled ? "Диалог закрыт" : "Ответ оператора..."}
          value={operatorMessage}
          onChange={(e) => setOperatorMessage(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e, 'operator')}
          renderLeft={SupportIcon}
          disabled={isInputDisabled}
          fullWidth
        />
        <IconButton 
          icon={SendIcon} 
          size="s"
          onClick={() => handleSend('operator')}
          disabled={!operatorMessage.trim() || isInputDisabled}
        />
      </Stack>
    </div>
  );
}; 