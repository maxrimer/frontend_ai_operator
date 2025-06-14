export interface DialogMessage {
  role: 'client' | 'operator' | 'suffler' | 'customer';
  text: string;
  is_used: boolean;
  date: string;
  source: string | null;
  source_name: string | null;
  confidence: number | null;
  dialog_id: number;
}

export interface GetDialogResponse {
  chat_id: number;
  customer: string;
  messages: DialogMessage[];
  summary: string | null;
  status: string | null;
  createdAt: string;
}