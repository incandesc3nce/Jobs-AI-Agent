import { z } from 'zod';

export const matchSchema = z.object({
  summaryId: z.string(),
  resumeId: z.string(),
  matchScore: z.number(),
  matchReason: z.string(),
});
