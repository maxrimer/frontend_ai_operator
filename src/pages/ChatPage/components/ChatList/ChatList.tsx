import { FC, useState, useEffect, useMemo } from 'react';

import { ChatsIcon, ExternalLinkIcon } from '@ozen-ui/icons';
import { Avatar } from '@ozen-ui/kit/Avatar';
import { Button } from '@ozen-ui/kit/ButtonNext';
import { Card } from '@ozen-ui/kit/Card';
import { Divider } from '@ozen-ui/kit/Divider';
import { Input } from '@ozen-ui/kit/Input';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@ozen-ui/kit/List';
import { Stack } from '@ozen-ui/kit/Stack';
import clsx from 'clsx';

import { DialogListItem } from '../../../../entities/dialog/all/model';
import { useCreateNewDialog } from '../../../../entities/dialog/create/api';
import { DialogStatus } from '../DialogStatus';

import s from './ChatList.module.css';
import { CreateDialogModal } from './CreateDialogModal';



type ChatListProps = {
  id?: number | null;
  onClickChatListItem?: (id: number) => void;
  dialogList: DialogListItem[];
};

export const ChatList: FC<ChatListProps> = ({
  onClickChatListItem,
  id: isProp,
  dialogList,
}) => {
  const { mutate: createNewDialog, isPending, data: newDialog } = useCreateNewDialog();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Auto-select newly created dialog
  useEffect(() => {
    if (newDialog?.chat_id && onClickChatListItem) {
      onClickChatListItem(newDialog.chat_id);
    }
  }, [newDialog, onClickChatListItem]);

  // Filter dialogList based on search term
  const filteredDialogList = useMemo(() => {
    if (!searchTerm.trim()) {
      return dialogList;
    }

    const searchLower = searchTerm.toLowerCase();

    return dialogList.filter(({ chat_id, last_message, summary, customer_number }) => {
      const summaryMatch = summary?.toLowerCase().includes(searchLower);
      const messageMatch = last_message?.toLowerCase().includes(searchLower);
      const idMatch = chat_id.toString().includes(searchTerm);
      const customerNumberMatch = (customer_number || '').toLowerCase().includes(searchLower);
      
      return summaryMatch || messageMatch || idMatch || customerNumberMatch;
    });
  }, [dialogList, searchTerm]);

  const handleCreateDialog = (customerNumber: string) => {
    // Call the endpoint with customer number
    createNewDialog({ customer_number: customerNumber });
    setIsDialogOpen(false);
  };

  return (
    <Card borderWidth="none" className={s.chatList}>
      <Stack gap="s" direction='column' className={s.chatListHeader}>
        <Input 
          placeholder="Поиск чатов" 
          renderLeft={ChatsIcon} 
          fullWidth 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
            fullWidth
            onClick={() => setIsDialogOpen(true)}
          >
            <Stack direction="rowReverse" gap="s" align="center" justify="center">
              <ExternalLinkIcon />
              Создать новую симуляцию
            </Stack>
          </Button>
      </Stack>
      
      <Divider color="secondary" />
      <div className={s.chatListBody}>
        <List disablePadding>
          {filteredDialogList.map(({ chat_id, last_message: lastMessage, status, customer_number }) => {
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
                  <Avatar name={`Chat ${chat_id}`} />
                </ListItemIcon>
                <ListItemText
                  primary={customer_number || `Dialog ${chat_id}`}
                  secondary={lastMessage}
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
                  <DialogStatus status={status} size="xs" />
                </ListItemIcon>
              </ListItemButton>
            );
          })}
        </List>
      </div>
      <Divider color="secondary" />
      
      <CreateDialogModal
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleCreateDialog}
        loading={isPending}
      />
    </Card>
  );
};
