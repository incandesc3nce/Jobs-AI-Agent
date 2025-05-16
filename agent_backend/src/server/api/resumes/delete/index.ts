import { getJWTFromHeader, decryptJWT } from '@/lib/express/auth/jwt';
import { resumeService } from '@/server/services/ResumeService';
import { decorateError } from '@/utils/decorateError';
import { Request, Response } from 'express';

export const deleteResumeRoute = async (req: Request, res: Response) => {
  const { resumeId } = req.body;

  const jwt = getJWTFromHeader(req);
  const decoded = decryptJWT(jwt);
  if (!decoded) {
    res.status(401).json({
      message: 'Unauthorized',
      success: false,
    });
    return;
  }

  const username = decoded.name;

  try {
    const resume = await resumeService.deleteResume(resumeId, username);

    if (!resume) {
      res.status(404).json({
        message: 'User not found',
        success: false,
      });
      return;
    }

    res.status(200).json({
      resume: resume,
      message: 'Successfully updated resume',
      success: true,
    });
  } catch (error) {
    decorateError(error);
    res.status(500).json({
      message: 'Something went wrong during creating resume',
      success: false,
    });
  }
};
