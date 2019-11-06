import {ChatMessage} from './chat/chat.model';

export type Chat = {
  id: number;
  user_id: number;
  username: string;
  full_name: string;
  avatar: string;
  time: string;
  last_chat: string;
  messages: Array<ChatMessage>;
};
