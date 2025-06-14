// types/Message.ts

import type { UUID } from './User';

// Substitui enum por union type string
export type MessageSender = 'user' | 'ai';

export interface Message {
  id: UUID;
  conversationId: UUID;
  sender: MessageSender;
  content: string;
  timestamp: string;
}
