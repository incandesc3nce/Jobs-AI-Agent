import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { decorateError } from '@/utils/decorateError';

export const signJWT = (payload: {name: string}) => {
  const secret = process.env['JWT_SECRET'] as string;
  const token = jwt.sign(payload, secret, {
    expiresIn: '14d',
  });

  return token;
}

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
}