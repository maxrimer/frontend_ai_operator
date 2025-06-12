import { CallStatus } from '../entities';

export const orderStatusVariant = Object.values(CallStatus);

export type OrderStatus = CallStatus;

export type Order = {
  id: string;
  type: string;
  caller: string;
  duration: string;
  date: string;
  status: OrderStatus;
  detail?: string;
};

export const orders: Order[] = [
  {
    id: '90336',
    type: 'Входящий',
    caller: 'Алексей Петров',
    date: '2023-11-11T00:00:00.000Z',
    status: CallStatus.RESOLVED,
    duration: '15:30',
    detail: 'Консультация по банковским продуктам. Вопрос полностью решен.',
  },
  {
    id: '90337',
    type: 'Исходящий',
    caller: 'Мария Сидорова',
    date: '2023-11-11T00:00:00.000Z',
    status: CallStatus.INFO_PROVIDED,
    duration: '08:45',
    detail: 'Предоставлена информация о тарифах по картам.',
  },
  {
    id: '90338',
    type: 'Входящий',
    caller: 'Иван Кузнецов',
    date: '2023-10-10T00:00:00.000Z',
    status: CallStatus.FOLLOW_UP_NEEDED,
    duration: '22:15',
    detail: 'Требуется дополнительная проверка документов клиента.',
  },
  {
    id: '90339',
    type: 'Исходящий',
    caller: 'Елена Васильева',
    date: '2023-10-09T00:00:00.000Z',
    status: CallStatus.CALLBACK_SCHEDULED,
    duration: '12:30',
    detail: 'Назначен обратный звонок на завтра в 14:00.',
  },
  {
    id: '90340',
    type: 'Входящий',
    caller: 'Дмитрий Новиков',
    date: '2023-10-05T00:00:00.000Z',
    status: CallStatus.ESCALATED_L2,
    duration: '18:20',
    detail: 'Сложный вопрос по кредиту передан специалисту.',
  },
  {
    id: '90341',
    type: 'Исходящий',
    caller: 'Анна Морозова',
    date: '2023-10-05T00:00:00.000Z',
    status: CallStatus.KYC_PENDING,
    duration: '05:15',
    detail: 'Запрошены дополнительные документы для верификации.',
  },
  {
    id: '90342',
    type: 'Входящий',
    caller: 'Сергей Волков',
    date: '2023-10-05T00:00:00.000Z',
    status: CallStatus.COMPLAINT_LOGGED,
    duration: '25:40',
    detail: 'Зарегистрирована жалоба на качество обслуживания.',
  },
  {
    id: '90343',
    type: 'Исходящий',
    caller: 'Татьяна Лебедева',
    date: '2023-10-05T00:00:00.000Z',
    status: CallStatus.SHORT_ABANDON,
    duration: '00:05',
    detail: 'Клиент сбросил звонок в течение 5 секунд.',
  },
  {
    id: '90344',
    type: 'Входящий',
    caller: 'Михаил Зайцев',
    date: '2023-10-05T00:00:00.000Z',
    status: CallStatus.FRAUD_SUSPECT,
    duration: '03:20',
    detail: 'Подозрительная активность. Переданы данные в отдел безопасности.',
  },
];
