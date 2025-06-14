import { DialogMessage } from '../get/model';

export interface SendMessageRequest {
  chat_id: number;
  role: 'client' | 'operator' | 'suffler';
  text: string;
  is_used?: boolean;
}

export interface SendMessageResponse {
  chat_id: number;
  customer_number: string;
  messages: DialogMessage[];
  status: string;
  created_at: string;
  updated_at: string;
  summary: string;
} 