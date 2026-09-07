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
    
      <header className = "container p-3">
        <NavBar />
      </header>
      
   
      

      <section className = "container p-3" id="about">
         <Hero />
      </section>

     <section id="all-works" className="container p-3">
        <AllWorkSection />
      </section>

      <section className="p-3 d-flex align-items-center justify-content-center">
        <div id="contact" className="form-design m-3 d-flex align-items-center justify-content-center flex-column">
          <h5 className="text-center pt-5">Let's Work Together!</h5>

          <ContactForm />
        </div>
      </section>
      
      <Footer />
      
      
    
    </>
    
  );
};

export default App;
