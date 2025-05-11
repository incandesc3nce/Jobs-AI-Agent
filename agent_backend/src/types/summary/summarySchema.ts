import { z } from 'zod';

export const summarySchema = {
  title: z.string(),
  salary: z.string().nullable(),
  location: z.string().nullable(),
  company: z.string(),
  url: z.string(),
  workFormat: z.enum(['Remote', 'Hybrid', 'Onsite']),
  workSchedule: z.string(),
  yearsOfExperience: z.string(),
  shortDescription: z.string(),
  requirements: z.string(),
  keySkills: z.string().array(),
  hasTest: z.boolean(),
  isInternship: z.boolean(),
};
