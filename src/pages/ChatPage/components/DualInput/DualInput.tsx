import { FC, useState } from 'react';

import { 
  AttachmentIcon, 
  SendIcon,
  SupportIcon,
  UserIcon,
} from '@ozen-ui/icons';
import { IconButton } from '@ozen-ui/kit/IconButtonNext';
import { Input } from '@ozen-ui/kit/Input';
import { Stack } from '@ozen-ui/kit/Stack';
import { Typography } from '@ozen-ui/kit/Typography';

import s from './DualInput.module.css';

type DualInputProps = {
  onSendMessage?: (message: string, type: 'customer' | 'operator') => void;
};

export const DualInput: FC<DualInputProps> = ({ onSendMessage }) => {
  const [customerMessage, setCustomerMessage] = useState('');
  const [operatorMessage, setOperatorMessage] = useState('');

  const handleSend = (messageType: 'customer' | 'operator') => {
    const message = messageType === 'customer' ? customerMessage : operatorMessage;

    if (message.trim()) {
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

  return (
    <div className={s.dualInput}>
      {/* Customer Input */}
      <Stack align="center" gap="s" className={s.inputRow} fullWidth>
        <Typography variant="text-xs" color="secondary" className={s.inputLabel}>
          Клиент:
        </Typography>
        <IconButton icon={AttachmentIcon} size="s" />
        <Input 
          placeholder="Сообщение от клиента..."
          value={customerMessage}
          onChange={(e) => setCustomerMessage(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e, 'customer')}
          renderLeft={UserIcon}
          fullWidth
        />
        <IconButton 
          icon={SendIcon} 
          size="s"
          onClick={() => handleSend('customer')}
          disabled={!customerMessage.trim()}
        />
      </Stack>

      {/* Operator Input */}
      <Stack align="center" gap="s" className={s.inputRow} fullWidth>
        <Typography variant="text-xs" color="secondary" className={s.inputLabel}>
          Оператор:
        </Typography>
        <IconButton icon={AttachmentIcon} size="s" />
        <Input 
          placeholder="Ответ оператора..."
          value={operatorMessage}
          onChange={(e) => setOperatorMessage(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e, 'operator')}
          renderLeft={SupportIcon}
          fullWidth
        />
        <IconButton 
          icon={SendIcon} 
          size="s"
          onClick={() => handleSend('operator')}
          disabled={!operatorMessage.trim()}
        />
      </Stack>
    </div>
  );
}; 