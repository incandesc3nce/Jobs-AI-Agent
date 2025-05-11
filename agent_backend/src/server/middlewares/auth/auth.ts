import { verifyJWT } from '@/lib/express/auth/jwt';
import { decorateError } from '@/utils/decorateError';
import { NextFunction, Request, Response } from 'express';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      res.status(401).json({ message: 'You are unauthorized', success: false });
      return;
    }

    const decoded = verifyJWT(token);
    if (!decoded) {
      res.status(401).json({ message: 'Invalid token', success: false });
      return;
    }

    next();
  } catch (error) {
    decorateError(error);
    res.status(500).json({ message: 'Something went wrong', success: false });
  }
};
