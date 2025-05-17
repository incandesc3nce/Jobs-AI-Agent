import React, { useState } from 'react';

interface Vacancy {
  id: string;
  title: string;
  keySkills: string[];
  company: string;
  location: string;
  salary: string;
  workSchedule: string;
  workFormat: 'Remote' | 'Hybrid' | 'Onsite';
  isInternship: boolean;
  hasTestTask: boolean;
  description: string;
}

interface VacancyCardProps {
  vacancy: Vacancy;
}

const VacancyCard: React.FC<VacancyCardProps> = ({ vacancy }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="bg-white shadow-lg rounded-lg p-6 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl"
      onClick={() => setIsExpanded(!isExpanded)}>
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold text-indigo-700 mb-2">
          {vacancy.title}
        </h3>
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            vacancy.isInternship
              ? 'bg-green-100 text-green-800'
              : 'bg-blue-100 text-blue-800'
          }`}>
          {vacancy.isInternship ? 'Internship' : 'Full-time'}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium">Компания:</span> {vacancy.company} |{' '}
        <span className="font-medium">Местоположение:</span> {vacancy.location}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium">Зарплата:</span> {vacancy.salary}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium">График:</span> {vacancy.workSchedule} |{' '}
        <span className="font-medium">Формат:</span> {vacancy.workFormat}
      </p>
      <div className="mb-3">
        <span className="font-medium text-sm text-gray-700">
          Требуемые скиллы:
        </span>
        <div className="flex flex-wrap gap-2 mt-1">
          {vacancy.keySkills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 bg-gray-200 text-gray-700 rounded-md text-xs">
              {skill}
            </span>
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-3">
        <span className="font-medium">Тестовое задание:</span>{' '}
        {vacancy.hasTestTask ? 'Есть' : 'Нет'}
      </p>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="text-md font-semibold text-gray-800 mb-2">
            Подробное описание:
          </h4>
          <p className="text-sm text-gray-600 whitespace-pre-line">
            {vacancy.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default VacancyCard;
