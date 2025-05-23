import React, { useState } from 'react';
import { workFormatMap } from '../utils/workFormatMap';
import { Tooltip } from './Tooltip';

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
  url?: string; // Add the optional url field
}

interface VacancyCardProps {
  vacancy: Vacancy;
  matchScore?: number;
  matchReason?: string;
}

const VacancyCard: React.FC<VacancyCardProps> = ({
  vacancy,
  matchScore,
  matchReason,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const matchClassnames = {
    good: 'bg-green-100 text-green-800',
    average: 'bg-yellow-100 text-yellow-800',
    bad: 'bg-red-100 text-red-800',
  };

  const getMatchClassname = (score: number) => {
    if (score > 80) return matchClassnames.good;
    if (score > 50) return matchClassnames.average;
    return matchClassnames.bad;
  };

  return (
    <div
      className="bg-white shadow-lg rounded-lg p-6 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl"
      onClick={() => setIsExpanded(!isExpanded)}>
      <div className="flex justify-between items-start">
        <div className="flex gap-4 items-start">
          <h3 className="text-xl font-semibold text-indigo-700 mb-2">
            {vacancy.title}
          </h3>
          <a
            href={vacancy.url}
            target="_blank"
            onClick={(e) => e.stopPropagation()}>
            <img
              src="../../public/HeadHunter_logo.png"
              alt=""
              className="size-6"
            />
          </a>
        </div>
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
        <span className="font-medium">Формат:</span>{' '}
        {workFormatMap[vacancy.workFormat]}
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
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600 mb-3">
          <span className="font-medium">Тестовое задание:</span>{' '}
          {vacancy.hasTestTask ? 'Есть' : 'Нет'}
        </p>
        {matchReason && (
          <Tooltip content={matchReason}>
            <div
              className={`${getMatchClassname(
                matchScore || 0
              )} p-2 rounded-xl`}>
              <p className="font-medium">
                Подходит на {matchScore}% {'ℹ️'}
              </p>
            </div>
          </Tooltip>
        )}
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="text-md font-semibold text-gray-800 mb-2">
            Подробное описание:
          </h4>
          <p className="text-sm text-gray-600 whitespace-pre-line">
            {vacancy.description}
          </p>
          {vacancy.url && (
            <a
              href={vacancy.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={(e) => e.stopPropagation()} // Prevent card click when clicking the button
            >
              Перейти к вакансии
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default VacancyCard;
