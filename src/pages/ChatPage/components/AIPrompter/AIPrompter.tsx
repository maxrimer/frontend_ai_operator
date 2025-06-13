import { FC, useRef, useEffect } from 'react';

import { Card } from '@ozen-ui/kit/Card';
import { Divider } from '@ozen-ui/kit/Divider';
import { Stack } from '@ozen-ui/kit/Stack';
import { Typography } from '@ozen-ui/kit/Typography';

import { useDialog } from '../../../../entities/dialog/libs/useDialog/useDialog';

import s from './AIPrompter.module.css';
import { HintItem } from './components/HintItem';


type AIPrompterProps = {
  dialogId?: number | null;
  onEditHint?: (hintText: string) => void;
};

export const AIPrompter: FC<AIPrompterProps> = ({ dialogId, onEditHint }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Get dialog data to access hints
  const { dialog } = useDialog({ dialogId: dialogId || 0 });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [dialog?.hints]);

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
          dialog.hints.map((hint, index) => (
            <HintItem
              key={hint.date}
              hint={hint}
              index={index}
              totalHints={dialog.hints.length}
              dialogId={dialogId}
              onEditHint={onEditHint}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
    </Card>
  );
}; 