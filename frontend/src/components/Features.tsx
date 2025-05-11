import React from 'react';
import { Search, FileText, Target, Briefcase as BriefcaseBusiness, Brain, TrendingUp } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col">
      <div className="bg-blue-100 p-3 rounded-lg inline-flex mb-4 w-fit text-blue-600">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Как наш ИИ находит вашу идеальную работу
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Наша интеллектуальная система объединяет несколько технологий для предоставления персонализированных рекомендаций по работе.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Feature
            icon={<FileText className="h-6 w-6" />}
            title="Анализ профиля"
            description="Мы анализируем ваше резюме, портфолио и историю карьеры, чтобы понять ваши навыки и опыт."
          />
          
          <Feature
            icon={<Search className="h-6 w-6" />}
            title="Сканирование рынка"
            description="Наш агент анализирует тысячи вакансий, чтобы найти соответствия вашей квалификации."
          />
          
          <Feature
            icon={<Target className="h-6 w-6" />}
            title="Личные предпочтения"
            description="Мы учитываем ваши предпочтения по местоположению, корпоративной культуре и стилю работы."
          />
          
          <Feature
            icon={<Brain className="h-6 w-6" />}
            title="ML-рекомендации"
            description="Наша модель машинного обучения учится на ваших отзывах для улучшения подборок."
          />
          
          <Feature
            icon={<BriefcaseBusiness className="h-6 w-6" />}
            title="Карьерное развитие"
            description="Получите рекомендации по развитию навыков для желаемой карьерной траектории."
          />
          
          <Feature
            icon={<TrendingUp className="h-6 w-6" />}
            title="Возможности роста"
            description="Откройте для себя перспективные области и роли, где ваши навыки востребованы."
          />
        </div>
      </div>
    </section>
  );
};

export default Features;