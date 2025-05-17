import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import type { AuthResponse } from "../types/auth";
import { Briefcase, UserPlus } from "lucide-react";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string[] }>(
    {}
  );
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setFieldErrors({});

    if (password !== confirmPassword) {
      setError("Пароли не совпадают.");
      setFieldErrors((prev) => ({
        ...prev,
        confirmPassword: ["Пароли не совпадают."],
      }));
      return;
    }

    try {
      const data: AuthResponse = await authService.register({
        username,
        password,
        confirmPassword,
      });

      if (data.success && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username || username);
        navigate("/job-search"); 
      } else {
        let generalMessage = data.message || "Ошибка регистрации.";
        if (data.errors) {
          const backendErrors = data.errors;
          const newFieldErrors: { [key: string]: string[] } = {};
          if (backendErrors.username)
            newFieldErrors.username = backendErrors.username;
          if (backendErrors.password)
            newFieldErrors.password = backendErrors.password;
          if (backendErrors.passwordAreEqual === false) {
            newFieldErrors.confirmPassword = (
              newFieldErrors.confirmPassword || []
            ).concat("Пароли должны совпадать (проверка на сервере).");
          }
          setFieldErrors(newFieldErrors);

          const messages = Object.values(newFieldErrors).flat();
          if (messages.length > 0) {
            generalMessage = messages.join(" "); // Use combined field errors as general message
          }
        }
        setError(generalMessage);
      }
    } catch (err: any) {
      let errorMessage = "Произошла ошибка во время регистрации.";
      if (err.response && err.response.data) {
        const errorData = err.response.data;
        errorMessage = errorData.message || errorMessage;
        if (errorData.errors) {
          const backendErrors = errorData.errors;
          const newFieldErrors: { [key: string]: string[] } = {};
          if (backendErrors.username)
            newFieldErrors.username = backendErrors.username;
          if (backendErrors.password)
            newFieldErrors.password = backendErrors.password;
          if (backendErrors.passwordAreEqual === false) {
            newFieldErrors.confirmPassword = (
              newFieldErrors.confirmPassword || []
            ).concat("Пароли должны совпадать (проверка на сервере).");
          }
          setFieldErrors(newFieldErrors);
          const messages = Object.values(newFieldErrors).flat();
          if (messages.length > 0) errorMessage = messages.join(" ");
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl">
      <div className="flex flex-col items-center">
        <Link
          to="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          <Briefcase className="w-8 h-8 mr-2 text-blue-600" />
          <span className="text-gray-900">CareerAI</span>
        </Link>
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Создать новый аккаунт
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        <div>
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Имя пользователя
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={`bg-gray-50 border ${
              fieldErrors.username ? "border-red-500" : "border-gray-300"
            } text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
            placeholder="your_username"
          />
          {fieldErrors.username && (
            <p className="mt-1 text-xs text-red-600">
              {fieldErrors.username.join(", ")}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Пароль
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={`bg-gray-50 border ${
              fieldErrors.password ? "border-red-500" : "border-gray-300"
            } text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
            placeholder="••••••••"
          />
          {fieldErrors.password && (
            <p className="mt-1 text-xs text-red-600">
              {fieldErrors.password.join(", ")}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Подтвердите пароль
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={`bg-gray-50 border ${
              fieldErrors.confirmPassword ? "border-red-500" : "border-gray-300"
            } text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
            placeholder="••••••••"
          />
          {fieldErrors.confirmPassword && (
            <p className="mt-1 text-xs text-red-600">
              {fieldErrors.confirmPassword.join(", ")}
            </p>
          )}
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-100 p-3 rounded-lg text-center">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full flex justify-center items-center px-5 py-3 text-base font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          <UserPlus className="mr-2 h-5 w-5" />
          Зарегистрироваться
        </button>
        <p className="text-sm font-light text-gray-500 text-center">
          Уже есть аккаунт?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Войти здесь
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
