import { FC } from 'react';

export interface User {
  fullName: string;
  name: string;
  online?: boolean;
  role?: string;
  avatar?: {
    icon?: FC;
    url?: string;
  };
}

export const user = {
  fullName: 'Аслан К',
  name: 'Аслан',
  role: 'Менеджер по работе с клиентами',
  avatar: {
    url: '',
  },
};
