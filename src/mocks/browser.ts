import { setupWorker } from 'msw/browser';

import { dialogHandlers } from './handlers/dialog';

export const worker = setupWorker(...dialogHandlers); 