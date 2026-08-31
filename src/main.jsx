import React from 'react'


import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css'
import { ProjectProvider } from './context/ProjectContext';
import ProjectDetailsPage from './components/ProjectDetailsPage'; // or wherever you saved it!
import App from './App.jsx'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <ProjectProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}/>
            <Route path="/project/:projectId" element={<ProjectDetailsPage />} />
          </Routes>
        </BrowserRouter>
    </ProjectProvider>
  </StrictMode>,
)
