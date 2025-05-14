// filepath: frontend/src/pages/HomePage.tsx
import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features"; 
import HowItWorks from "../components/HowItWorks";
import FuturePlans from "../components/FuturePlans"; 
import Newsletter from "../components/Newsletter";


const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Features /> 
      <HowItWorks />
      <FuturePlans /> 
      <Newsletter />
   
    </>
  );
};

export default HomePage;
