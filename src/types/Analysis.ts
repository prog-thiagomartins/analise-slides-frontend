// types/Analysis.ts

import type { UUID } from './User';

export type AnalysisStatus = 'processing' | 'completed' | 'error';

export interface Analysis {
  id: UUID;
  name: string;
  description?: string;
  originalFile: string;
  context: string;
  result: Record<string, unknown>;
  glossariesUsed: UUID[];
  status: AnalysisStatus;
  createdBy: UUID;
  createdAt: string;
  updatedAt: string;
}
