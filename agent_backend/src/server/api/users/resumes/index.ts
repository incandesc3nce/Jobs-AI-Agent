import { decryptJWT, getJWTFromHeader } from '@/lib/express/auth/jwt';
import { userService } from '@/server/services/UserService';
import { decorateError } from '@/utils/decorateError';
import { Request, Response } from 'express';

export const getUserResumes = async (req: Request, res: Response) => {
  const jwt = getJWTFromHeader(req);
  const decoded = decryptJWT(jwt);
  
  if (!decoded) {
    res.status(401).json({
      message: 'Unauthorized',
      success: false,
    });
    return;
  }

  try {
    const resumes = await userService.getUserResumes(decoded.name);

    if (!resumes) {
      res.status(404).json({
        message: 'User not found',
        success: false,
      });
      return;
    }

    res.status(200).json({
      resumes: resumes,
      message: 'Successfully got resumes',
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
