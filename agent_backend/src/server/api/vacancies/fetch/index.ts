import { agentService } from '@/server/services/AgentService';
import { vacanciesService } from '@/server/services/VacanciesService';
import { decorateError } from '@/utils/decorateError';
import { Request, Response } from 'express';

export const fetchVacanciesRoute = async (req: Request, res: Response) => {
  const { text, page, per_page } = req.query;

  const url = `https://api.hh.ru/vacancies?text=${text}&page=${page}&per_page=${per_page}`;
  try {
    const items = await vacanciesService.getHhVacancies(url);

    items.forEach((item) => {
      agentService.summarizeVacancy(item);
    });

    res.status(200).json({
      items,
      message: 'Successfully got hh.ru vacancies',
      success: true,
    });
  } catch (error) {
    const errorResponse = decorateError(error);
    res.status(500).json(errorResponse);
  }
};
