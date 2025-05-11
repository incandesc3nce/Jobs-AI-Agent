import { ValidationError } from '@/types/common/ValidationError';

export const validateEmail = (email: string): ValidationError[] | undefined => {
  const errors: ValidationError[] = [];

  // Check if email is empty
  if (!email) {
    errors.push({
      id: 'empty_email',
      error: 'Email is required',
    });

    return errors;
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Check if email is valid
  if (!emailRegex.test(email)) {
    errors.push({
      id: 'invalid_email',
      error: 'Invalid email format',
    });
  }

  // Check if email is too long
  if (email.length > 255) {
    errors.push({
      id: 'long_email',
      error: 'Email is too long',
    });
  }

  // Check if email is too short
  if (email.length < 5) {
    errors.push({
      id: 'short_email',
      error: 'Email is too short',
    });
  }

  if (errors.length === 0) {
    return; // No errors
  }

  return errors;
};

export const validateUsername = (username: string): ValidationError[] | undefined => {
  const errors: ValidationError[] = [];

  // Check if username is empty
  if (!username) {
    errors.push({
      id: 'empty_username',
      error: 'Username is required',
    });

    return errors;
  }

  // Check if username is too long
  if (username.length > 50) {
    errors.push({
      id: 'long_username',
      error: 'Username is too long',
    });
  }

  // Check if username is too short
  if (username.length < 3) {
    errors.push({
      id: 'short_username',
      error: 'Username is too short',
    });
  }

  if (errors.length === 0) {
    return;
  }

  return errors;
}

export const validatePassword = (password: string): ValidationError[] | undefined => {
  const errors: ValidationError[] = [];

  // Check if password is empty
  if (!password) {
    errors.push({
      id: 'empty_password',
      error: 'Password is required',
    });

    return errors;
  }

  if (password.length < 8) {
    errors.push({
      id: 'short_password',
      error: 'Password must be at least 8 characters long',
    });
  }

  if (password.length > 255) {
    errors.push({
      id: 'long_password',
      error: 'Password is too long',
    });
  }

  if (!/[a-z]/.test(password)) {
    errors.push({
      id: 'missing_lowercase',
      error: 'Password must contain at least one lowercase letter',
    });
  }

  if (!/[A-Z]/.test(password)) {
    errors.push({
      id: 'missing_uppercase',
      error: 'Password must contain at least one uppercase letter',
    });
  }

  if (!/[0-9]/.test(password)) {
    errors.push({
      id: 'missing_number',
      error: 'Password must contain at least one number',
    });
  }

  if (errors.length === 0) {
    return;
  }

  return errors;
};
