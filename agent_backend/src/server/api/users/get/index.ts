import { userService } from '@/server/services/UserService';
import { decorateError } from '@/utils/decorateError';
import { Request, Response } from 'express';

export const getAllUsersRoute = async (_: Request, res: Response) => {
  try {
    const users = await userService.getUsers();

    res.status(200).json({
      users,
      message: 'Successfully got users',
      success: true,
    });
  } catch (error) {
    decorateError(error);
    res.status(500).json({
      message: 'Something went wrong during getting users',
      success: false,
    });
  }
};
