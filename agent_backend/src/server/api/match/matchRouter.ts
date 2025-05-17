import { Router } from 'express';
import { authMiddleware } from '@/server/middlewares/auth/auth';
import { matchPlanBRoute } from './planb';

export const matchRouter = Router();

matchRouter.use('/plan-b', authMiddleware, matchPlanBRoute);

