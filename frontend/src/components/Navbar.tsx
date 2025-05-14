import React, { useState, useEffect } from "react";
import { Menu, X, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Briefcase className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-xl font-bold text-gray-900">CareerAI</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Возможности
            </a>
            <a
              href="#how-it-works"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Как это работает
            </a>
            <a
              href="#future"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Планы развития
            </a>
            <Link to="/login">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105">
                Попробовать бета-версию
              </button>
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md p-4 mt-2 rounded-b-lg transition-all duration-300 ease-in-out transform origin-top">
            <div className="flex flex-col space-y-4">
              <a
                href="#features"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Возможности
              </a>
              <a
                href="#how-it-works"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Как это работает
              </a>
              <a
                href="#future"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Планы развития
              </a>
              <Link to="/login">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all w-full">
                  Попробовать бета-версию
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
