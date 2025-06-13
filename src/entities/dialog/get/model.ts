export interface DialogMessage {
  role: 'customer' | 'operator' | 'suffler';
  text: string;
  is_used: boolean;
  date: string;
}

export interface GetDialogResponse {
  chat_id: number;
  customer: string;
  messages: DialogMessage[];
  summary: string | null;
  status: string | null;
  createdAt: string;
}