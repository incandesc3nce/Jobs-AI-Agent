import React from "react";
import { Upload, Bot, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Как это работает
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Наша система рекомендаций на базе ИИ работает в три простых шага.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-blue-200 -translate-y-1/2 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-white rounded-xl p-6 shadow-md relative z-10 border border-gray-100 transform transition-transform hover:scale-105">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-600 rounded-full w-14 h-14 flex items-center justify-center mb-4 text-white">
                    <Upload className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Введите информацию
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Загрузите резюме или расскажите о своем опыте, навыках и
                    карьерных целях.
                  </p>
                  <div className="bg-blue-50 p-3 rounded-lg w-full">
                    <p className="text-sm text-blue-700">
                      "Наш ИИ анализирует более 20 категорий навыков и 100+
                      карьерных путей"
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20">
                  <ArrowRight className="h-10 w-10 text-blue-400" />
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md relative z-10 border border-gray-100 transform transition-transform hover:scale-105">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-600 rounded-full w-14 h-14 flex items-center justify-center mb-4 text-white">
                    <Bot className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    ИИ обрабатывает профиль
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Наш ИИ-агент сопоставляет ваш профиль с тысячами вакансий и
                    требований.
                  </p>
                  <div className="bg-blue-50 p-3 rounded-lg w-full">
                    <p className="text-sm text-blue-700">
                      "Модель машинного обучения с 95% точностью рекомендаций"
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20">
                  <ArrowRight className="h-10 w-10 text-blue-400" />
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md relative z-10 border border-gray-100 transform transition-transform hover:scale-105">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-600 rounded-full w-14 h-14 flex items-center justify-center mb-4 text-white">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Получите персональные результаты
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Получите подборку подходящих вакансий с объяснением, почему
                    они вам подходят.
                  </p>
                  <div className="bg-blue-50 p-3 rounded-lg w-full">
                    <p className="text-sm text-blue-700">
                      "Пользователи экономят более 15 часов на поиске работы с
                      нашей системой"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link to="/login">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 font-medium text-lg">
                Попробовать сейчас
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
