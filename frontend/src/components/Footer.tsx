import React from 'react';
import { Briefcase, Mail, Github, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <Briefcase className="h-6 w-6 text-blue-400 mr-2" />
              <span className="text-xl font-bold">CareerAI</span>
            </div>
            <p className="text-gray-400 mb-4">
              ИИ-рекомендации по поиску работы, учитывающие ваши навыки и карьерные цели.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Главная</a>
              </li>
              <li>
                <a href="#features" className="text-gray-400 hover:text-white transition-colors">Возможности</a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">Как это работает</a>
              </li>
              <li>
                <a href="#future" className="text-gray-400 hover:text-white transition-colors">Планы развития</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Ресурсы</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Документация</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Блог</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Карьера</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Политика конфиденциальности</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Связаться с нами</h4>
            <div className="flex items-center mb-3">
              <Mail className="h-5 w-5 text-gray-400 mr-2" />
              <a href="mailto:info@careerai.com" className="text-gray-400 hover:text-white transition-colors">
                info@careerai.com
              </a>
            </div>
            <p className="text-gray-400">
              Есть вопросы или предложения? Мы будем рады услышать вас.
            </p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all text-sm">
              Связаться с нами
            </button>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} CareerAI. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;