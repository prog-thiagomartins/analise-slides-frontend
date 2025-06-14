// types/Term.ts

import type { UUID } from './User';

export interface Term {
  id: UUID;
  name: string;
  description: string;
  synonyms?: string[];
  createdBy: UUID;
  createdAt: string;
  updatedAt: string;
}
