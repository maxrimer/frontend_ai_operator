import { FC, useState } from 'react';

import { Divider } from '@ozen-ui/kit/Divider';
import { spacing } from '@ozen-ui/kit/MixSpacing';
import { Stack } from '@ozen-ui/kit/Stack';
import { Tab, Tabs } from '@ozen-ui/kit/Tabs';
import { Tag } from '@ozen-ui/kit/TagNext';
import clsx from 'clsx';

import { CallStatus, CallStatusCategory, callStatusToCategory } from '../../../../../../entities';
import { Order, OrderStatus } from '../../../../../../helpers';
import { OrdersFilter } from '../../types';

import s from './OrdersPageFilterByStatus.module.css';

export const OrdersPageFilterByStatus: FC<{
  orders?: Order[];
  setFilter?: (params: OrdersFilter) => void;
}> = ({ orders = [], setFilter }) => {
  const [value, setValue] = useState(0);

  const handleClick = (status?: OrderStatus) => () => {
    setFilter?.({ status });
  };

  // Подсчет количества звонков по категориям
  const getCountByCategory = (category?: CallStatusCategory) => {
    if (!category) return orders.length;

    return orders.filter(order => callStatusToCategory[order.status] === category).length;
  };

  const getCountByStatus = (status: CallStatus) => {
    return orders.filter(order => order.status === status).length;
  };

  const technicalCount = getCountByCategory(CallStatusCategory.TECHNICAL);

  return (
    <Stack direction="column">
      <Tabs
        value={value}
        onChange={(_, value) => setValue(value as number)}
        className={clsx(spacing({ px: 'xl', pb: 0, pt: 's' }), s.tabs)}
      >
        <Tab
          label="Все звонки"
          onClick={handleClick(undefined)}
          iconRight={() => <Tag label={orders.length.toString()} color="neutral" size="xs" />}
        />
        <Tab
          label="Результативные"
          onClick={handleClick(CallStatus.RESOLVED)}
          iconRight={() => <Tag label={getCountByStatus(CallStatus.RESOLVED).toString()} color="success" size="xs" />}
        />
        <Tab
          label="Требуют действий"
          onClick={handleClick(CallStatus.FOLLOW_UP_NEEDED)}
          iconRight={() => <Tag label={getCountByStatus(CallStatus.FOLLOW_UP_NEEDED).toString()} color="warning" size="xs" />}
        />
        <Tab
          label="Проблемные"
          onClick={handleClick(CallStatus.COMPLAINT_LOGGED)}
          iconRight={() => <Tag label={getCountByStatus(CallStatus.COMPLAINT_LOGGED).toString()} color="error" size="xs" />}
        />
        <Tab
          label="Технические"
          onClick={handleClick(CallStatus.CALL_DROPPED)}
          iconRight={() => <Tag label={technicalCount.toString()} color="neutral" size="xs" />}
        />
      </Tabs>
      <Divider color="secondary" className={s.divider} />
    </Stack>
  );
};
