import { userService } from '@/server/services/UserService';
import { decorateError } from '@/utils/decorateError';
import { Request, Response } from 'express';

export const getUserByIdRoute = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await userService.getUserById(id);

    res.status(200).json({
      user,
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
