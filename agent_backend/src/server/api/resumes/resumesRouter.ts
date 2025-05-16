import { Router } from 'express';
import { getAllResumesRoute } from './get';
import { getResumeByIdRoute } from './get/[id]';
import { createResumeRoute } from './create';
import { updateResumeRoute } from './update';
import { deleteResumeRoute } from './delete';

export const resumesRouter = Router();

resumesRouter.get('/get', getAllResumesRoute);
resumesRouter.get('/get/:id', getResumeByIdRoute);
resumesRouter.post('/create', createResumeRoute);
resumesRouter.post('/update', updateResumeRoute);
resumesRouter.delete('/delete', deleteResumeRoute);
