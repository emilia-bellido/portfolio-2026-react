import { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/Navbar';
import ProjectSwiper from './components/ProjectSwiper';
import MyProfile from './components/MyProfile';
import ContactForm from './components/ContactForm';
import ProjectCard from './components/ProjectCard';
import AllWorkSection from './components/AllWorkSection';


function App() {
  
  return (
    <>
      <NavBar />

      <section className = "container" id="about">
        <div className = "row">
          <div className = "col-md-6">
            <MyProfile />
          </div>
          <div className = "col-md-6">
            <ProjectSwiper />
          </div>
        </div>   
      </section>

     <section id="all-works" className="container py-5">
        <h2 className="mb-4">All Works</h2>
        <AllWorkSection />
      </section>

      <ContactForm />
      
    
    </>
    
  );
};

export default App;
