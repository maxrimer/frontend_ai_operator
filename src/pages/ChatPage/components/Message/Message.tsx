import { forwardRef } from 'react';

import { Avatar } from '@ozen-ui/kit/Avatar';
import { spacing } from '@ozen-ui/kit/MixSpacing';
import { Paper } from '@ozen-ui/kit/Paper';
import { Stack } from '@ozen-ui/kit/Stack';
import { Typography } from '@ozen-ui/kit/Typography';
import clsx from 'clsx';

import { DialogMessage } from '../../../../entities/dialog/get/model';
import { formatDate } from '../../utils';

import s from './Message.module.css';

export const Message = forwardRef<HTMLDivElement, DialogMessage & { type: 'incoming' | 'outgoing' }>(
  ({ text, type, date }, ref) => {
    return (
      <Stack
        className={clsx(s.messageContainer, s[type], spacing({ mb: 'xl' }))}
        gap="m"
        ref={ref}
        align="center"
        fullWidth
      >
        <Avatar name={type === 'incoming' ? 'Клиент' : 'Оператор'} size="s" />
        <Stack
          gap="xs"
          direction="column"
          align={type === 'incoming' ? 'start' : 'end'}
        >
          <Stack
            className={clsx(s.message, spacing({ p: 'm' }))}
            as={Paper}
            direction="column"
            gap="xs"
            radius="l"
          >
            <Typography as="span" className={s.text}>
              {text}
            </Typography>
          </Stack>
          <Typography
            variant="text-s"
            color="tertiary"
            className={spacing({ px: 'm' })}
          >
            {formatDate(date)}
          </Typography>
        </Stack>
      </Stack>
    );
  }
);
