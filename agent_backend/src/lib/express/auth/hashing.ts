import { decorateError } from '@/utils/decorateError';
import { hash, verify } from 'argon2';
import 'dotenv/config';

export const hashPassword = async (password: string): Promise<string> => {
  const secret = process.env['HASH_SECRET'] as string;

  try {
    const hashedPassword = await hash(password, {
      secret: Buffer.from(secret),
    });
    return hashedPassword;
  } catch (error) {
    decorateError(error);
    throw new Error('Error hashing password');
  }
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    const isMatch = await verify(hashedPassword, password);
    return isMatch;
  } catch (error) {
    decorateError(error);
    throw new Error('Error verifying password');
  }
};
