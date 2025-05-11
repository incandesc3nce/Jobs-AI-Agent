import { userService } from '@/server/services/UserService';
import { decorateError } from '@/utils/decorateError';
import { Request, Response } from 'express';

export const authSignUpRoute = async (req: Request, res: Response) => {
  const { username, password, confirmPassword } = req.body;

  const responseWithErrors = userService.validateUser(
    username,
    password,
    confirmPassword
  );

  if (responseWithErrors) {
    res.status(400).json({
      errors: responseWithErrors,
      message: 'Validation error',
      success: false,
    });
  }

  // register user
  try {
    const response = await userService.createUser({
      username,
      password,
    });

    if (!response.success) {
      res.status(400).json(response);
      return;
    }

    res.status(201).json(response);
  } catch (error) {
    decorateError(error);
    res.status(500).json({
      message: 'Failed to register user',
      success: false,
    });
  }
};
