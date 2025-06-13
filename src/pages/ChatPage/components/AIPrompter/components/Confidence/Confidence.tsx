import { FC } from 'react';

import { Stack } from '@ozen-ui/kit/Stack';
import { Typography } from '@ozen-ui/kit/Typography';

import s from './Confidence.module.css';

type ConfidenceProps = {
  value: number | null; // 0-1 or null
  size?: 'xs' | 's' | 'm';
};

export const Confidence: FC<ConfidenceProps> = ({ value, size = 's' }) => {
  // Return null if value is null
  if (value === null) return null;
  
  // Ensure value is between 0 and 1, then convert to percentage
  const normalizedValue = Math.max(0, Math.min(1, value));
  const percentageValue = Math.round(normalizedValue * 100);
  
  // Determine confidence level and color
  const getConfidenceLevel = (confidence: number) => {
    if (confidence >= 0.8) return { level: 'Высокая', color: 'success' };
    if (confidence >= 0.6) return { level: 'Средняя', color: 'warning' };

    return { level: 'Низкая', color: 'error' };
  };

  const { color } = getConfidenceLevel(normalizedValue);

  return (
    <Stack direction="row" align="center" gap="xs">
      <div className={`${s.confidenceBar} ${s[size]}`}>
        <div 
          className={`${s.confidenceFill} ${s[color]}`}
          style={{ width: `${percentageValue}%` }}
        />
      </div>
      <Typography 
        variant={size === 'xs' ? 'text-xs' : 'text-s'} 
        color="tertiary"
        style={{ minWidth: 'fit-content' }}
      >
        {percentageValue}%
      </Typography>
    </Stack>
  );
}; 