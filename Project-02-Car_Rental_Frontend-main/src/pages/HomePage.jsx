import React, { Component, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
const HomePage = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();

    document.documentElement.classList.add("dark");
  }, []);


  return (
    <div className="bg-black text-white overflow-x-hidden">
      <Hero />
      <About />
      <Services />
    </div>
  );
};

export default HomePage;