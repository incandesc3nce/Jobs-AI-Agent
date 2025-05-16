import type { AuthResponse, LoginData, RegisterData } from '../types/auth';

const API_BASE_URL = 'https://jobs-agent-backend.loca.lt/api/auth'; // Assuming your backend is served from the same domain or proxied

export const authService = {
  login: async (credentials: LoginData): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 'User-Agent': 'PostmanRuntime/7.43.4', 'bypass-tunnel-reminder': 'true'
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }
    return response.json();
  },

  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 'User-Agent': 'PostmanRuntime/7.43.4', 'bypass-tunnel-reminder': 'true'
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      // Add more specific error handling based on backend response structure if needed
      throw new Error(errorData.message || 'Registration failed');
    }
    return response.json();
  },
};

// Define types used by the authService
// These might already exist in your project, adjust as necessary.
// If they are in separate files, import them.

export interface LoginData {
  username: string;
  password?: string; // Optional if you handle cases where it might not be needed directly here
}

export interface RegisterData extends LoginData {
  confirmPassword?: string; // Optional for the same reason as password
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  errors?: {
    username?: string[];
    password?: string[];
    passwordAreEqual?: boolean;
  };
  // Add other fields your backend might return upon successful auth
  username?: string; // Assuming backend returns username
}
