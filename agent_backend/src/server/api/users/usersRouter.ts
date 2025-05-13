import { Router } from 'express';
import { getAllUsersRoute } from './get';
import { getUserByIdRoute } from './get/[id]';
import { authMiddleware } from '@/server/middlewares/auth/auth';

export const usersRouter = Router();

// All users
usersRouter.get('/', authMiddleware, getAllUsersRoute);
// User by ID
usersRouter.get('/:id', authMiddleware, getUserByIdRoute);
