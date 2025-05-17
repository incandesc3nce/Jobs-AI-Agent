import { Request, Response } from 'express';

export const matchGenerateRoute = async (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Match processing started',
    success: true,
  });
};
