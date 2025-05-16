import { HhVacancyItem } from '@/types/vacancies/HhVacancyItem';
import { parseHhVacancies } from '@/lib/express/vacancies/parseHhVacancies';
import { Summary } from '../../../prisma/generated';
import { prisma } from '@/lib/prisma/prisma';

type SummaryQuery = {
  take: number | undefined;
  skip: number | undefined;
  filter: string | undefined;
  filterType: string | undefined;
};

class VacanciesService {
  private static instance: VacanciesService;

  private constructor() {}

  public static getInstance(): VacanciesService {
    if (!VacanciesService.instance) {
      VacanciesService.instance = new VacanciesService();
    }
    return VacanciesService.instance;
  }

  // private getFilterClause(
  //   filter: string[] | undefined,
  //   filterType: string | undefined
  // ): Prisma.SummaryWhereInput {
  //   if (Array.isArray(filter)) {
  //     if (filterType === 'all') {
  //       return {
  //         AND: filter.map((f) => ({
  //           OR: [
  //             { title: { contains: f, mode: 'insensitive' } },
  //             { description: { contains: f, mode: 'insensitive' } },
  //             { requirements: { contains: f, mode: 'insensitive' } },
  //             { keySkills: { has: f } },
  //           ],
  //         })),
  //       };
  //     } else if (filterType === 'some') {
  //       return {
  //         OR: filter.map((f) => ({
  //           OR: [
  //             { title: { contains: f, mode: 'insensitive' } },
  //             { description: { contains: f, mode: 'insensitive' } },
  //             { requirements: { contains: f, mode: 'insensitive' } },
  //             { keySkills: { has: f } },
  //           ],
  //         })),
  //       };
  //     }
  //   }

  //   return {};
  // }

  public async getSummaries(query: SummaryQuery): Promise<Summary[]> {
    const { take = 10, skip = 0, filter, filterType } = query;
    const parsedFilter = filter
      ?.split(',')
      .map((item) => item.trim().toLowerCase());

    // const whereClause = this.getFilterClause(parsedFilter, filterType);

    const summaries = await prisma.summary.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!parsedFilter || parsedFilter.length === 0) {
      return summaries;
    }

    // kostylnoe
    let skipped = 0;
    let taken = 0;
    return summaries.filter((summary) => {
      if (skipped <= skip) {
        skipped++;
        return false;
      }
      if (taken >= take) {
        return false;
      }
      taken++;

      const title = summary.title.toLowerCase();
      const description = summary.description.toLowerCase();
      const requirements = summary.requirements.toLowerCase();
      const keySkills = summary.keySkills.map((skill) => skill.toLowerCase());

      if (filterType === 'all') {
        return parsedFilter.every(
          (filter) =>
            title.includes(filter) ||
            description.includes(filter) ||
            requirements.includes(filter) ||
            keySkills.some((skill) => skill.includes(filter))
        );
      } else {
        return (
          parsedFilter.some((filter) => title.includes(filter)) ||
          parsedFilter.some((filter) => description.includes(filter)) ||
          parsedFilter.some((filter) => requirements.includes(filter)) ||
          parsedFilter.some((filter) => keySkills.includes(filter))
        );
      }
    });
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
