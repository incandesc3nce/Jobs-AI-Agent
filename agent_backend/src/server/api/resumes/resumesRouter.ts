import { Router } from 'express';
import { getAllResumesRoute } from './get';
import { getResumeByIdRoute } from './get/[id]';
import { createResumeRoute } from './create';
import { updateResumeRoute } from './update';
import { deleteResumeRoute } from './delete';
import { authMiddleware } from '@/server/middlewares/auth/auth';

export const resumesRouter = Router();

resumesRouter.get('/get', authMiddleware, getAllResumesRoute);
resumesRouter.get('/get/:id', authMiddleware, getResumeByIdRoute);
resumesRouter.post('/create', authMiddleware, createResumeRoute);
resumesRouter.patch('/update', authMiddleware, updateResumeRoute);
resumesRouter.delete('/delete', authMiddleware, deleteResumeRoute);
