import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage"; // We will create this
import JobSearchPage from "./pages/JobSearchPage"; // Added import
// import ProfilePage from './pages/ProfilePage'; // Assuming you have or will create a profile page

// Layout for main application pages with Navbar and Footer
const MainLayout: React.FC = () => (
  <>
    <Navbar />
    <main>
      <Outlet /> {/* Child routes will render here */}
    </main>
    <Footer />
  </>
);

// Layout for authentication pages (Login, Register)
const AuthLayout: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-8">
    <Outlet /> {/* Auth form (Login or Register page) will render here */}
  </div>
);

const App: React.FC = () => {
  return (
    <Routes>
      {/* Routes with Navbar and Footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        {/* Example: <Route path="/profile" element={<ProfilePage />} /> */}
        {/* Add other main application routes here */}
      </Route>

      {/* Job Search Route without Navbar/Footer from MainLayout */}
      <Route path="/job-search" element={<JobSearchPage />} />

      {/* Auth routes without Navbar/Footer, using AuthLayout */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
};

export default App;
