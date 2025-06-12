import { FC, useState, useRef, useEffect } from 'react';

import { Button } from '@ozen-ui/kit/ButtonNext';
import { Card } from '@ozen-ui/kit/Card';
import { Divider } from '@ozen-ui/kit/Divider';
import { Input } from '@ozen-ui/kit/Input';
import { Stack } from '@ozen-ui/kit/Stack';
import { Typography } from '@ozen-ui/kit/Typography';

import s from './AIPrompter.module.css';

type AIMessage = {
  id: string;
  type: 'user' | 'ai';
  text: string;
  timestamp: Date;
};

export const AIPrompter: FC = () => {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      type: 'user',
      text: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      const aiMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        text: `Это ответ ИИ на ваш вопрос: "${userMessage.text}". В будущем здесь будет настоящий ИИ помощник.`,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <Card className={s.aiPrompter}>
      <div className={s.aiPrompterHeader}>
        <Stack justify="spaceBetween" align="center">
          <Typography variant="text-m_1">🤖 ИИ Помощник</Typography>
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="xs"
              onClick={clearMessages}
            >
              Очистить
            </Button>
          )}
        </Stack>
      </div>
      
      <Divider color="secondary" />
      
      <div className={s.aiPrompterMessages}>
        {messages.length === 0 ? (
          <div className={s.aiPrompterEmpty}>
            <Typography variant="text-s" color="secondary" align="center">
              Задайте любой вопрос ИИ помощнику
            </Typography>
          </div>
        ) : (
          messages.map(message => (
            <div
              key={message.id}
              className={`${s.aiMessage} ${s[message.type]}`}
            >
              <Typography
                variant="text-s"
                color={message.type === 'user' ? 'primary' : 'secondary'}
              >
                {message.text}
              </Typography>
            </div>
          ))
        )}
        {isLoading && (
          <div className={`${s.aiMessage} ${s.ai} ${s.loading}`}>
            <Typography variant="text-s" color="secondary">
              ИИ печатает...
            </Typography>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <Divider color="secondary" />
      
      <form className={s.aiPrompterInput} onSubmit={handleSubmit}>
        <Stack gap="xs">
          <Input
            placeholder="Спросите что-нибудь у ИИ..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            fullWidth
            size="s"
          />
          <Button
            type="submit"
            size="s"
            disabled={!inputValue.trim() || isLoading}
            fullWidth
          >
            {isLoading ? 'Отправка...' : 'Отправить'}
          </Button>
        </Stack>
      </form>
    </Card>
  );
}; 