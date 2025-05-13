import { vacanciesService } from '@/server/services/VacanciesService';
import { decorateError } from '@/utils/decorateError';
import { Request, Response } from 'express';

export const getSummaryByIdRoute = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const summary = await vacanciesService.getSummaryById(id);

    res.status(200).json({
      summary,
      message: 'Successfully got summaries',
      success: true,
    });
  } catch (error) {
    const errorResponse = decorateError(error);
    res.status(500).json(errorResponse);
  }
};
