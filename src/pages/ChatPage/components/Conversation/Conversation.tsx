import { FC, useRef, useEffect } from 'react';

import {
  ArchiveIcon,
  BanIcon,
  ChevronLeftIcon,
  DeleteIcon,
  MenuHorizontalIcon,
  SearchIcon,
  SoundOffIcon,
} from '@ozen-ui/icons';
import { scrollContainerToElement } from '@ozen-ui/kit/__inner__/cjs/utils/scrollContainerToElement';
import { Avatar } from '@ozen-ui/kit/Avatar';
import { Card } from '@ozen-ui/kit/Card';
import { Divider } from '@ozen-ui/kit/Divider';
import { IconButton } from '@ozen-ui/kit/IconButtonNext';
import { Menu, MenuItem, MenuItemIcon, MenuItemText } from '@ozen-ui/kit/Menu';
import { spacing } from '@ozen-ui/kit/MixSpacing';
import { Stack } from '@ozen-ui/kit/Stack';
import { cnTypography, Typography } from '@ozen-ui/kit/Typography';
import { useBoolean } from '@ozen-ui/kit/useBoolean';
import { useBreakpoints } from '@ozen-ui/kit/useBreakpoints';

import { useDialog } from '../../../../entities/dialog/libs/useDialog/useDialog';
import { DualInput } from '../DualInput';
import { Message } from '../Message';

import s from './Conversation.module.css';

type ConversationProps = {
  id?: number | null;
  onClickBackButton?: () => void;
};

export const Conversation: FC<ConversationProps> = ({
  onClickBackButton,
  id: idProp,
}) => {
  const [open, { off, toggle }] = useBoolean();
  const menuAnchorRef = useRef<HTMLButtonElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const laseMessageRef = useRef<HTMLDivElement | null>(null);
  const { m } = useBreakpoints();
  const isMobile = !m;
  
  // Fetch individual dialog data when ID is provided using useDialog
  const { dialog } = useDialog({ dialogId: idProp || 0 });

  useEffect(() => {
    if (dialog) {
      scrollContainerToElement({
        container: bodyRef.current,
        element: laseMessageRef.current,
        behavior: 'auto',
      });
    }
  }, [dialog]);

  const handleSendMessage = (message: string, type: 'customer' | 'operator') => {
    // Here you would handle sending the message
    console.log(`Sending ${type} message:`, message);
    // You can implement the actual message sending logic here
  };

  if (!idProp) {
    return (
      <Card
        borderWidth="none"
        className={s.conversation}
        as={Stack}
        align="center"
        justify="center"
        disabled
      >
        <Card>Здесь пусто — выросла капуста!</Card>
      </Card>
    );
  }

  if (!dialog) {
    return (
      <Card
        borderWidth="none"
        className={s.conversation}
        as={Stack}
        align="center"
        justify="center"
      >
        <Card>Loading conversation...</Card>
      </Card>
    );
  }

  return (
    <Card borderWidth="none" className={s.conversation}>
      <Stack gap="m" align="center" className={s.conversationHeader} fullWidth>
        {isMobile && (
          <IconButton
            variant="function"
            icon={ChevronLeftIcon}
            onClick={onClickBackButton}
          />
        )}
        <Stack align="center" gap="l" style={{ minWidth: 0 }}>
          <Avatar name={dialog.customer} />
          <Stack direction="column" style={{ minWidth: 0 }}>
            <Typography variant="text-m_1" noWrap>
              {dialog.customer}
            </Typography>
            <Typography variant="text-s" color="tertiary" noWrap>
              {dialog.status || 'В сети'}
            </Typography>
          </Stack>
        </Stack>
        <Stack className={spacing({ ml: 'auto' })} gap="s">
          <IconButton size="s" icon={<SearchIcon size="m" />} />
          <IconButton
            ref={menuAnchorRef}
            size="s"
            icon={<MenuHorizontalIcon size="m" />}
            onClick={toggle}
          />
          <Menu
            open={open}
            onClose={off}
            anchorRef={menuAnchorRef}
            placement="bottom-end"
            style={{ minWidth: 200 }}
          >
            <MenuItem>
              <MenuItemIcon>
                <BanIcon />
              </MenuItemIcon>
              <MenuItemText primary="Блокировать" />
            </MenuItem>
            <MenuItem>
              <MenuItemIcon>
                <ArchiveIcon />
              </MenuItemIcon>
              <MenuItemText primary="Архив" />
            </MenuItem>
            <MenuItem>
              <MenuItemIcon>
                <SoundOffIcon />
              </MenuItemIcon>
              <MenuItemText primary="Беззвучный" />
            </MenuItem>
            <MenuItem>
              <MenuItemIcon>
                <DeleteIcon className={cnTypography({ color: 'error' })} />
              </MenuItemIcon>
              <MenuItemText
                primary="Удалить"
                primaryTypographyProps={{ color: 'error' }}
              />
            </MenuItem>
          </Menu>
        </Stack>
      </Stack>
      <Divider color="secondary" />
      <Stack
        direction="column"
        className={s.conversationBody}
        ref={bodyRef}
        fullWidth
      >
        {dialog.messages?.map((message) => {
          return (
            <Message
              {...message}
              ref={laseMessageRef}
              key={message.date}
              type={message.role === 'operator' ? 'incoming' : 'outgoing'}
            />
          );
        })}
      </Stack>
      <Divider color="secondary" />
      <DualInput onSendMessage={handleSendMessage} />
    </Card>
  );
};
