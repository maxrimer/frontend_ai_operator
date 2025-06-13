import { useState, useCallback, CSSProperties, useRef, useEffect } from 'react';

import { ExternalLinkIcon } from '@ozen-ui/icons';
import { Button } from '@ozen-ui/kit/ButtonNext';
import { useBreakpoints } from '@ozen-ui/kit/useBreakpoints';
import { useTimer } from '@ozen-ui/kit/useTimer';

import { useCreateNewDialog } from '../../entities/dialog/create/api';
import { chats } from '../../helpers';

import s from './ChatPage.module.css';
import { ChatList, Conversation, AIPrompter } from './components';

type UseAnimationProps = {
  entered?: () => void;
  exited?: () => void;
  timeout?: number;
};

function useAnimation({ entered, exited, timeout }: UseAnimationProps) {
  const [state, setState] = useState<boolean>();
  const [animated, setAnimated] = useState<boolean>(false);

  const { startTimer } = useTimer({
    startTime: 0,
    interval: timeout,
    endTime: timeout,
    onTimerEnd: () => {
      setAnimated(false);
      const fn = state ? entered : exited;
      fn?.();
    },
  });

  const slide = useCallback(() => {
    setAnimated(true);
    setState((prevState) => !prevState);
    startTimer();
  }, [startTimer]);

  return { slide, state: state ? 'enter' : 'exit', animated };
}

const FOCUSABLE_SELECTOR = [
  'input',
  'select',
  'textarea',
  'a[href]',
  'button',
  '[tabindex]',
  'audio[controls]',
  'video[controls]',
];

const getFocusableElements = (
  container: HTMLElement,
  selector = FOCUSABLE_SELECTOR
): HTMLElement[] =>
  Array.from(
    container.querySelectorAll<HTMLElement>(selector.join(','))
  ).filter((el) => !el.hasAttribute('disabled'));

const timeout = 300;

export const ChatPage = () => {
  const { m } = useBreakpoints();
  const ref = useRef<HTMLDivElement | null>(null);
  const isMobile = !m;
  const [chatId, setChatId] = useState<number | null>(chats[0].chat_id);
  const { mutate: createNewDialog, isPending, data: newDialog } = useCreateNewDialog();

  const preventFocus = (active: boolean) => {
    const focusableElements = getFocusableElements(ref.current!);

    for (const item of focusableElements) {
      item.tabIndex = active ? -1 : 0;
    }
  };

  const close = () => {
    if (isMobile) slide();
  };

  const open = (id: number) => {
    setChatId(id);
    if (isMobile) slide();
  };

  const { slide, state, animated } = useAnimation({
    exited: () => setChatId(null),
    timeout,
  });

  useEffect(() => {
    preventFocus(animated);
  }, [animated]);

  console.log('newDialog', newDialog);

  return (
    <div className={s.chat}>
      <div
        ref={ref}
        className={s.chatContainer}
        style={
          {
            '--chat-translate-x': state === 'enter' ? '-100%' : '0%',
            '--chat-translate-timeout': `${timeout}ms`,
          } as CSSProperties
        }
      >
        <div
          className={s.chatListBlock}
          style={{
            visibility:
              isMobile && state === 'enter' && !animated ? 'hidden' : 'visible',
          }}
        >
          <Button
            loading={isPending}
            onClick={() => createNewDialog()}
          >
            <ExternalLinkIcon />
            Create New Dialog
          </Button>
          <ChatList id={chatId} onClickChatListItem={open} />
        </div>
        <div
          className={s.conversationBlock}
          style={{
            visibility:
              isMobile && state === 'exit' && !animated ? 'hidden' : 'visible',
          }}
        >
          <Conversation id={chatId} onClickBackButton={close} />
        </div>
        <AIPrompter />
      </div>
    </div>
  );
};
