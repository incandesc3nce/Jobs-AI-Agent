import express from 'express';
import { vacanciesRouter } from './vacancies/vacanciesRouter';
import { authRouter } from './auth/authRouter';

export const apiRouter = express.Router();

apiRouter.use('/vacancies', vacanciesRouter);
apiRouter.use('/auth', authRouter);
