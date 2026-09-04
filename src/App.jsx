import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css'
import './App.css'


import NavBar from './components/Navbar';
import ProjectSwiper from './components/ProjectSwiper';
import Hero from './components/Hero';
import ContactForm from './components/ContactForm';
import ProjectCard from './components/ProjectCard';
import AllWorkSection from './components/AllWorkSection';



function App() {
  
  return (
    <>
      <NavBar />

      <section className = "container" id="about">
         <Hero />
      </section>

     <section id="all-works" className="container py-5">
        <AllWorkSection />
      </section>

      <ContactForm />
      
    
    </>
    
  );
};

export default App;
