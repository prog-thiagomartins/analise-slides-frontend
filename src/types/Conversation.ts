// types/Conversation.ts

import type { UUID } from './User';
import type { Message } from './Message';

export interface Conversation {
  id: UUID;
  analysisId: UUID;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}
