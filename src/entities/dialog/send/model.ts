import { DialogMessage } from '../get/model';

export interface SendMessageRequest {
  chat_id: number;
  role: 'customer' | 'operator' | 'suffler';
  text: string;
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