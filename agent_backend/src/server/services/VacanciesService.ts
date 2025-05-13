import { HhVacancyItem } from '@/types/vacancies/HhVacancyItem';
import { parseHhVacancies } from '@/lib/express/vacancies/parseHhVacancies';
import { Summary } from '../../../prisma/generated';
import { prisma } from '@/lib/prisma/prisma';

class VacanciesService {
  private static instance: VacanciesService;

  private constructor() {}

  public static getInstance(): VacanciesService {
    if (!VacanciesService.instance) {
      VacanciesService.instance = new VacanciesService();
    }
    return VacanciesService.instance;
  }

  public async getSummaries(): Promise<Summary[]> {
    const summaries = await prisma.summary.findMany();

    return summaries;
  }

  public async getSummaryById(id: string | undefined): Promise<Summary | null> {
    if (!id) {
      return null;
    }
    const summary = await prisma.summary.findUnique({
      where: {
        id,
      },
    });
    return summary;
  }

  public async getHhVacancies(url: string): Promise<HhVacancyItem[]> {
    const headers = {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      Connection: 'keep-alive',
    };

    const vacancies = await fetch(url, { headers }).then((res) => {
      if (!res.ok) {
        throw new Error('something went wrong');
      }
      return res.json();
    });

    const items: HhVacancyItem[] = await parseHhVacancies(vacancies.items);

    return items;
  }

  public async summarizeVacancy(vacancy: HhVacancyItem) {
    return vacancy;
  }
}

export const vacanciesService = VacanciesService.getInstance();
