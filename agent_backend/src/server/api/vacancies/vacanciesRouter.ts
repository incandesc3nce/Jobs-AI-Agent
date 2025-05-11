import express from 'express';
import { vacanciesGetRoute } from './get';

export const vacanciesRouter = express.Router();

vacanciesRouter.get('/get', vacanciesGetRoute);
