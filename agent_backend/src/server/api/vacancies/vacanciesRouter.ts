import express from 'express';
import { fetchVacanciesRoute } from './fetch';
import { authMiddleware } from '@/server/middlewares/auth/auth';
import { getAllSummariesRoute } from './get';

export const vacanciesRouter = express.Router();

vacanciesRouter.get('/', authMiddleware, getAllSummariesRoute);
vacanciesRouter.get('/:id', authMiddleware, getAllSummariesRoute);
vacanciesRouter.get('/fetch', authMiddleware, fetchVacanciesRoute);
