// filepath: frontend/src/pages/HomePage.tsx
import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features'; // Assuming you have/will have this
import HowItWorks from '../components/HowItWorks';
import Newsletter from '../components/Newsletter';
// Import other sections as needed

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      {/* <Features /> */}
      <HowItWorks />
      <Newsletter />
      {/* Render other main page sections here */}
    </>
  );
};

export default HomePage;