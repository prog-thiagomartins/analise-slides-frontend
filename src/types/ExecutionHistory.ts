// types/ExecutionHistory.ts

import type { UUID } from './User';

export interface ExecutionHistory {
  id: UUID;
  analysisId: UUID;
  description: string;
  executionSnapshot: Record<string, unknown>;
  result: Record<string, unknown>;
  createdAt: string;
}
