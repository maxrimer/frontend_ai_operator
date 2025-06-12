export interface DialogMessage {
  role: 'customer' | 'operator' | 'hint';
  text: string;
  is_used: boolean;
  date: string;
}

export interface GetDialogResponse {
  id: number;
  customer: string;
  dialog: DialogMessage[];
  summary: string | null;
  status: string | null;
  createdAt: string;
} 