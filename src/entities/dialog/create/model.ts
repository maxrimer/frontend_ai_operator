export interface CreateDialogRequest {
  id: number;
  text: string;
  role: 'customer' | 'operator';
}

export interface CreateDialogResponse {
  id: number;
  hint: string | null;
} 