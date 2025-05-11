import { z } from 'zod';

export const summarySchema = {
  title: z.string(),
  company: z.string(),
  yearsOfExperience: z.string(),
  shortDescription: z.string(),
  requirements: z.string(),
  keySkills: z.string().array(),
};
