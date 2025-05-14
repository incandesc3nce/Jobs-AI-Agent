import { vacanciesService } from '@/server/services/VacanciesService';
import { decorateError } from '@/utils/decorateError';
import { Request, Response } from 'express';

export const getAllSummariesRoute = async (req: Request, res: Response) => {
  const { take, skip, filter, filterType } = req.query;

  try {
    const summaries = await vacanciesService.getSummaries({
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      filter: filter ? String(filter) : undefined,
      filterType: filterType ? String(filterType) : undefined,
    });

    res.status(200).json({
      summaries,
      count: summaries.length,
      message: 'Successfully got summaries',
      success: true,
    });
  } catch (error) {
    const errorResponse = decorateError(error);
    res.status(500).json(errorResponse);
  }
};
