import express from 'express';
import { authLoginRoute } from './login/post';
import { authSignUpRoute } from './sign-up/post';

export const authRouter = express.Router();

authRouter.post('/login', authLoginRoute);
authRouter.post('/sign-up', authSignUpRoute);
