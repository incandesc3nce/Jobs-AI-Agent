import { ResponseMessage } from '@/types/common/ResponseMessage';

export function decorateError(error: unknown): ResponseMessage {
  console.error('Error:', error);

  if (error instanceof Error) {
    return {
      message: error.message,
      success: false,
    };
  }

  if (typeof error === 'string') {
    return {
      message: error,
      success: false,
    };
  }

  return {
    message: error as string,
    success: false,
  };
}
