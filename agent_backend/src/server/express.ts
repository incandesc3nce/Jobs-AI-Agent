import express from 'express';

import { notFound, errorHandler } from './middlewares';
import { apiRouter } from './api';

export const app = express();

app.use(express.json());

app.get('/', (_, res) => {
  res.send('Hello World!');
});

app.use('/api', apiRouter);

// Middlewares to handle 404 errors and other errors
// Do not put any routes after this
app.use(notFound);
app.use(errorHandler);
