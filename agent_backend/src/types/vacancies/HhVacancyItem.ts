import { z } from 'zod';

// Define the schema
const SimpleIdNameSchema = z.object({
  id: z.string(),
  name: z.string(),
});

const SalarySchema = z
  .object({
    from: z.number().nullable(),
    to: z.number().nullable(),
    currency: z.string().nullable(),
    gross: z.boolean().nullable(),
    mode: SimpleIdNameSchema.nullable().optional(),
  })
  .nullable();

export const HhVacancyItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  salary: SalarySchema,
  salary_range: SalarySchema,
  address: z
    .object({
      city: z.string().nullable(),
    })
    .nullable(),
  experience: SimpleIdNameSchema,
  description: z.string(),
  branded_description: z.string().nullable(),
  key_skills: z
    .object({
      name: z.string(),
    })
    .array(),
  employer: z.object({
    id: z.string(),
    name: z.string(),
    alternate_url: z.string(),
    accredited_it_employer: z.boolean(),
    trusted: z.boolean(),
  }),
  published_at: z.string(),
  created_at: z.string(),
  has_test: z.boolean(),
  response_letter_required: z.boolean(),
  alternate_url: z.string(),
  work_format: SimpleIdNameSchema.array(),
  working_hours: SimpleIdNameSchema.array(),
  work_schedule_by_days: SimpleIdNameSchema.array(),
  employment: SimpleIdNameSchema,
  internship: z.boolean(),
});

export type HhVacancyItem = z.infer<typeof HhVacancyItemSchema>;
