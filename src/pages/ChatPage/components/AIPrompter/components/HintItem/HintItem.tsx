import { FC } from 'react';

import { Button } from '@ozen-ui/kit/ButtonNext';
import { Stack } from '@ozen-ui/kit/Stack';
import { Typography } from '@ozen-ui/kit/Typography';
import clsx from 'clsx';

import { useSendMessage } from '../../../../../../entities/dialog';
import { DialogMessage } from '../../../../../../entities/dialog/get/model';
import s from '../../AIPrompter.module.css';

type HintItemProps = {
  hint: DialogMessage;
  index: number;
  totalHints: number;
  dialogId: number;
  onEditHint?: (hintText: string) => void;
};

export const HintItem: FC<HintItemProps> = ({ hint, index, totalHints, dialogId, onEditHint }) => {
  const sendMessage = useSendMessage();

  // Helper function to determine hint state
  const getHintState = (hintIndex: number, totalHints: number, isUsed: boolean) => {
    const isLatest = hintIndex === totalHints - 1;
    
    if (isLatest) {
      return 'active'; // Latest hint is always active
    }
    
    return isUsed ? 'used' : 'unused'; // Past hints: used or unused
  };

  const hintState = getHintState(index, totalHints, hint.is_used);

  const handleAccept = () => {
    sendMessage.mutate({
      chat_id: dialogId,
      role: 'operator',
      text: hint.text,
      is_used: true,
    });
  };

  const handleEdit = () => {
    onEditHint?.(hint.text);
  };

  return (
    <div
      className={clsx(
        s.aiMessage,
        s.ai,
        s[hintState] // active, used, or unused
      )}
    >
      <Stack direction="row" align="start" gap="xs">
        <div className={s.hintIndicator}>
          {hintState === 'active' && '🔥'}
          {hintState === 'used' && '✅'}
          {hintState === 'unused' && '⚪'}
        </div>
        <Stack direction="column" gap="xs" style={{ flex: 1 }}>
          <Typography 
            variant="text-s" 
            color={hintState === 'unused' ? 'tertiary' : 'secondary'}
            style={{ 
              opacity: hintState === 'unused' ? 0.6 : 1,
              fontWeight: hintState === 'active' ? 500 : 400
            }}
          >
            {hint.text}
          </Typography>
          <Typography 
            variant="text-xs" 
            color="tertiary" 
            style={{ 
              opacity: hintState === 'unused' ? 0.4 : 0.7 
            }}
          >
            {new Date(hint.date).toLocaleTimeString('ru-RU', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
            {hintState === 'active' && ' • Новая подсказка'}
            {hintState === 'used' && ' • Использована'}
            {hintState === 'unused' && ' • Не использована'}
          </Typography>
          
          {hintState === 'active' && (
            <Stack direction="row" gap="xs" style={{ marginTop: '8px' }} fullWidth>
              <Button
                size="xs"
                variant="contained"
                onClick={handleAccept}
                disabled={sendMessage.isPending}
                fullWidth
              >
                Принять
              </Button>
              <Button
                size="xs"
                variant="ghost"
                onClick={handleEdit}
                fullWidth
              >
                Редактировать
              </Button>
            </Stack>
          )}
        </Stack>
      </Stack>
    </div>
  );
}; 