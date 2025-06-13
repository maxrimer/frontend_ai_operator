import { FC } from 'react';

import { ChatsIcon } from '@ozen-ui/icons';
import { Avatar } from '@ozen-ui/kit/Avatar';
import { Card } from '@ozen-ui/kit/Card';
import { Divider } from '@ozen-ui/kit/Divider';
import { Input } from '@ozen-ui/kit/Input';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@ozen-ui/kit/List';
import { Typography } from '@ozen-ui/kit/Typography';
import clsx from 'clsx';

import { GetDialogResponse } from '../../../../entities/dialog/get/model';
import { chats } from '../../../../helpers';
import { formatDate } from '../../utils';

import s from './ChatList.module.css';

type ChatListProps = {
  id?: GetDialogResponse['chat_id'] | null;
  onClickChatListItem?: (id: GetDialogResponse['chat_id']) => void;
};

export const ChatList: FC<ChatListProps> = ({
  onClickChatListItem,
  id: isProp,
}) => {
  return (
    <Card borderWidth="none" className={s.chatList}>
      <div className={s.chatListHeader}>
        <Input placeholder="Поиск чатов" renderLeft={ChatsIcon} fullWidth />
      </div>
      <Divider color="secondary" />
      <div className={s.chatListBody}>
        <List disablePadding>
          {chats.map(({ chat_id, customer, messages }) => {
            const lastMessage = messages?.[messages.length - 1];

            return (
              <ListItemButton
                key={chat_id}
                align="start"
                className={clsx([chat_id === isProp && s.selected])}
                onClick={() => {
                  onClickChatListItem?.(chat_id);
                }}
              >
                <ListItemIcon>
                  <Avatar name={customer} />
                </ListItemIcon>
                <ListItemText
                  primary={customer}
                  secondary={lastMessage?.text}
                  primaryTypographyProps={{
                    variant: 'text-m_1',
                    noWrap: true,
                  }}
                  secondaryTypographyProps={{
                    variant: 'text-m',
                    color: 'secondary',
                    noWrap: true,
                  }}
                />
                <ListItemIcon>
                  <Typography variant="text-xs" color="secondary">
                    {formatDate(lastMessage?.date)}
                  </Typography>
                </ListItemIcon>
              </ListItemButton>
            );
          })}
        </List>
      </div>
      <Divider color="secondary" />
    </Card>
  );
};
