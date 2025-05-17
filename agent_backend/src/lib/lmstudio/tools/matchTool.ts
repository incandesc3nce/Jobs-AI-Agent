import { prisma } from '@/lib/prisma/prisma';
import { matchSchema } from '@/types/match/matchSchema';
import { tool } from '@lmstudio/sdk';

export const matchTool = tool({
  name: 'matchTool',
  description: 'Add a resume and job vacancy match to database.',
  parameters: matchSchema,
  implementation: async (payload) => {
    const { summaryId, resumeId, matchScore, matchReason } = payload;

    await prisma.match.create({
      data: {
        summaryId,
        resumeId,
        matchScore,
        matchReason,
      },
    });
    
    return {
      summaryId,
      resumeId,
      matchScore,
      matchReason,
    };
  },
});
