import { Request, Response } from 'express';

export const matchResumeRoute = async (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Match processing started',
    success: true,
  });
};
