export type ChatStep =
  | 'greeting'
  | 'doctor'
  | 'date'
  | 'time'
  | 'notes'
  | 'confirmation'
  | 'success';

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  component?: React.ReactNode;
}
