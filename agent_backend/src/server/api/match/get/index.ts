import { decryptJWT, getJWTFromHeader } from '@/lib/express/auth/jwt';
import { prisma } from '@/lib/prisma/prisma';
import { Request, Response } from 'express';

export const matchGetRoute = async (req: Request, res: Response) => {
  const { resumeId } = req.query;

  const jwt = getJWTFromHeader(req);
  if (!jwt) {
    res.status(401).json({
      message: 'Unauthorized',
      success: false,
    });
    return;
  }

  const decoded = decryptJWT(jwt);

  if (!decoded) {
    res.status(401).json({
      message: 'Unauthorized',
      success: false,
    });
    return;
  }

  if (!resumeId) {
    res.status(400).json({
      message: 'Resume ID is required',
      success: false,
    });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: decoded.name,
      },
    });

    if (!user) {
      res.status(404).json({
        message: 'User not found',
        success: false,
      });
      return;
    }

    const matches = await prisma.match.findMany({
      where: {
        resumeId: resumeId as string,
      },
      include: {
        summary: true,
      },
    });

    res.status(200).json({
      message: 'Matches fetched successfully',
      success: true,
      summaries: matches,
    });
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
  }
};
