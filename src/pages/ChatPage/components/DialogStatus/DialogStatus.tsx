import { FC } from 'react';

import { Tag } from '@ozen-ui/kit/TagNext';

import { DialogStatus as DialogStatusEnum, dialogStatusLabels, dialogStatusColors } from '../../../../entities/dialog';

export type DialogStatusProps = {
  status: DialogStatusEnum | string;
  size?: 'xs' | 's' | 'm' | 'l';
};

export const DialogStatus: FC<DialogStatusProps> = ({ 
  status, 
  size = 's' 
}) => {
  // Handle both enum values and string values for backward compatibility
  const statusValue = Object.values(DialogStatusEnum).includes(status as DialogStatusEnum) 
    ? status as DialogStatusEnum 
    : DialogStatusEnum.ACTIVE; // Default fallback
  
  const label = dialogStatusLabels[statusValue];
  const color = dialogStatusColors[statusValue];
  
  return <Tag as="span" color={color} label={label} size={size} />;
}; 