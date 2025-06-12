import { FC } from 'react';

import { Tag } from '@ozen-ui/kit/TagNext';

import { callStatusLabels, callStatusColors } from '../../../../entities';
import { type OrderStatus as OrderStatusType } from '../../../../helpers';

export const OrderStatus: FC<{ status: OrderStatusType }> = ({ status }) => {
  const label = callStatusLabels[status];
  const color = callStatusColors[status];
  
  return <Tag as="span" color={color} label={label} size="s" />;
};
