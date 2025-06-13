export interface AddHintRequest {
  chat_id: number;
  dialog_id: number;
  is_used: boolean;
}

export type AddHintResponse = boolean; 