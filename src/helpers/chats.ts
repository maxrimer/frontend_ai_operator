
import { GetDialogResponse } from '../entities/dialog/get/model';

export const chats: GetDialogResponse[] = [
  {
    chat_id: 1,
    customer: 'Анастасия Петрова',
    messages: [
      {
        role: 'operator',
        text: 'Привет!',
        is_used: true,
        date: '2023-10-08T08:00:00.000Z',
      },
      {
        role: 'operator',
        text: '💪 Подготовила дизайн-макет проекта Marketplaces. Отправила тебе его для ознакомления.',
        is_used: true,
        date: '2023-10-08T08:00:00.000Z',
      },
      {
        role: 'customer',
        text: 'Привет!',
        is_used: true,
        date: '2023-10-09T08:00:00.000Z',
      },
      {
        role: 'customer',
        text: 'Спасибо! Получила. В ближайшее время дам обратную связь.',
        is_used: true,
        date: '2023-10-09T08:00:00.000Z',
      },
      {
        role: 'operator',
        text: 'Спасибо, подруга! Буду ждать.',
        is_used: true,
        date: '2023-10-09T08:00:00.000Z',
      },
    ],
    summary: null,
    status: null,
    createdAt: '2023-10-08T08:00:00.000Z'
  },
  {
    chat_id: 2,
    customer: 'Саят Ахметов',
    messages: [
      {
        role: 'operator',
        text: 'Здравствуйте!',
        is_used: true,
        date: '2023-10-09T08:00:00.000Z',
      },
    ],
    summary: null,
    status: null,
    createdAt: '2023-10-09T08:00:00.000Z'
  },
  {
    chat_id: 3,
    customer: 'Александр Ишков',
    messages: [
      {
        role: 'operator',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquam animi cumque distinctio est et facere maiores minima minus obcaecati, odit porro, quam, quod rem repudiandae tempore temporibus ut veniam.',
        is_used: true,
        date: '2023-10-09T08:00:00.000Z',
      },
    ],
    summary: null,
    status: null,
    createdAt: '2023-10-09T08:00:00.000Z'
  },
  {
    chat_id: 4,
    customer: 'Арсен Насипов',
    messages: [
      {
        role: 'operator',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquam animi cumque distinctio est et facere maiores minima minus obcaecati, odit porro, quam, quod rem repudiandae tempore temporibus ut veniam.',
        is_used: true,
        date: '2023-10-08T08:00:00.000Z',
      },
    ],
    summary: null,
    status: null,
    createdAt: '2023-10-08T08:00:00.000Z'
  },
  {
    chat_id: 5,
    customer: 'Bereke Bank',
    messages: [
      {
        role: 'operator',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquam animi cumque distinctio est et facere maiores minima minus obcaecati, odit porro, quam, quod rem repudiandae tempore temporibus ut veniam.',
        is_used: true,
        date: '2023-10-07T08:00:00.000Z',
      },
    ],
    summary: null,
    status: null,
    createdAt: '2023-10-07T08:00:00.000Z'
  },
  {
    chat_id: 6,
    customer: 'Хоуми',
    messages: [
      {
        role: 'operator',
        text: 'Погнали на обед?',
        is_used: true,
        date: '2023-10-07T08:00:00.000Z',
      },
      {
        role: 'customer',
        text: 'Привет! Гоу! Куда пойдем?',
        is_used: true,
        date: '2023-10-07T08:00:00.000Z',
      },
    ],
    summary: null,
    status: null,
    createdAt: '2023-10-07T08:00:00.000Z'
  },
];
