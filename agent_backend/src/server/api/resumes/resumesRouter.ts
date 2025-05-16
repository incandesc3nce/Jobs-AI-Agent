import { Router } from 'express';
import { getAllResumesRoute } from './get';
import { getResumeByIdRoute } from './get/[id]';

export const resumesRouter = Router();

resumesRouter.get('/get', getAllResumesRoute);
resumesRouter.get('/get/:id', getResumeByIdRoute);
// resumesRouter.post('/create', );
// resumesRouter.post('/update', );
// resumesRouter.delete('/delete/:id', );
