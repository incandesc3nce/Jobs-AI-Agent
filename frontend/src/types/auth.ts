export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  username?: string;
  errors?: {
    username?: string[];
    password?: string[];
    confirmPassword?: string[];
    passwordAreEqual?: boolean; // Specific error key from backend
    [key: string]: any; // For any other potential error fields
  };
}
