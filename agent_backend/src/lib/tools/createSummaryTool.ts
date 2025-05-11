import { prisma } from '../prisma/prisma';
import { tool } from '@lmstudio/sdk';
import { summarySchema } from '@/types/summary/summarySchema';

export const createSummaryInDB = tool({
  name: 'createSummaryInDB',
  description: 'Create a summary row in the database.',
  parameters: summarySchema,
  implementation: async ({
    title,
    company,
    yearsOfExperience,
    shortDescription,
    requirements,
    keySkills,
  }) => {
    const summary = await prisma.summary.create({
      data: {
        title,
        company,
        yearsOfExperience,
        description: shortDescription,
        requirements,
        keySkills,
      },
    });

    console.log('Summary created in DB:', summary);
    return summary;
  },
});
