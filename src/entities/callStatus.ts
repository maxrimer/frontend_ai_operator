/**
 * Универсальные статусы звонков для банковского контакт-центра
 * Disposition-метки для wrap-up агента и аналитики KPI
 */
export enum CallStatus {
  // Исход разговора
  /** Вопрос клиента полностью закрыт, действий не требуется */
  RESOLVED = 'RESOLVED',
  /** Нужен дополнительный звонок, письмо или проверка данных */
  FOLLOW_UP_NEEDED = 'FOLLOW_UP_NEEDED',
  /** Передано супервизору / профильному отделу */
  ESCALATED_L2 = 'ESCALATED_L2',
  /** Открыт тикет претензии, запускается регламент */
  COMPLAINT_LOGGED = 'COMPLAINT_LOGGED',
  /** Клиенту даны справочные сведения, без дальнейших действий */
  INFO_PROVIDED = 'INFO_PROVIDED',
  /** Триггер для Fraud-unit, блокируются автоматические исходы */
  FRAUD_SUSPECT = 'FRAUD_SUSPECT',
  /** Запрошены/ожидаются документы или доп. вопросы */
  KYC_PENDING = 'KYC_PENDING',
  /** Признаки несоответствия требованиям, эскалация в Compliance */
  KYC_FAILED = 'KYC_FAILED',

  // Дальнейшие шаги
  /** Зафиксировано время обратного звонка */
  CALLBACK_SCHEDULED = 'CALLBACK_SCHEDULED',
  /** Клиенту высланы материалы/формы */
  EMAIL_SENT = 'EMAIL_SENT',
  /** Автоматически открыт follow-up в CRM/Back-office */
  TASK_CREATED = 'TASK_CREATED',

  // Тех. итог сессии
  /** Клиент положил трубку после общения */
  DISCONNECT_CLIENT = 'DISCONNECT_CLIENT',
  /** Агент закрыл линию (по регламенту) */
  DISCONNECT_AGENT = 'DISCONNECT_AGENT',
  /** Разрыв связи до wrap-up; чаще попадает в «Abandoned» отчёт */
  CALL_DROPPED = 'CALL_DROPPED',
  /** Клиент ждал < 10 с и ушёл */
  SHORT_ABANDON = 'SHORT_ABANDON',
  /** Клиент ждал ≥ 10 с, влияет на SLA */
  LONG_ABANDON = 'LONG_ABANDON',
}

/**
 * Категории статусов для группировки в UI
 */
export enum CallStatusCategory {
  OUTCOME = 'OUTCOME',           // Исход разговора
  NEXT_STEPS = 'NEXT_STEPS',     // Дальнейшие шаги
  TECHNICAL = 'TECHNICAL',       // Тех. итог сессии
}

/**
 * Маппинг статусов к категориям
 */
export const callStatusToCategory: Record<CallStatus, CallStatusCategory> = {
  [CallStatus.RESOLVED]: CallStatusCategory.OUTCOME,
  [CallStatus.FOLLOW_UP_NEEDED]: CallStatusCategory.OUTCOME,
  [CallStatus.ESCALATED_L2]: CallStatusCategory.OUTCOME,
  [CallStatus.COMPLAINT_LOGGED]: CallStatusCategory.OUTCOME,
  [CallStatus.INFO_PROVIDED]: CallStatusCategory.OUTCOME,
  [CallStatus.FRAUD_SUSPECT]: CallStatusCategory.OUTCOME,
  [CallStatus.KYC_PENDING]: CallStatusCategory.OUTCOME,
  [CallStatus.KYC_FAILED]: CallStatusCategory.OUTCOME,
  [CallStatus.CALLBACK_SCHEDULED]: CallStatusCategory.NEXT_STEPS,
  [CallStatus.EMAIL_SENT]: CallStatusCategory.NEXT_STEPS,
  [CallStatus.TASK_CREATED]: CallStatusCategory.NEXT_STEPS,
  [CallStatus.DISCONNECT_CLIENT]: CallStatusCategory.TECHNICAL,
  [CallStatus.DISCONNECT_AGENT]: CallStatusCategory.TECHNICAL,
  [CallStatus.CALL_DROPPED]: CallStatusCategory.TECHNICAL,
  [CallStatus.SHORT_ABANDON]: CallStatusCategory.TECHNICAL,
  [CallStatus.LONG_ABANDON]: CallStatusCategory.TECHNICAL,
};

/**
 * Человекочитаемые названия статусов на русском языке
 */
export const callStatusLabels: Record<CallStatus, string> = {
  [CallStatus.RESOLVED]: 'Решено',
  [CallStatus.FOLLOW_UP_NEEDED]: 'Не решено → требуется фоллоу-ап',
  [CallStatus.ESCALATED_L2]: 'Переведено на 2-й уровень',
  [CallStatus.COMPLAINT_LOGGED]: 'Жалоба зарегистрирована',
  [CallStatus.INFO_PROVIDED]: 'Запрос информации выполнен',
  [CallStatus.FRAUD_SUSPECT]: 'Подозрение на мошенничество',
  [CallStatus.KYC_PENDING]: 'Необходима верификация личности',
  [CallStatus.KYC_FAILED]: 'Идентификация не пройдена',
  [CallStatus.CALLBACK_SCHEDULED]: 'Перезвон назначен',
  [CallStatus.EMAIL_SENT]: 'Электронное письмо отправлено',
  [CallStatus.TASK_CREATED]: 'Задача создана',
  [CallStatus.DISCONNECT_CLIENT]: 'Клиент завершил вызов',
  [CallStatus.DISCONNECT_AGENT]: 'Агент завершил вызов',
  [CallStatus.CALL_DROPPED]: 'Звонок сорвался',
  [CallStatus.SHORT_ABANDON]: 'Без ответа (короткий сброс)',
  [CallStatus.LONG_ABANDON]: 'Без ответа (длинный)',
};

/**
 * Цветовая схема для статусов (для UI компонентов)
 */
export const callStatusColors: Record<CallStatus, 'success' | 'error' | 'warning' | 'info' | 'neutral'> = {
  [CallStatus.RESOLVED]: 'success',
  [CallStatus.FOLLOW_UP_NEEDED]: 'warning',
  [CallStatus.ESCALATED_L2]: 'info',
  [CallStatus.COMPLAINT_LOGGED]: 'error',
  [CallStatus.INFO_PROVIDED]: 'success',
  [CallStatus.FRAUD_SUSPECT]: 'error',
  [CallStatus.KYC_PENDING]: 'warning',
  [CallStatus.KYC_FAILED]: 'error',
  [CallStatus.CALLBACK_SCHEDULED]: 'info',
  [CallStatus.EMAIL_SENT]: 'info',
  [CallStatus.TASK_CREATED]: 'info',
  [CallStatus.DISCONNECT_CLIENT]: 'neutral',
  [CallStatus.DISCONNECT_AGENT]: 'neutral',
  [CallStatus.CALL_DROPPED]: 'error',
  [CallStatus.SHORT_ABANDON]: 'warning',
  [CallStatus.LONG_ABANDON]: 'error',
}; 