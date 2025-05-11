import { parseHhVacancies } from '@/lib/express/vacancies/parseHhVacancies';
import { HhVacancyItem } from '@/types/vacancies/HhVacancyItem';
import { decorateError } from '@/utils/decorateError';
import { Request, Response } from 'express';

export const vacanciesGetRoute = async (req: Request, res: Response) => {
  const { text, page, per_page } = req.query;
  const url = `https://api.hh.ru/vacancies?text=${text}&page=${page}&per_page=${per_page}`;
  const headers = {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    Connection: 'keep-alive',
  };

  try {
    const vacancies = await fetch(url, { headers }).then((response) => {
      if (!response.ok) {
        throw new Error('something went wrong');
      }
      return response.json();
    });

    const items: HhVacancyItem[] = await parseHhVacancies(vacancies.items);

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
