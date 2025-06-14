export interface DialogListItem {
  chat_id: number;
  last_message: string;
  status: string;
  summary: string;
  customer_number: string;
}

export type GetAllDialogsResponse = DialogListItem[]; 