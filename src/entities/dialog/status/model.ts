export enum DialogStatus {
  ACTIVE = 'active',
  CLOSED = 'closed'
}

export const dialogStatusLabels: Record<DialogStatus, string> = {
  [DialogStatus.ACTIVE]: 'Активный',
  [DialogStatus.CLOSED]: 'Закрыт'
};

export const dialogStatusColors: Record<DialogStatus, 'success' | 'error' | 'warning' | 'info' | 'neutral'> = {
  [DialogStatus.ACTIVE]: 'success',
  [DialogStatus.CLOSED]: 'neutral'
}; 