// types/AnalysisModel.ts

import type { UUID } from './User';

export interface AnalysisTemplate {
  id: UUID;
  name: string;
  description?: string;
  defaultContext: string;
  useGeneralGlossary: boolean;
  specificGlossary?: UUID | null;
  createdBy: UUID;
  createdAt: string;
  updatedAt: string;
}
