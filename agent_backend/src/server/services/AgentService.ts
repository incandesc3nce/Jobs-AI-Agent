import { RequestQueue } from '@/lib/express/class/queue';
import { LMStudio } from '@/lib/lmstudio/LMStudioClient';
import { createSummaryInDB } from '@/lib/lmstudio/tools/createSummaryTool';
import { summarizeVacancyTool } from '@/lib/lmstudio/tools/summarizeVacancyTool';
import { HhVacancyItem } from '@/types/vacancies/HhVacancyItem';

class AgentService {
  private static instance: AgentService;
  private readonly modelName = 'qwen3-14b';
  private readonly queue = new RequestQueue();

  private constructor() {}

  public static getInstance(): AgentService {
    if (!AgentService.instance) {
      AgentService.instance = new AgentService();
    }
    return AgentService.instance;
  }

  public async summarizeVacancy(vacancy: HhVacancyItem) {
    this.queue.addTask(async () => {
      const model = await LMStudio.llm.model(this.modelName);
  
      await model.act(
        `You are an expert in summarizing job descriptions and making a short job posts from them. Analyze the following job description and create a short job post. You will be provided with a JSON string containing the information about the job. Description must fit in 2-4 sentences. Do not include any extra information unless instructed to. After you are done - create the summary entry in database using a tool. Here is the job description: ${JSON.stringify(
          vacancy
        )} /no_think`,
        [summarizeVacancyTool, createSummaryInDB]
      );
    });
  }
}

export const agentService = AgentService.getInstance();
