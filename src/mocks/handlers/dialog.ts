import { http, HttpResponse } from 'msw';

import { appConfig } from '../../configs/app.config';
import { GetAllDialogsResponse } from '../../entities/dialog/all/model';
import { CreateDialogResponse } from '../../entities/dialog/create/model';
import { GetDialogResponse } from '../../entities/dialog/get/model';

const baseUrl = appConfig.apiUrl;

export const dialogHandlers = [
  // Create dialog
  http.post(`${baseUrl}/dialog`, () => {
    return HttpResponse.json<CreateDialogResponse>({
      id: 1,
      hint: 'Sample hint',
    });
  }),

  // Create new dialog
  http.post(`${baseUrl}/dialog/create`, () => {
    return HttpResponse.json({
      chat_id: 1,
      messages: [],
      status: 'active',
    });
  }),

  // Get dialog
  http.get(`${baseUrl}/dialog/:id`, ({ params }) => {
    return HttpResponse.json<GetDialogResponse>({
      chat_id: Number(params.id),
      customer: 'John Doe',
      messages: [
        {
          role: 'customer',
          text: 'Hello',
          is_used: true,
          date: new Date().toISOString(),
        },
        {
          role: 'operator',
          text: 'Hi there!',
          is_used: true,
          date: new Date().toISOString(),
        },
      ],
      summary: 'Initial conversation',
      status: 'active',
      createdAt: new Date().toISOString(),
    });
  }),

  // Get all dialogs
  http.get(`${baseUrl}/dialog/all`, () => {
    return HttpResponse.json<GetAllDialogsResponse>([
      {
        chat_id: 1,
        lastMessage: 'Hello, how can I help you?',
        status: 'active',
        summary: 'Initial conversation about product inquiry',
      },
      {
        chat_id: 2,
        lastMessage: 'Thank you for your help!',
        status: 'closed',
        summary: 'Resolved customer support ticket',
      },
    ]);
  }),

  // Add hint
  http.post(`${baseUrl}/dialog/hint`, () => {
    return HttpResponse.json(true);
  }),

  // Close dialog
  http.post(`${baseUrl}/dialog/close`, () => {
    return HttpResponse.json(true);
  }),
]; 