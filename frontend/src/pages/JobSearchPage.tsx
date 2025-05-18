import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Edit3, PlusCircle, Trash2 } from 'lucide-react';
import VacancyCard from '../components/VacancyCard';
import { resumeService, Resume } from '../services/resumeService';
import { apiFetch } from '../utils/apiFetch';

export interface ResumeFormState {
  title: string;
  skills: string;
  experience: string;
  location: string;
  workFormat: 'Remote' | 'Hybrid' | 'Onsite' | '';
}

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
  url?: string;
}

const JobSearchPage: React.FC = () => {
  const initialResumeFormState: ResumeFormState = {
    title: '',
    skills: '',
    experience: '',
    location: '',
    workFormat: '',
  };

  const localStorageResumes = localStorage.getItem('resumes');

  const [resumeForm, setResumeForm] = useState<ResumeFormState>(
    initialResumeFormState
  );
  const [userResumes, setUserResumes] = useState<Resume[]>(
    localStorageResumes ? JSON.parse(localStorage.getItem('resumes')!) : []
  );
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(
    JSON.parse(localStorage.getItem('resumes') ?? '')[0]?.id ?? null
  );
  const [isLoadingResumes, setIsLoadingResumes] = useState(
    localStorageResumes ? false : true
  );

  const [resumeError, setResumeError] = useState<string | null>(null);

  const [filteredVacancies, setFilteredVacancies] = useState<Vacancy[]>([]);
  const [isLoadingVacancies, setIsLoadingVacancies] = useState(true);
  const [vacancyError, setVacancyError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [stickyHeaderActualHeight, setStickyHeaderActualHeight] = useState(0);
  const scrollTriggerRef = useRef<HTMLDivElement>(null);
  const actualStickyHeaderRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const vacanciesPerPage = 10;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setJwtToken(token);
    } else {
      console.log('No token found on mount, redirecting to login.');
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (jwtToken) {
      fetchUserResumes();
    }
  }, [jwtToken, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTriggerRef.current) {
        if (window.scrollY > scrollTriggerRef.current.offsetTop) {
          setIsHeaderSticky(true);
        } else {
          setIsHeaderSticky(false);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isHeaderSticky && actualStickyHeaderRef.current) {
      setStickyHeaderActualHeight(actualStickyHeaderRef.current.offsetHeight);
    }
  }, [isHeaderSticky]);

  const fetchVacancies = useCallback(async (resume?: Resume) => {
    setIsLoadingVacancies(true);
    setVacancyError(null);

    let url = `https://jobs-agent-backend-2.loca.lt/api/match/get?resumeId=${selectedResumeId}`;

    if (resume) {
      const skillsString = Array.isArray(resume.skills)
        ? resume.skills.join(',')
        : '';
      let combinedFilter = '';

      if (resume.title) {
        combinedFilter += resume.title;
      }
      if (skillsString) {
        if (combinedFilter && resume.title) combinedFilter += ',';
        combinedFilter += skillsString;
      }

      const filterValue = combinedFilter.replace(/\s+/g, '');

      if (filterValue) {
        url = `https://jobs-agent-backend-2.loca.lt/api/match/get?resumeId=${selectedResumeId}`;
      }
    }

    try {
      const result = await apiFetch<any>(url);
      if (result && result.summaries && Array.isArray(result.summaries)) {
        setFilteredVacancies(result.summaries);
      } else if (result && Array.isArray(result)) {
        setFilteredVacancies(result);
      } else {
        setFilteredVacancies([]);
      }
      setCurrentPage(1);
    } catch (err: any) {
      console.error('Failed to fetch vacancies:', err);
      setVacancyError(err.message || 'Failed to load vacancies.');
      setFilteredVacancies([]);
    } finally {
      setIsLoadingVacancies(false);
    }
  }, []);

  const fetchUserResumes = useCallback(async () => {
    setResumeError(null);
    const resumes = localStorage.getItem('resumes');

    if (resumes) {
      const parsedResumes = JSON.parse(resumes);
      setUserResumes(parsedResumes);
      if (parsedResumes.length > 0) {
        const resumeToSelect = parsedResumes[parsedResumes.length - 1];
        await handleSelectResume(resumeToSelect.id, resumeToSelect);
      } else {
        setResumeForm(initialResumeFormState);
        setSelectedResumeId(null);
        await fetchVacancies();
      }
      return;
    }

    // If no resumes in localStorage, fetch from API
    setIsLoadingResumes(true);

    try {
      const resumes = await resumeService.getUserResumes();
      localStorage.setItem('resumes', JSON.stringify(resumes));
      setUserResumes(resumes);

      if (resumes.length > 0) {
        const resumeToSelect = resumes[resumes.length - 1];
        await handleSelectResume(resumeToSelect.id, resumeToSelect);
      } else {
        setResumeForm(initialResumeFormState);
        setSelectedResumeId(null);
        await fetchVacancies();
      }
    } catch (error: any) {
      console.error('Failed to load resumes:', error);
      const errorMessage = String(error.message || '').toLowerCase();
      if (
        errorMessage.includes('unauthorized') ||
        errorMessage.includes('token') ||
        errorMessage.includes('forbidden')
      ) {
        setResumeError('Authentication failed. Please log in again.');
        setTimeout(() => navigate('/login'), 1500);
      } else if (errorMessage.includes('not found')) {
        setUserResumes([]);
        setResumeForm(initialResumeFormState);
        setSelectedResumeId(null);
        await fetchVacancies();
      } else {
        setResumeError(
          error.message || 'Failed to load resumes. Please try again.'
        );
        await fetchVacancies();
      }
    } finally {
      setIsLoadingResumes(false);
    }
  }, [navigate, fetchVacancies]);

  const handleResumeInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setResumeForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleResumeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResumeError(null);
    if (
      !resumeForm.title ||
      !resumeForm.skills ||
      !resumeForm.experience ||
      !resumeForm.location ||
      !resumeForm.workFormat
    ) {
      setResumeError('All fields are required.');
      return;
    }

    try {
      const payload: ResumeFormState = {
        ...resumeForm,
      };

      if (selectedResumeId) {
        await resumeService.updateResume(selectedResumeId, payload);
        localStorage.removeItem('resumes');
      } else {
        await resumeService.createResume(payload);
        localStorage.removeItem('resumes');
      }
      await fetchUserResumes();
    } catch (error: any) {
      setResumeError(error.message || 'Failed to save resume.');
      console.error('Failed to save resume:', error);
    }
  };

  const handleSelectResume = useCallback(
    async (resumeId: string, resumeObject?: Resume) => {
      const resumeToEdit =
        resumeObject || userResumes.find((r) => r.id === resumeId);
      if (resumeToEdit) {
        setResumeForm({
          title: resumeToEdit.title,
          skills: Array.isArray(resumeToEdit.skills)
            ? resumeToEdit.skills.join(', ')
            : '',
          experience: String(resumeToEdit.experience),
          location: resumeToEdit.location,
          workFormat: resumeToEdit.workFormat,
        });
        setSelectedResumeId(resumeId);
        setResumeError(null);
        await fetchVacancies(resumeToEdit);
      }
    },
    [userResumes, fetchVacancies]
  );

  const handleCreateNewResume = useCallback(async () => {
    setResumeForm(initialResumeFormState);
    setSelectedResumeId(null);
    setResumeError(null);
    await fetchVacancies();
  }, [fetchVacancies, initialResumeFormState]);

  const handleDeleteResume = async (resumeId: string) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      setResumeError(null);
      try {
        await resumeService.deleteResume(resumeId);
        localStorage.removeItem('resumes');
        await fetchUserResumes();
      } catch (error: any) {
        setResumeError(error.message || 'Failed to delete resume.');
        console.error('Failed to delete resume:', error);
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingVacancies(true);
    setVacancyError(null);
    const lowerSearchTerm = searchTerm.toLowerCase();

    const searchApiUrl = `https://jobs-agent-backend-2.loca.lt/api/vacancies/get?filter=${lowerSearchTerm}&filterType=some&take=1000&skip=0`;
    try {
      const result = await apiFetch<any>(searchApiUrl);
      if (result && result.summaries && Array.isArray(result.summaries)) {
        setFilteredVacancies(result.summaries);
      } else if (result && Array.isArray(result)) {
        setFilteredVacancies(result);
      } else {
        setFilteredVacancies([]);
      }
      setCurrentPage(1);
    } catch (searchError: any) {
      console.error('Failed to fetch search results:', searchError);
      setVacancyError(searchError.message || 'Failed to perform search.');
      setFilteredVacancies([]);
    } finally {
      setIsLoadingVacancies(false);
    }
  };

  const indexOfLastVacancy = currentPage * vacanciesPerPage;
  const indexOfFirstVacancy = indexOfLastVacancy - vacanciesPerPage;
  const currentVacancies = filteredVacancies?.slice(
    indexOfFirstVacancy,
    indexOfLastVacancy
  );
  const totalPages = Math.ceil(
    (filteredVacancies?.length || 0) / vacanciesPerPage
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gray-100 relative">
      <div
        ref={actualStickyHeaderRef}
        className={`
          flex 
          fixed top-0 left-0 right-0 z-50
          items-center w-full px-6 
          transition-all duration-300 ease-in-out
          ${
            isHeaderSticky
              ? 'bg-white shadow-md py-2 opacity-100 visible'
              : 'bg-transparent py-4 opacity-0 invisible'
          }
        `}>
        <div className="w-1/4 flex justify-center items-center">
          <Link
            to="/"
            className="flex items-center text-xl font-semibold text-gray-900">
            <Briefcase className="w-7 h-7 mr-2 text-indigo-600" />
            <span>CareerAI</span>
          </Link>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center justify-center max-w-xl w-full">
            <input
              type="text"
              placeholder="Поиск вакансий..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
              Поиск
            </button>
          </form>
        </div>
      </div>

      {isHeaderSticky && stickyHeaderActualHeight > 0 && (
        <div style={{ height: `${stickyHeaderActualHeight}px` }} />
      )}

      <div className="flex min-h-screen">
        <aside className="w-1/4 bg-white p-6 shadow-lg flex flex-col">
          <div
            className={`mb-8 flex justify-center items-center ${
              isHeaderSticky ? 'invisible' : 'visible'
            }`}>
            <Link
              to="/"
              className="flex items-center text-xl font-semibold text-gray-900">
              <Briefcase className="w-7 h-7 mr-2 text-indigo-600" />
              <span>CareerAI</span>
            </Link>
          </div>
          {isLoadingResumes && (
            <p className="text-center text-gray-500">Загружаем резюме...</p>
          )}
          {!isLoadingResumes && userResumes.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">
                Ваши резюме:
              </h3>
              <ul className="space-y-1 max-h-48 overflow-y-auto border rounded-md p-2">
                {userResumes.map((resume) => (
                  <li
                    key={resume.id}
                    className={`p-2 rounded-md cursor-pointer flex justify-between items-center text-sm ${
                      selectedResumeId === resume.id
                        ? 'bg-indigo-100 text-indigo-700 font-semibold'
                        : 'hover:bg-gray-50'
                    }`}>
                    <span
                      onClick={() => handleSelectResume(resume.id)}
                      className="flex-grow truncate"
                      title={resume.title}>
                      {resume.title}
                    </span>
                    <div className="flex-shrink-0 ml-2">
                      <button
                        onClick={() => handleSelectResume(resume.id)}
                        className="p-1 text-blue-500 hover:text-blue-700 focus:outline-none"
                        title="Edit">
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteResume(resume.id)}
                        className="p-1 text-red-500 hover:text-red-700 focus:outline-none"
                        title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {!isLoadingResumes && userResumes.length === 0 && !resumeError && (
            <p className="text-center text-gray-500 mb-4">
              Резюме не найдено. Создай его ниже!
            </p>
          )}
          <button
            onClick={handleCreateNewResume}
            className="mb-6 w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            <PlusCircle size={18} className="mr-2" /> Создать резюме
          </button>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            {selectedResumeId ? 'Редактировать резюме' : 'Создать резюме'}
          </h2>
          {resumeError && (
            <p className="text-red-500 text-sm mb-3 bg-red-50 p-2 rounded-md">
              Ошибка: {resumeError}
            </p>
          )}
          <form
            onSubmit={handleResumeSubmit}
            className="space-y-4 flex-grow flex flex-col">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700">
                Должность
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={resumeForm.title}
                onChange={handleResumeInputChange}
                placeholder="Ваша должность"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="skills"
                className="block text-sm font-medium text-gray-700">
                Скиллы
              </label>
              <input
                type="text"
                name="skills"
                id="skills"
                value={resumeForm.skills}
                onChange={handleResumeInputChange}
                placeholder="Через запятую"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="experience"
                className="block text-sm font-medium text-gray-700">
                Опыт работы
              </label>
              <input
                name="experience"
                id="experience"
                value={resumeForm.experience}
                onChange={handleResumeInputChange}
                placeholder="Количество лет"
                type="number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700">
                Местоположение
              </label>
              <input
                type="text"
                name="location"
                id="location"
                value={resumeForm.location}
                onChange={handleResumeInputChange}
                placeholder="Город"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="workFormat"
                className="block text-sm font-medium text-gray-700">
                Формат работы
              </label>
              <select
                name="workFormat"
                id="workFormat"
                value={resumeForm.workFormat}
                onChange={handleResumeInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required>
                <option value="">Выберите формат</option>
                <option value="Remote">Удаленно</option>
                <option value="Hybrid">Гибрид</option>
                <option value="Onsite">Офис</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={isLoadingResumes}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-auto disabled:opacity-50">
              {selectedResumeId ? 'Обновить резюме' : 'Сохранить резюме'}
            </button>
          </form>
        </aside>

        <main className="flex-1 p-6">
          <div
            ref={scrollTriggerRef}
            className={`mb-6 ${isHeaderSticky ? 'invisible' : 'visible'}`}>
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center justify-center max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Поиск вакансий..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Поиск
              </button>
            </form>
          </div>

          {isLoadingVacancies && (
            <p className="text-center text-indigo-600 py-8 text-2xl font-bold animate-pulse">
              ИИ ПОДБИРАЕТ ДЛЯ ВАС ИДЕАЛЬНЫЕ ВАКАНСИИ
            </p>
          )}
          {vacancyError && (
            <p className="text-center text-red-500 py-4">
              Ошибка при подборе вакансий: {vacancyError}
            </p>
          )}
          {!isLoadingVacancies &&
          !vacancyError &&
          (currentVacancies?.length || 0) > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              {currentVacancies?.map((vacancy) => (
                <VacancyCard
                  key={vacancy.id}
                  vacancy={vacancy?.summary || vacancy}
                  matchScore={vacancy?.matchScore}
                  matchReason={vacancy?.matchReason}
                />
              ))}
            </div>
          ) : (
            !isLoadingVacancies &&
            !vacancyError && (
              <p className="text-center text-gray-500 py-4">
                Вакансии не найдены.
              </p>
            )
          )}

          {!isLoadingVacancies && totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <nav
                className="inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination">
                {currentPage > 1 && (
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Предыдущая
                  </button>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => paginate(pageNumber)}
                      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium
                    ${
                      currentPage === pageNumber
                        ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}>
                      {pageNumber}
                    </button>
                  )
                )}
                {currentPage < totalPages && (
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Следующая
                  </button>
                )}
              </nav>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default JobSearchPage;
