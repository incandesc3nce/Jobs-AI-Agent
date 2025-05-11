import { summarySchema } from '@/types/summary/summarySchema';
import { tool } from '@lmstudio/sdk';

export const summarizeVacancyTool = tool({
  name: 'summarizeVacancy',
  description:
    'Summarize a job description and requirements from JSON string. Combine description and branded_description into one short description. alternate_url should be used as an url to the job post.',
  parameters: summarySchema,
  implementation: async (payload) => {
    return {
      ...payload,
    };
  },
});

// (async () => {
//   const model = await client.llm.model('qwen3-14b');
//   const jobs = [];

//   for (const job of jobs) {
//     console.time('Time taken');
//     console.log('Starting job:');
//     await model.act(
//       `You are an expert in summarizing job descriptions and making a short job posts from them. Analyze the following job description and requirements, and create a short job post. You will be provided with a JSON string containing the information about the job. Description must fit in 2-4 sentences. Do not include any extra information unless instructed to. After you are done - create the summary entry in database using a tool. Name of the file should be the job title. Here is the job description: ${job} /no_think`,
//       [summarizeJobTool, createSummaryInDB],
//       { onMessage: (message) => console.log('Message:', message.toString()) }
//     );
//     console.timeEnd('Time taken');
//   };
// })();
