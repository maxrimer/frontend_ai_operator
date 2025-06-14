import { FC, useRef, useEffect, useState } from 'react';

import {
  BanIcon,
  ChevronLeftIcon,
  MenuHorizontalIcon,
  UserCircleOutlineIcon } from '@ozen-ui/icons';
import { scrollContainerToElement } from '@ozen-ui/kit/__inner__/cjs/utils/scrollContainerToElement';
import { Avatar } from '@ozen-ui/kit/Avatar';
import { Button } from '@ozen-ui/kit/ButtonNext';
import { Card } from '@ozen-ui/kit/Card';
import { Dialog, DialogBody, DialogFooter, DialogHeader, DialogSubtitle, DialogTitle } from '@ozen-ui/kit/Dialog';
import { Divider } from '@ozen-ui/kit/Divider';
import { IconButton } from '@ozen-ui/kit/IconButtonNext';
import { Menu, MenuItem, MenuItemIcon, MenuItemText } from '@ozen-ui/kit/Menu';
import { spacing } from '@ozen-ui/kit/MixSpacing';
import { Stack } from '@ozen-ui/kit/Stack';
import { Textarea } from '@ozen-ui/kit/Textarea';
import { cnTypography, Typography } from '@ozen-ui/kit/Typography';
import { useBoolean } from '@ozen-ui/kit/useBoolean';
import { useBreakpoints } from '@ozen-ui/kit/useBreakpoints';
import { useQueryClient } from '@tanstack/react-query';

import { useCloseDialog, DialogStatus } from '../../../../entities/dialog/api';
import { useDialog } from '../../../../entities/dialog/libs/useDialog/useDialog';
import { DialogStatus as DialogStatusComponent } from '../DialogStatus';
import { DualInput } from '../DualInput';
import { Message } from '../Message';

import s from './Conversation.module.css';

type ConversationProps = {
  id?: number | null;
  onClickBackButton?: () => void;
  operatorMessageValue?: string;
  onOperatorMessageChange?: (value: string) => void;
};

// Close Dialog Modal Component
type CloseDialogModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (feedback?: string) => void;
  loading?: boolean;
};

const CloseDialogModal: FC<CloseDialogModalProps> = ({
  open,
  onClose,
  onConfirm,
  loading = false,
}) => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    onConfirm(feedback.trim() || undefined);
    setFeedback('');
  };

  const handleClose = () => {
    setFeedback('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogHeader>
        <DialogTitle>Закрыть диалог</DialogTitle>
        <DialogSubtitle>Вы уверены, что хотите закрыть этот диалог?</DialogSubtitle>
      </DialogHeader>
      
      <DialogBody>
        <Stack gap="m" direction="column">
          <Typography>
            После закрытия диалога вы не сможете продолжить переписку с клиентом. 
            Это действие нельзя будет отменить.
          </Typography>
          <Typography variant="text-s" color="secondary">
            Оставьте отзыв о диалоге (необязательно):
          </Typography>
          <Textarea
            placeholder="Введите ваш отзыв о диалоге с клиентом..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={3}
            disabled={loading}
          />
        </Stack>
      </DialogBody>
      
      <DialogFooter>
        <Stack direction="row" gap="s">
          <Button color="secondary" onClick={handleClose} disabled={loading}>
            Отмена
          </Button>
          <Button 
            variant="contained" 
            color="error"
            onClick={handleSubmit}
            loading={loading}
          >
            Закрыть диалог
          </Button>
        </Stack>
      </DialogFooter>
    </Dialog>
  );
};

export const Conversation: FC<ConversationProps> = ({
  onClickBackButton,
  id: idProp,
  operatorMessageValue,
  onOperatorMessageChange,
}) => {
  const [open, { off, toggle }] = useBoolean();
  const [closeDialogModalOpen, setCloseDialogModalOpen] = useState(false);
  const menuAnchorRef = useRef<HTMLButtonElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const laseMessageRef = useRef<HTMLDivElement | null>(null);
  const { m } = useBreakpoints();
  const isMobile = !m;
  const queryClient = useQueryClient();
  
  // Fetch individual dialog data when ID is provided using useDialog
  const { dialog } = useDialog({ dialogId: idProp || 0 });
  
  // Close dialog mutation
  const closeDialogMutation = useCloseDialog();

  useEffect(() => {
    if (dialog) {
      scrollContainerToElement({
        container: bodyRef.current,
        element: laseMessageRef.current,
        behavior: 'auto',
      });
    }
  }, [dialog]);

  const handleSendMessage = (message: string, type: 'client' | 'operator') => {
    // Here you would handle sending the message
    console.log(`Sending ${type} message:`, message);

    // Clear the operator message value after sending
    if (type === 'operator' && onOperatorMessageChange) {
      onOperatorMessageChange('');
    }
  };

  const handleCloseDialog = () => {
    setCloseDialogModalOpen(true);
    off(); // Close menu
  };


  const handleConfirmCloseDialog = (feedback?: string) => {
    if (!idProp) return;
    
    // Log feedback if provided
    if (feedback) {
      console.log('Operator feedback on dialog close:', feedback);
      // TODO: Send feedback to API along with dialog close
    }
    
    closeDialogMutation.mutate(idProp, {
      onSuccess: () => {
        // Invalidate caches
        queryClient.invalidateQueries({
          queryKey: ['dialogs', 'all'],
        });

        queryClient.invalidateQueries({
          queryKey: ['dialog', idProp],
        });
        
        setCloseDialogModalOpen(false);
        
        // Optionally navigate back or handle post-close logic
        onClickBackButton?.();
      },
      onError: (error) => {
        console.error('Failed to close dialog:', error);
        // Handle error - maybe show a snackbar
      }
    });
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
          <Avatar name='client'>
            <UserCircleOutlineIcon/>
          </Avatar>
          <Stack direction="column" style={{ minWidth: 0 }}>
            <Typography variant="text-m_1" noWrap>
              {dialog.customer_number}
            </Typography>
            <Stack direction="row" align="center" gap="s">
              <DialogStatusComponent status={dialog.status || DialogStatus.ACTIVE} size="xs" />
            </Stack>
          </Stack>
        </Stack>
        <Stack className={spacing({ ml: 'auto' })} gap="s">
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
            <MenuItem onClick={handleCloseDialog}>
              <MenuItemIcon>
                <BanIcon />
              </MenuItemIcon>
              <MenuItemText primary="Закрыть диалог" className={cnTypography({ color: 'error' })} />
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
        <div />
        {dialog.messages?.map((message) => {
          return (
            <Message
              {...message}
              ref={laseMessageRef}
              key={message.date}
              type={message.role === 'client' || message.role === 'customer' ? 'incoming' : 'outgoing'}
            />
          );
        })}
      </Stack>
      <Divider color="secondary" />
      <DualInput 
        dialogId={idProp!} 
        onSendMessage={handleSendMessage} 
        operatorMessageValue={operatorMessageValue}
        disabled={dialog.status === DialogStatus.CLOSED}
      />
      <CloseDialogModal
        open={closeDialogModalOpen}
        onClose={() => setCloseDialogModalOpen(false)}
        onConfirm={handleConfirmCloseDialog}
        loading={closeDialogMutation.isPending}
      />
    </Card>
  );
};
