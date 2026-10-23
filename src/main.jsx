import React from 'react'


import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import { ProjectProvider } from './context/ProjectContext';
import App from './App.jsx'
import './index.css'

// Only loaded when someone opens a project page
const ProjectDetailsPage = lazy(() => import('./components/ProjectDetailsPage'));

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <ProjectProvider>
        <BrowserRouter>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<App />}/>
              <Route path="/project/:projectId" element={<ProjectDetailsPage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
    </ProjectProvider>
  </StrictMode>,
)
