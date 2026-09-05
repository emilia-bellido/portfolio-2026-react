import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css'
import './App.css'


import NavBar from './components/NavBar';
import ProjectSwiper from './components/ProjectSwiper';
import Hero from './components/Hero';
import ContactForm from './components/ContactForm';
import ProjectCard from './components/ProjectCard';
import AllWorkSection from './components/AllWorkSection';
import Footer from './components/Footer';



function App() {
  
  return (
    <>
    
        <NavBar className="container"/>
   
      

      <section className = "container" id="about">
         <Hero />
      </section>

     <section id="all-works" className="container py-5">
        <AllWorkSection />
      </section>

      <section id="contact" className="container col-md-8">
      <h5 className="text-center">Let's Work Together!</h5>

      <ContactForm />
      </section> 
      <Footer />
      
      
    
    </>
    
  );
};

export default App;
