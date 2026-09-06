import { useState, useContext } from 'react';
import { useParams } from "react-router"; 
import Carousel from 'react-bootstrap/Carousel'; 
import { ProjectContext } from '../context/ProjectContext';
import CloseDetailsBtn from './CloseDetailsBtn';
import ReactMarkdown from 'react-markdown';

const ProjectDetailsPage = () => {
    const { myProjects } = useContext(ProjectContext);
    const { projectId } = useParams();
    
    // NEW: State to track which image is currently clicked/open
    const [lightboxImage, setLightboxImage] = useState(null);

    const selectedProject = myProjects.find((project) => project.id === projectId);

    if (!selectedProject) {
        return <h2 className="text-center mt-5 text-white">Project Not Found</h2>;
    }

    const renderCategory = (categoryTitle, toolsArray) => {
        if (!toolsArray || toolsArray.length === 0) return null;
        
        return (
            <div className="mb-4">
                <h5 className="fw-bold fs-6 text-uppercase text-muted-custom mb-2">{categoryTitle}</h5>
                <div className="d-flex flex-wrap gap-2">
                    {toolsArray.map((tool, index) => (
                        <span key={index} className="badge bg-secondary px-3 py-2 rounded-pill fw-normal">
                            {tool}
                        </span>
                    ))}
                </div>
            </div>
        );
    };

    const hasTools = (selectedProject.design && selectedProject.design.length > 0) || 
                     (selectedProject.programming && selectedProject.programming.length > 0) || 
                     (selectedProject.databases && selectedProject.databases.length > 0) || 
                     (selectedProject.systems && selectedProject.systems.length > 0);

    return(
        <>
            {/* NEW: THE LIGHTBOX OVERLAY */}
            {/* If an image is clicked, this fullscreen div appears. Clicking it sets state back to null (closes it) */}
            {lightboxImage && (
                <div 
                    onClick={() => setLightboxImage(null)}
                    style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        zIndex: 9999, // Ensures it sits on top of everything, including navbars
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        cursor: 'zoom-out' // Shows a minus magnifying glass to indicate clicking closes it
                    }}
                >
                    <img 
                        src={lightboxImage} 
                        alt="Enlarged view" 
                        style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }} 
                    />
                </div>
            )}

            <div className="container py-5 text-white">
                <div className="mb-4">
                    <CloseDetailsBtn />
                </div>

                {/* HEADER SECTION */}
                <div className="mb-5">
                    <h1 className="display-4 fw-bold mb-3">{selectedProject.title}</h1>
                    
                    {selectedProject.description && (
                        <p className="lead opacity-75 w-75">{selectedProject.description}</p>
                    )}
                    
                    {(selectedProject.link || selectedProject.git) && (
                        <div className="d-flex gap-3 mt-4">
                            {selectedProject.link && (
                                <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="btn btn-accent rounded-pill px-4">
                                    Watch Video / Visit Site
                                </a>
                            )}
                            {selectedProject.git && (
                                <a href={selectedProject.git} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light rounded-pill px-4">
                                    View Repository
                                </a>
                            )}            
                        </div> 
                    )}
                </div>

                {/* DYNAMIC MULTIMEDIA HANDLING */}
                {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                    selectedProject.category === 'Video & Multimedia' ? (
                        
                        <div className="row g-4 mb-5">
                            {selectedProject.gallery.map((image, index) => (
                                <div className="col-12 col-md-6" key={image.id || index}>
                                    <div 
                                        className="w-100 rounded-4 shadow-sm d-flex justify-content-center align-items-center"
                                        style={{ height: '350px', backgroundColor: 'rgba(0, 0, 0, 0.15)', overflow: 'hidden' }}
                                    >
                                        <img
                                            src={image.url}
                                            alt={`Gallery item ${index}`}
                                            loading="lazy"
                                            onClick={() => setLightboxImage(image.url)}
                                            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', cursor: 'zoom-in' }} 
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                    ) : (

                        <Carousel className="mb-5 shadow-lg rounded-4 overflow-hidden glass-card border-0">
                            {selectedProject.gallery.map((image, index) => (
                                <Carousel.Item key={image.id || index}>
                                    <div 
                                        className="d-flex justify-content-center align-items-center w-100"
                                        style={{ height: '500px', backgroundColor: 'rgba(0, 0, 0, 0.15)' }}
                                    >
                                        <img
                                            className="d-block"
                                            src={image.url}
                                            alt={`Slide ${index}`}
                                            loading="lazy"
                                            onClick={() => setLightboxImage(image.url)}
                                            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', cursor: 'zoom-in' }} 
                                        />
                                    </div>
                                </Carousel.Item>
                            ))}
                        </Carousel>

                    )
                )}

                {/* DETAILS SECTION */}
                <div className="row g-5 ">
                    <div className={`glass-project-page p-5 ${hasTools ? "col-lg-8" : "col-12"}`}>                        
                        {selectedProject.goal && (
                            <div className="mb-5">
                                <h3 className="fw-bold mb-3">The Goal</h3>
                                <p>{selectedProject.goal}</p>
                            </div>
                        )}
                        
                        {selectedProject.features && (
                            <div className="mb-5 custom-markdown-styles">
                                <h3 className="fw-bold mb-3">Key Features</h3>
                                <ReactMarkdown>{selectedProject.features}</ReactMarkdown>
                            </div>
                        )}

                        {selectedProject.metrics && (
                            <div className="mb-5 custom-markdown-styles">
                                <h3 className="fw-bold mb-3">Impact & Metrics</h3>
                                <ReactMarkdown>{selectedProject.metrics}</ReactMarkdown>
                            </div>
                        )}
                    </div>

                    {hasTools && (
                        <div className="col-lg-4">
                            <div className="glass-card p-4 sticky-top" style={{ top: '100px' }}>
                                <h3 className="fw-bold mb-4">Tools</h3>
                                {renderCategory("Design & Creative", selectedProject.design)}
                                {renderCategory("Programming & Scripting", selectedProject.programming)}
                                {renderCategory("Content & Data Management", selectedProject.databases)}
                                {renderCategory("Systems & Hardware", selectedProject.systems)}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProjectDetailsPage;