import { useState } from 'react'
import './App.css'
import NavBar from './components/Navbar';
import ProjectSwiper from './components/ProjectSwiper';
import MyProfile from './components/MyProfile';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    <>
      <NavBar />
      <div className = "container">
        <div className = "row">
          <div className = "col-md-6">
            <MyProfile />
          </div>
          <div className = "col-md-6">
            <ProjectSwiper />
          </div>
        </div>
        
        

      </div>
      
    
    </>
    
  );
};

export default App;
