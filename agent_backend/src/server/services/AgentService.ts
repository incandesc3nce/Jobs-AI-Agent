import { RequestQueue } from '@/lib/express/class/queue';
import { LMStudioClient } from '@lmstudio/sdk';
import { createSummaryInDB } from '@/lib/lmstudio/tools/createSummaryTool';
import { summarizeVacancyTool } from '@/lib/lmstudio/tools/summarizeVacancyTool';
import { HhVacancyItem } from '@/types/vacancies/HhVacancyItem';
import { Resume, Summary } from '../../../prisma/generated';
import { matchTool } from '@/lib/lmstudio/tools/matchTool';

class AgentService {
  private static instance: AgentService;
  private readonly modelName = 'qwen3-14b';
  private readonly queue = new RequestQueue();
  private LMStudio = new LMStudioClient();

  private constructor() {}

  public static getInstance(): AgentService {
    if (!AgentService.instance) {
      AgentService.instance = new AgentService();
    }
    return AgentService.instance;
  }

  public async summarizeVacancy(vacancy: HhVacancyItem) {
    this.queue.addTask(async () => {
      const model = await this.LMStudio.llm.model(this.modelName);

      await model.act(
        `You are an expert in summarizing job descriptions and making a short job posts from them. Analyze the following job description and create a short job post. You will be provided with a JSON string containing the information about the job. Description must fit in 2-4 sentences. Do not include any extra information unless instructed to. After you are done - create the summary entry in database using a tool. Here is the job description: ${JSON.stringify(
          vacancy
        )} /no_think`,
        [summarizeVacancyTool, createSummaryInDB]
      );
    });
  }

  public async processMatch(resume: Resume, summary: Summary) {
    this.queue.addTask(async () => {
      const model = await this.LMStudio.llm.model(this.modelName);

      await model.act(
        `
        You are an expert in analyzing resumes and job descriptions. Analyze the following resume and job description and create a match score from 0 to 100. The higher the score, the better the match. Explain why the vacancy may or may not fit the resume. You will be provided with a JSON strings containing the information about the resume and job description. After you are done - if the match score is more than 50% - create the match entry in database using a tool. Here is the resume: ${JSON.stringify(
          resume
        )} Here is the job description: ${JSON.stringify(summary)}
        `,
        [matchTool]
      );
    });
  }
}

export const agentService = AgentService.getInstance();
