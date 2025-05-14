import React from "react";
import { BarChart, Users, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const FuturePlans: React.FC = () => {
  return (
    <section
      id="future"
      className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Планы развития
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Мы только начинаем. Вот куда мы движемся дальше.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 opacity-50 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-100 opacity-50 rounded-full -ml-16 -mb-16"></div>

            <div className="relative z-10">
              <div className="mb-10">
                <div className="bg-blue-100 text-blue-600 rounded-full px-4 py-1 text-sm font-medium inline-flex items-center mb-4">
                  <Rocket className="h-4 w-4 mr-2" />
                  <span>Скоро</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  Для работодателей
                </h3>
                <p className="text-gray-700 mb-6">
                  Мы разрабатываем аналогичную систему для работодателей,
                  которая поможет им находить наиболее подходящих кандидатов на
                  открытые позиции. Это создаст полноценную экосистему для
                  подбора персонала.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded mr-4">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1 text-gray-900">
                          Подбор резюме
                        </h4>
                        <p className="text-gray-600 text-sm">
                          ИИ-система для сопоставления резюме с требованиями
                          вакансии и корпоративной культурой
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded mr-4">
                        <BarChart className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1 text-gray-900">
                          Аналитическая панель
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Детальная аналитика по базе кандидатов и эффективности
                          найма
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  Долгосрочное видение
                </h3>
                <p className="text-gray-700 mb-6">
                  Наша конечная цель - создать ИИ-экосистему для развития
                  карьеры, которая помогает профессионалам на всем пути их
                  карьерного роста - от поиска подходящей работы до развития
                  новых навыков и определения возможностей роста.
                </p>

                <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
                  <div className="text-blue-700 font-medium">
                    Присоединяйтесь к программе бета-тестирования
                  </div>
                  <Link to="/login">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all text-sm">
                      Записаться
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FuturePlans;
