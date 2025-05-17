import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { Briefcase, LogIn } from 'lucide-react'; // Added LogIn icon

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = localStorage.getItem('token');
    if (jwtToken) {
      navigate('/job-search'); // Redirect to job search page if already logged in
    }
  }, [navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    try {
      const data = await authService.login({ username, password });
      if (data.success && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username || username);
        navigate('/job-search'); // Navigate to a protected route, e.g., user profile or dashboard
      } else {
        setError(
          data.message || 'Ошибка входа. Пожалуйста, проверьте ваши данные.'
        );
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat().join(' ');
          setError((prevError) => `${prevError} ${errorMessages}`);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Произошла ошибка во время входа.');
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl">
      <div className="flex flex-col items-center">
        <Link
          to="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          <Briefcase className="w-8 h-8 mr-2 text-blue-600" />
          <span className="text-gray-900">CareerAI</span>
        </Link>
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Войдите в свой аккаунт
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        <div>
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900">
            Имя пользователя
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            placeholder="your_username"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900">
            Пароль
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            placeholder="••••••••"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-100 p-3 rounded-lg text-center">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full flex justify-center items-center px-5 py-3 text-base font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300">
          <LogIn className="mr-2 h-5 w-5" />
          Войти
        </button>
        <p className="text-sm font-light text-gray-500 text-center">
          Нет аккаунта?{' '}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:underline">
            Зарегистрироваться
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
