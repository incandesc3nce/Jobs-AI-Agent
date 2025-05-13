import { z } from 'zod';

export const summarySchema = {
  title: z.string(),
  salary: z.string().nullable(),
  location: z.string().nullable(),
  company: z.string(),
  url: z.string(),
  workFormat: z.enum(['Remote', 'Hybrid', 'Onsite']),
  workHours: z.string(),
  workSchedule: z.string(),
  yearsOfExperience: z.string(),
  description: z.string(),
  requirements: z.string(),
  keySkills: z.string().array(),
  hasTest: z.boolean(),
  isInternship: z.boolean(),
};
