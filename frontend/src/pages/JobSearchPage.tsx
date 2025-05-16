import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Added Link import
import { Briefcase } from "lucide-react"; // Added Briefcase icon import
import VacancyCard from "../components/VacancyCard";

interface ResumeFormState {
  title: string;
  skills: string;
  experience: string;
  location: string;
  workFormat: "Remote" | "Hybrid" | "Onsite" | "";
}

interface Vacancy {
  id: string;
  title: string;
  skills: string[];
  company: string;
  location: string;
  salary: string;
  workSchedule: string;
  workFormat: "Remote" | "Hybrid" | "Onsite";
  isInternship: boolean;
  hasTestTask: boolean;
  description: string;
}

const mockVacancies: Vacancy[] = Array.from({ length: 25 }, (_, i) => ({
  id: `vacancy-${i + 1}`,
  title: `Software Engineer ${i + 1}`,
  skills: ["React", "Node.js", "TypeScript"],
  company: `Tech Solutions Inc. ${i + 1}`,
  location: "New York, NY",
  salary: "$100,000 - $120,000",
  workSchedule: "Full-time",
  workFormat: "Remote",
  isInternship: i % 5 === 0,
  hasTestTask: i % 3 === 0,
  description: `This is a detailed description for the Software Engineer ${
    i + 1
  } position. We are looking for a skilled and motivated developer to join our dynamic team. Responsibilities include developing and maintaining web applications, collaborating with cross-functional teams, and contributing to all phases of the development lifecycle. Required skills include proficiency in React, Node.js, and TypeScript. Experience with Agile methodologies is a plus.`,
}));

const JobSearchPage: React.FC = () => {
  const [resumeForm, setResumeForm] = useState<ResumeFormState>({
    title: "",
    skills: "",
    experience: "",
    location: "",
    workFormat: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVacancies, setFilteredVacancies] =
    useState<Vacancy[]>(mockVacancies);
  const [currentPage, setCurrentPage] = useState(1);
  const [jwtToken, setJwtToken] = useState<string | null>(null);

  const vacanciesPerPage = 10;

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setJwtToken(token);
    }
    // In a real app, you might want to redirect to login if no token is found
    // or if the token is invalid.
  }, []);

  const handleResumeInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setResumeForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleResumeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Resume submitted:", resumeForm);
    // Here you would typically send the resume data to the backend
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lowerSearchTerm = searchTerm.toLowerCase();
    const results = mockVacancies.filter(
      (vacancy) =>
        vacancy.title.toLowerCase().includes(lowerSearchTerm) ||
        vacancy.company.toLowerCase().includes(lowerSearchTerm) ||
        vacancy.skills.some((skill) =>
          skill.toLowerCase().includes(lowerSearchTerm)
        )
    );
    setFilteredVacancies(results);
    setCurrentPage(1); // Reset to first page after search
  };

  // Pagination logic
  const indexOfLastVacancy = currentPage * vacanciesPerPage;
  const indexOfFirstVacancy = indexOfLastVacancy - vacanciesPerPage;
  const currentVacancies = filteredVacancies.slice(
    indexOfFirstVacancy,
    indexOfLastVacancy
  );
  const totalPages = Math.ceil(filteredVacancies.length / vacanciesPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white p-6 shadow-lg flex flex-col">
        <div className="mb-8">
          <Link
            to="/"
            className="flex justify-center items-center text-xl font-semibold text-gray-900"
          >
            <Briefcase className="w-7 h-7 mr-2 text-indigo-600" />
            <span>CareerAI</span>
          </Link>
        </div>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">My Resume</h2>
        <form onSubmit={handleResumeSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
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
              className="block text-sm font-medium text-gray-700"
            >
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
              className="block text-sm font-medium text-gray-700"
            >
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
              className="block text-sm font-medium text-gray-700"
            >
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
              className="block text-sm font-medium text-gray-700"
            >
              Формат работы
            </label>
            <select
              name="workFormat"
              id="workFormat"
              value={resumeForm.workFormat}
              onChange={handleResumeInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">Выберите формат</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Onsite">Onsite</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Сохранить
          </button>
        </form>
        {jwtToken && (
          <p className="mt-4 text-xs text-gray-500">
            Token: {jwtToken.substring(0, 20)}...
          </p>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Search Bar */}
        <div className="mb-6">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center max-w-xl mx-auto"
          >
            <input
              type="text"
              placeholder="Поиск вакансий..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Поиск
            </button>
          </form>
        </div>

        {/* Vacancy Cards */}
        {currentVacancies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
            {currentVacancies.map((vacancy) => (
              <VacancyCard key={vacancy.id} vacancy={vacancy} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Вакансии не найдены.</p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <nav
              className="inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              {currentPage > 1 && (
                <button
                  onClick={() => paginate(currentPage - 1)}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Previous
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
                        ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {pageNumber}
                  </button>
                )
              )}
              {currentPage < totalPages && (
                <button
                  onClick={() => paginate(currentPage + 1)}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Next
                </button>
              )}
            </nav>
          </div>
        )}
      </main>
    </div>
  );
};

export default JobSearchPage;
