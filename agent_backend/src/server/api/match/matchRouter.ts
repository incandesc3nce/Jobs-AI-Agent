import { Router } from 'express';
import { authMiddleware } from '@/server/middlewares/auth/auth';
import { matchPlanBRoute } from './planb';
import { matchGenerateRoute } from './generate';
import { matchResumeRoute } from './resume';
import { matchGetRoute } from './get';

export const matchRouter = Router();

// PLAN B, EMERGENCY ONLY
// matches the resume with all summaries as a prompt, but works slowly (1-2 minutes per job)
matchRouter.get('/plan-b', authMiddleware, matchPlanBRoute);

matchRouter.get('/get', authMiddleware, matchGetRoute)
matchRouter.post('/generate', authMiddleware, matchGenerateRoute);
matchRouter.post('/resume', authMiddleware, matchResumeRoute);
