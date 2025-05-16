import { hashPassword, verifyPassword } from '@/lib/express/auth/hashing';
import { signJWT } from '@/lib/express/auth/jwt';
import { prisma } from '@/lib/prisma/prisma';
import { AuthResponseMessage } from '@/types/auth/AuthResponseMessage';
import { UserData } from '@/types/auth/UserData';
import { ValidationError } from '@/types/common/ValidationError';
import { validatePassword, validateUsername } from '@/utils/validation';
import { Resume, User } from '../../../prisma/generated';

type ValidationResult = {
  email?: ValidationError[] | undefined;
  password?: ValidationError[] | undefined;
  passwordsAreEqual?: false | undefined;
};

type QueriedUser = Omit<User, 'password'>;

class UserService {
  private static instance: UserService;

  private constructor() {}

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  public async getUsers(): Promise<QueriedUser[]> {
    const users = await prisma.user.findMany({
      omit: {
        password: true,
      },
    });

    return users;
  }

  public async getUserById(
    id: string | undefined
  ): Promise<QueriedUser | null> {
    if (!id) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      omit: {
        password: true,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  public async getUserResumes(username: string): Promise<Resume[]> {
    const resumes = await prisma.resume.findMany({
      where: {
        user: {
          username,
        },
      },
    });

    return resumes;
  }

  public validateUser(
    username: string,
    password: string,
    confirmPassword: string
  ): ValidationResult | null {
    const emailErrors = validateUsername(username) ?? undefined;
    const passwordErrors = validatePassword(password) ?? undefined;
    const passwordsAreEqual = password === confirmPassword;

    if (emailErrors || passwordErrors || !passwordsAreEqual) {
      const response: ValidationResult = {
        email: emailErrors,
        password: passwordErrors,
        passwordsAreEqual: passwordsAreEqual ? undefined : false,
      };

      return response;
    }

    return null;
  }

  public async createUser(userData: UserData): Promise<AuthResponseMessage> {
    const { username, password } = userData;
    const hashedPassword = await hashPassword(password);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUser) {
      return {
        message: 'User already exists',
        success: false,
      };
    }

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    const token = signJWT({ name: user.username });

    return { token, message: 'User registered successfully', success: true };
  }

  public async loginUser(
    username: string,
    password: string
  ): Promise<AuthResponseMessage> {
    if (!username || !password) {
      return {
        message: 'Username and password are required',
        success: false,
      };
    }

    // authenticate user
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return {
        message: 'Invalid username or password',
        success: false,
      };
    }

    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      return {
        message: 'Invalid username or password',
        success: false,
      };
    }

    // create JWT token
    const token = signJWT({ name: user.username });

    return {
      token,
      message: 'Login successful',
      success: true,
    };
  }
}

export const userService = UserService.getInstance();
