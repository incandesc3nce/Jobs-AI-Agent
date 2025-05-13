import { prisma } from '@/lib/prisma/prisma';
import { tool } from '@lmstudio/sdk';
import { summarySchema } from '@/types/summary/summarySchema';

export const createSummaryInDB = tool({
  name: 'createSummaryInDB',
  description: 'Create a summary row in the database.',
  parameters: summarySchema,
  implementation: async (payload) => {
    const summary = await prisma.summary.create({
      data: {
        ...payload,
      },
    });

    return summary;
  },
});
