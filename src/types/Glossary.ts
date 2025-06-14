// types/Glossary.ts

import type { UUID } from './User';

export interface Glossary {
  id: UUID;
  name: string;
  description?: string;
  terms: UUID[];
  isGeneral: boolean;
  createdBy: UUID;
  createdAt: string;
  updatedAt: string;
}
