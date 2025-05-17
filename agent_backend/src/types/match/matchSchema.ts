import { z } from 'zod';

export const matchSchema = {
  summaryId: z.string(),
  resumeId: z.string(),
  matchScore: z.number(),
  matchReason: z.string(),
};
