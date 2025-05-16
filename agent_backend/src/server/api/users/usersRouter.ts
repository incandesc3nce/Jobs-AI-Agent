import { Router } from 'express';
import { getAllUsersRoute } from './get';
import { getUserByIdRoute } from './get/[id]';
import { authMiddleware } from '@/server/middlewares/auth/auth';
import { getUserResumes } from './resumes';

export const usersRouter = Router();

// Get user resumes
usersRouter.get('/resumes', authMiddleware, getUserResumes);
// All users
usersRouter.get('/', authMiddleware, getAllUsersRoute);
// User by ID
usersRouter.get('/:id', authMiddleware, getUserByIdRoute);
