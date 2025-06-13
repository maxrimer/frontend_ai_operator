import { FC, useRef, useEffect } from 'react';

import { Card } from '@ozen-ui/kit/Card';
import { Divider } from '@ozen-ui/kit/Divider';
import { Stack } from '@ozen-ui/kit/Stack';
import { Typography } from '@ozen-ui/kit/Typography';
import clsx from 'clsx';

import { useDialog } from '../../../../entities/dialog/libs/useDialog/useDialog';

import s from './AIPrompter.module.css';

type AIPrompterProps = {
  dialogId?: number | null;
};

export const AIPrompter: FC<AIPrompterProps> = ({ dialogId }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Get dialog data to access hints
  const { dialog } = useDialog({ dialogId: dialogId || 0 });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [dialog?.hints]);

  // Helper function to determine hint state
  const getHintState = (hintIndex: number, totalHints: number, isUsed: boolean) => {
    const isLatest = hintIndex === totalHints - 1;
    
    if (isLatest) {
      return 'active'; // Latest hint is always active
    }
    
    return isUsed ? 'used' : 'unused'; // Past hints: used or unused
  };

  if (!dialogId) {
    return (
      <Card className={s.aiPrompter}>
        <div className={s.aiPrompterHeader}>
          <Stack justify="center" align="center">
            <Typography variant="text-m_1">💡 Подсказки для оператора</Typography>
          </Stack>
        </div>
        
        <Divider color="secondary" />
        
        <div className={s.aiPrompterMessages}>
          <div className={s.aiPrompterEmpty}>
            <Typography variant="text-s" color="secondary" align="center">
              Выберите диалог для просмотра подсказок
            </Typography>
          </div>
        </div>
      </Card>
    );
  }

  if (!dialog) {
    return (
      <Card className={s.aiPrompter}>
        <div className={s.aiPrompterHeader}>
          <Stack justify="center" align="center">
            <Typography variant="text-m_1">💡 Подсказки для оператора</Typography>
          </Stack>
        </div>
        
        <Divider color="secondary" />
        
        <div className={s.aiPrompterMessages}>
          <div className={s.aiPrompterEmpty}>
            <Typography variant="text-s" color="secondary" align="center">
              Загрузка подсказок...
            </Typography>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={s.aiPrompter}>
      <div className={s.aiPrompterHeader}>
        <Stack justify="center" align="center">
          <Typography variant="text-m_1">💡 Подсказки для оператора</Typography>
        </Stack>
      </div>
      
      <Divider color="secondary" />
      
      <div className={s.aiPrompterMessages}>
        {dialog.hints.length === 0 ? (
          <div className={s.aiPrompterEmpty}>
            <Typography variant="text-s" color="secondary" align="center">
              Пока нет подсказок для этого диалога
            </Typography>
          </div>
        ) : (
          dialog.hints.map((hint, index) => {
            const hintState = getHintState(index, dialog.hints.length, hint.is_used);
            
            return (
              <div
                key={hint.date}
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
                  </Stack>
                </Stack>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>
    </Card>
  );
}; 