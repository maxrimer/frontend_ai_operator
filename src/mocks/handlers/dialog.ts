import { http, HttpResponse } from 'msw';

import { appConfig } from '../../configs/app.config';
import { GetAllDialogsResponse } from '../../entities/dialog/all/model';
import { GetDialogResponse } from '../../entities/dialog/get/model';
import { AddHintRequest, AddHintResponse } from '../../entities/dialog/hint/model';
import { SendMessageRequest, SendMessageResponse } from '../../entities/dialog/send/model';

const baseUrl = appConfig.apiUrl;

export const dialogHandlers = [
  // Send message to dialog
  http.post(`${baseUrl}/dialog`, async ({ request }) => {
    const body = await request.json() as SendMessageRequest;
    
    return HttpResponse.json<SendMessageResponse>({
      chat_id: body.chat_id,
      customer_number: `+7-777-123-45-67`,
      messages: [
        {
          role: 'customer',
          text: 'Предыдущее сообщение клиента',
          is_used: true,
          date: new Date(Date.now() - 60000).toISOString(),
          source: null,
          confidence: 0,
          dialog_id: 0,
        },
        {
          role: body.role,
          text: body.text,
          is_used: true,
          date: new Date().toISOString(),
          source: null,
          confidence: 0,
          dialog_id: 0,
        },
      ],
      status: 'active',
      created_at: new Date(Date.now() - 3600000).toISOString(),
      updated_at: new Date().toISOString(),
      summary: `Dialog updated with ${body.role} message`,
    });
  }),

  // Create new dialog
  http.post(`${baseUrl}/dialog/create`, async ({ request }) => {
    const body = await request.json() as { customerNumber: string };

    return HttpResponse.json({
      chat_id: Math.floor(Math.random() * 1000) + 1,
      messages: [],
      status: 'active',
      customer_number: body.customerNumber,
    });
  }),

  // Add hint (accept hint)
  http.post(`${baseUrl}/dialog/hint`, async ({ request }) => {
    const body = await request.json() as AddHintRequest;
    
    console.log(`Hint accepted - Chat ID: ${body.chat_id}, Hint Dialog ID: ${body.dialog_id}, Is Used: ${body.is_used}`);
    
    // In a real implementation, this would mark the hint as used in the database
    // For mock purposes, we just return success
    return HttpResponse.json<AddHintResponse>(true);
  }),

    // Get all dialogs - Returns DialogListItem[] as per the true API contract
    http.get(`${baseUrl}/dialog/chats`, () => {
      return HttpResponse.json<GetAllDialogsResponse>([
        {
          chat_id: 1,
          last_message: 'Привет! Все хорошо, спасибо!',
          status: 'active',
          summary: 'Приветствие и общие вопросы',
        },
        {
          chat_id: 2,
          last_message: 'Здравствуйте! Слушаю вас.',
          status: 'active',
          summary: 'Вопрос по услуге',
        },
        {
          chat_id: 3,
          last_message: 'Добро пожаловать в службу поддержки!',
          status: 'waiting',
          summary: 'Новый диалог',
        },
      ]);
    }),
    
  // Get dialog
  http.get(`${baseUrl}/dialog/:id`, ({ params }) => {
    const dialogId = Number(params.id);

    const dialogData = {
      1: {
        chat_id: 1,
        customer: 'Анна Петрова',
        messages: [
          {
            role: 'customer' as const,
            text: 'Здравствуйте! У меня проблема с интернетом, очень медленно работает.',
            is_used: true,
            date: new Date('2024-01-15T09:00:00Z').toISOString(),
            source: null,
            confidence: 0,
            dialog_id: 0,
          },
          {
            role: 'operator' as const,
            text: 'Здравствуйте, Анна! Я помогу вам решить эту проблему. Скажите, пожалуйста, когда началась проблема?',
            is_used: true,
            date: new Date('2024-01-15T09:01:00Z').toISOString(),
            source: null,
            confidence: 0,
            dialog_id: 0,
          },
          {
            role: 'suffler' as const,
            text: 'Рекомендуется проверить скорость соединения и перезагрузить роутер',
            is_used: true,
            date: new Date('2024-01-15T09:01:30Z').toISOString(),
            source: 'https://support.example.com/internet-troubleshooting',
            confidence: 0.85,
            dialog_id: 101,
          },
          {
            role: 'customer' as const,
            text: 'Началось вчера вечером. Скорость упала с 100 Мбит до 5-10 Мбит.',
            is_used: true,
            date: new Date('2024-01-15T09:02:00Z').toISOString(),
            source: null,
            confidence: 0,
            dialog_id: 0,
          },
          {
            role: 'operator' as const,
            text: 'Понятно. Давайте попробуем перезагрузить ваш роутер. Отключите его на 30 секунд, затем включите обратно.',
            is_used: true,
            date: new Date('2024-01-15T09:03:00Z').toISOString(),
            source: null,
            confidence: 0,
            dialog_id: 0,
          },
          {
            role: 'customer' as const,
            text: 'Хорошо, делаю... Роутер перезагрузился. Проверяю скорость.',
            is_used: true,
            date: new Date('2024-01-15T09:05:00Z').toISOString(),
            source: null,
            confidence: 0,
            dialog_id: 0,
          },
          {
            role: 'operator' as const,
            text: 'Отлично! Какая скорость показывает сейчас?',
            is_used: true,
            date: new Date('2024-01-15T09:06:00Z').toISOString(),
            source: null,
            confidence: 0,
            dialog_id: 0,
          },
          {
            role: 'suffler' as const,
            text: 'Если проблема не решается, возможно нужно проверить кабель или связаться с техподдержкой',
            is_used: false,
            date: new Date('2024-01-15T09:07:00Z').toISOString(),
            source: 'https://support.example.com/cable-diagnostics',
            confidence: 0.72,
            dialog_id: 102,
          },
        ],
        summary: 'Проблемы с интернетом - низкая скорость',
        status: 'active',
        createdAt: new Date('2024-01-15T09:00:00Z').toISOString(),
      },
      2: {
        chat_id: 2,
        customer: 'Михаил Иванов',
        messages: [
          {
            role: 'customer' as const,
            text: 'Добрый день! Хочу подключить дополнительный пакет каналов.',
            is_used: true,
            date: new Date('2024-01-15T10:00:00Z').toISOString(),
            source: null,
            confidence: 0,
            dialog_id: 0,
          },
          {
            role: 'operator' as const,
            text: 'Добрый день, Михаил! Какие каналы вас интересуют?',
            is_used: true,
            date: new Date('2024-01-15T10:01:00Z').toISOString(),
            source: null,
            confidence: 0,
            dialog_id: 0,
          },
          {
            role: 'suffler' as const,
            text: 'Предложить популярные пакеты: Спорт+, Кино премиум, Детский',
            is_used: false,
            date: new Date('2024-01-15T10:01:30Z').toISOString(),
            source: 'https://support.example.com/channel-packages',
            confidence: 0.90,
            dialog_id: 201,
          },
          {
            role: 'customer' as const,
            text: 'Интересуют спортивные каналы. Есть ли пакет со всеми спортивными каналами?',
            is_used: true,
            date: new Date('2024-01-15T10:02:00Z').toISOString(),
            source: null,
            confidence: 0,
            dialog_id: 0,
          },
          {
            role: 'operator' as const,
            text: 'Да, у нас есть пакет "Спорт+" который включает 15 спортивных каналов. Стоимость 299 рублей в месяц.',
            is_used: true,
            date: new Date('2024-01-15T10:03:00Z').toISOString(),
            source: null,
            confidence: 0,
            dialog_id: 0,
          },
          {
            role: 'customer' as const,
            text: 'Звучит интересно! А есть ли какие-то акции сейчас?',
            is_used: true,
            date: new Date('2024-01-15T10:04:00Z').toISOString(),
            source: null,
            confidence: 0,
            dialog_id: 0,
          },
          {
            role: 'suffler' as const,
            text: 'Сейчас действует акция: первый месяц за 99 рублей',
            is_used: true,
            date: new Date('2024-01-15T10:04:30Z').toISOString(),
            source: 'https://support.example.com/current-promotions',
            confidence: 0.95,
            dialog_id: 202,
          },
          {
            role: 'operator' as const,
            text: 'Отлично, что спросили! Сейчас действует акция - первый месяц всего за 99 рублей.',
            is_used: true,
            date: new Date('2024-01-15T10:05:00Z').toISOString(),
            source: null,
            confidence: 0,
            dialog_id: 0,
          },
          {
            role: 'suffler' as const,
            text: 'Можно предложить дополнительные услуги: антивирус, родительский контроль',
            is_used: false,
            date: new Date('2024-01-15T10:06:00Z').toISOString(),
            source: null,
            confidence: null,
            dialog_id: 203,
          },
          {
            role: 'suffler' as const,
            text: 'Новая подсказка: у клиента хорошая история платежей, можно предложить скидку',
            is_used: false,
            date: new Date('2024-01-15T10:07:00Z').toISOString(),
            source: 'https://support.example.com/loyalty-discounts',
            confidence: 0.68,
            dialog_id: 204,
          },
        ],
        summary: 'Подключение пакета спортивных каналов',
        status: 'active',
        createdAt: new Date('2024-01-15T10:00:00Z').toISOString(),
      },
      3: {
        chat_id: 3,
        customer: 'Елена Сидорова',
        messages: [
          {
            role: 'customer' as const,
            text: 'Здравствуйте! Не работает цифровое телевидение, показывает "Нет сигнала".',
            is_used: true,
            date: new Date('2024-01-15T11:00:00Z').toISOString(),
            source: null,
            confidence: 0,
            dialog_id: 0,
          },
          {
            role: 'operator' as const,
            text: 'Здравствуйте, Елена! Проверьте, пожалуйста, все ли кабели надежно подключены к приставке.',
            is_used: true,
            date: new Date('2024-01-15T11:01:00Z').toISOString(),
            source: null,
            confidence: 0,
            dialog_id: 0,
          },
          {
            role: 'customer' as const,
            text: 'Проверила, все подключено правильно. Индикаторы на приставке горят.',
            is_used: true,
            date: new Date('2024-01-15T11:02:00Z').toISOString(),
            source: null,
            confidence: 0,
            dialog_id: 0,
          },
          {
            role: 'suffler' as const,
            text: 'Возможны технические работы в районе или проблема с сигналом',
            is_used: false,
            date: new Date('2024-01-15T11:02:30Z').toISOString(),
            source: 'https://support.example.com/service-outages',
            confidence: 0.82,
            dialog_id: 301,
          },
          {
            role: 'operator' as const,
            text: 'Сейчас проверю статус вашего подключения... В вашем районе сейчас ведутся плановые работы до 14:00.',
            is_used: true,
            date: new Date('2024-01-15T11:04:00Z').toISOString(),
            source: null,
            confidence: 0,
            dialog_id: 0,
          },
          {
            role: 'suffler' as const,
            text: 'Рекомендуется уведомить клиента о возможной компенсации за время простоя',
            is_used: false,
            date: new Date('2024-01-15T11:05:00Z').toISOString(),
            source: null,
            confidence: null,
            dialog_id: 302,
          },
        ],
        summary: 'Проблемы с цифровым ТВ - нет сигнала',
        status: 'waiting',
        createdAt: new Date('2024-01-15T11:00:00Z').toISOString(),
      },
    };

    const dialog = dialogData[dialogId as keyof typeof dialogData];
    
    if (dialog) {
      return HttpResponse.json<GetDialogResponse>(dialog);
    }
    
    // Fallback for unknown dialog IDs
    return HttpResponse.json<GetDialogResponse>({
      chat_id: dialogId,
      customer: `Customer ${dialogId}`,
      messages: [
        {
          role: 'customer' as const,
          text: 'Привет!',
          is_used: true,
          date: new Date().toISOString(),
          source: null,
          confidence: 0,
          dialog_id: 0,
        },
        {
          role: 'operator' as const,
          text: 'Здравствуйте! Как дела?',
          is_used: true,
          date: new Date().toISOString(),
          source: null,
          confidence: 0,
          dialog_id: 0,
        },
      ],
      summary: `Dialog ${dialogId}`,
      status: 'active',
      createdAt: new Date().toISOString(),
    });
  }),

  // Add suffler
  http.post(`${baseUrl}/dialog/suffler`, () => {
    return HttpResponse.json(true);
  }),

  // Close dialog
  http.post(`${baseUrl}/dialog/close`, () => {
    return HttpResponse.json(true);
  }),
]; 