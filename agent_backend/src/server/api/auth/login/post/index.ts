import { userService } from '@/server/services/UserService';
import { decorateError } from '@/utils/decorateError';
import { Request, Response } from 'express';

export const authLoginRoute = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const response = await userService.loginUser(username, password);
    res.status(200).json(response);
  } catch (error) {
    decorateError(error);
    res.status(500).json({
      message: 'Something went wrong during login',
      success: false,
    });
  }
};
