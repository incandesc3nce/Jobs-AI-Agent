import React from "react";
import { Search, Briefcase, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-24">
      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-center min-h-[calc(100vh-96px)]">
        <div className="text-center max-w-3xl mx-auto">
          <div className="mb-6 inline-block">
            <div className="flex items-center justify-center bg-blue-100 text-blue-600 rounded-full px-4 py-1 text-sm font-medium">
              <span className="mr-2">Hackathon Barnaul #10</span>
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Найдите <span className="text-blue-600">идеальную работу</span> с
            помощью ИИ
          </h1>

          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Наш ИИ-агент анализирует ваши навыки, опыт и карьерные цели, чтобы
            найти и рекомендовать наиболее подходящие вакансии, созданные
            специально для вас.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link to="/login">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 font-medium flex items-center justify-center">
                <Search className="mr-2 h-5 w-5" />
                Начать поиск работы
              </button>
            </Link>
            <a
              href="#features"
              className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-all font-medium"
            >
              Узнать, как это работает
            </a>
          </div>
        </div>

        <div className="w-full max-w-4xl mx-auto mt-8 relative">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative z-10 transform transition-all hover:shadow-2xl">
            <div className="p-6 bg-gray-50 border-b">
              <div className="flex items-center">
                <Briefcase className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-medium text-gray-800">
                  CareerAI Ассистент
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start mb-6">
                <div className="bg-blue-100 rounded-full p-2 mr-4">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
                <div className="bg-gray-100 rounded-2xl px-5 py-4 max-w-[80%]">
                  <p className="text-gray-800">
                    Привет! Я ваш CareerAI ассистент. Я помогу вам найти
                    идеальную работу на основе ваших навыков и карьерных целей.
                    Хотите загрузить резюме или рассказать мне о своем опыте?
                  </p>
                </div>
              </div>

              <div className="flex items-start justify-end">
                <div className="bg-blue-600 text-white rounded-2xl px-5 py-4 max-w-[80%]">
                  <p>
                    Я full-stack разработчик с 3-летним опытом. Ищу удаленную
                    работу, где смогу развивать навыки руководства.
                  </p>
                </div>
                <div className="bg-gray-100 rounded-full p-2 ml-4">
                  <div className="h-6 w-6 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-blue-200 rounded-full opacity-50 z-0"></div>
          <div className="absolute -top-6 -left-6 h-24 w-24 bg-purple-200 rounded-full opacity-50 z-0"></div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default Hero;
