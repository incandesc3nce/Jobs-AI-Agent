import express from 'express';
import { vacanciesGetRoute } from './get';
import { authMiddleware } from '@/server/middlewares/auth/auth';

export const vacanciesRouter = express.Router();

vacanciesRouter.get('/get', authMiddleware, vacanciesGetRoute);
