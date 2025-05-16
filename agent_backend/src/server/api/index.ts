import express from 'express';
import { vacanciesRouter } from './vacancies/vacanciesRouter';
import { authRouter } from './auth/authRouter';
import { usersRouter } from './users/usersRouter';
import { resumesRouter } from './resumes/resumesRouter';

export const apiRouter = express.Router();

apiRouter.use('/vacancies', vacanciesRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/resumes', resumesRouter);
