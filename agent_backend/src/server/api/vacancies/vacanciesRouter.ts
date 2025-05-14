import express from 'express';
import { fetchVacanciesRoute } from './fetch';
import { authMiddleware } from '@/server/middlewares/auth/auth';
import { getAllSummariesRoute } from './get';
import { getSummaryByIdRoute } from './get/[id]';

export const vacanciesRouter = express.Router();

vacanciesRouter.get('/fetch', authMiddleware, fetchVacanciesRoute);
vacanciesRouter.get('/get', authMiddleware, getAllSummariesRoute);
vacanciesRouter.get('/get/:id', authMiddleware, getSummaryByIdRoute);
