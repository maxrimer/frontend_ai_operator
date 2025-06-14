export interface CreateDialogRequest {
  id: number;
  text: string;
  role: 'client' | 'operator';
}

export interface CreateDialogResponse {
  id: number;
  hint: string | null;
} 