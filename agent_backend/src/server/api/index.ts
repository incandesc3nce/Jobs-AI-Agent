import express from 'express';
import { vacanciesRouter } from './vacancies/vacanciesRouter';

export const apiRouter = express.Router();

apiRouter.use('/vacancies', vacanciesRouter);
