export interface DialogListItem {
  chat_id: number;
  lastMessage: string;
  status: string;
  summary: string;
}

export type GetAllDialogsResponse = DialogListItem[]; 