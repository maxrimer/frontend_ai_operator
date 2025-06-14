import { FC } from 'react';

import { Button } from '@ozen-ui/kit/ButtonNext';
import { Link } from '@ozen-ui/kit/Link';
import { Stack } from '@ozen-ui/kit/Stack';
import { Typography } from '@ozen-ui/kit/Typography';
import clsx from 'clsx';

import { useAddHint } from '../../../../../../entities/dialog';
import { DialogMessage } from '../../../../../../entities/dialog/get/model';
import s from '../../AIPrompter.module.css';
import { Confidence } from '../Confidence';

type HintItemProps = {
  hint: DialogMessage;
  index: number;
  totalHints: number;
  dialogId: number;
  onEditHint?: (hintText: string) => void;
};

export const HintItem: FC<HintItemProps> = ({ hint, index, totalHints, dialogId, onEditHint }) => {
  const addHint = useAddHint();

  // Helper function to determine hint state
  const getHintState = (hintIndex: number, totalHints: number, isUsed: boolean) => {
    if (isUsed) return 'used';
    const isLatest = hintIndex === totalHints - 1;
    
    if (isLatest) {
      return 'active'; // Latest hint is always active
    }
    
    return isUsed ? 'used' : 'unused'; // Past hints: used or unused
  };

  // Helper function to get confidence emoji and description
  const getConfidenceDisplay = (confidence: number) => {
    if (confidence >= 0.8) return { emoji: '🎯', description: 'Высокая точность' };
    if (confidence >= 0.6) return { emoji: '⚡', description: 'Средняя точность' };

    return { emoji: '🤔', description: 'Низкая точность' };
  };

  const hintState = getHintState(index, totalHints, hint.is_used);

  const handleAccept = () => {
    addHint.mutate({
      chat_id: dialogId,
      dialog_id: hint.dialog_id,
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
          
          {/* Confidence display below text - only show if confidence is not null */}
          {hint.confidence !== null && (
            <Stack direction="row" align="center" gap="xs">
              <Typography variant="text-xs" style={{ fontSize: '14px' }}>
                {getConfidenceDisplay(hint.confidence).emoji}
              </Typography>
              <Confidence 
                value={hint.confidence} 
                size="xs"
              />
              <Typography 
                variant="text-xs" 
                color="tertiary"
                style={{ 
                  opacity: hintState === 'unused' ? 0.5 : 0.7,
                  fontSize: '11px'
                }}
              >
                {getConfidenceDisplay(hint.confidence).description}
              </Typography>
            </Stack>
          )}
          
          {/* Source link - only show if source is not null */}
          {hint.source && (
            <Link 
              href={hint.source} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                fontSize: '12px',
                opacity: hintState === 'unused' ? 0.6 : 0.8 
              }}
            >
              📄 {hint.source_name || 'Источник документации'}
            </Link>
          )}
          
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
                disabled={addHint.isPending}
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