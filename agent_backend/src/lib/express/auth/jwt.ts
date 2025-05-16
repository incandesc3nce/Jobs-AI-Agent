import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { decorateError } from '@/utils/decorateError';
import { Request } from 'express';

export const signJWT = (payload: { name: string }) => {
  const secret = process.env['JWT_SECRET'] as string;
  const token = jwt.sign(payload, secret, {
    expiresIn: '14d',
  });

  return token;
};

export const verifyJWT = (token: string | undefined | null) => {
  if (!token) {
    return null;
  }
  const secret = process.env['JWT_SECRET'] as string;
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    decorateError(error);
    return null;
  }
};

export const decryptJWT = (token: string | undefined | null) => {
  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.decode(token);

    return decoded as { name: string };
  } catch (error) {
    decorateError(error);
    return null;
  }
};

export const getJWTFromHeader = (req: Request) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return null;
  }

  return token;
};
