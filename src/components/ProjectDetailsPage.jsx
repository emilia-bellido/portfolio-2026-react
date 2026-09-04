import { useContext } from 'react';
import { useParams } from "react-router"; 
import Carousel from 'react-bootstrap/Carousel'; 
import { ProjectContext } from '../context/ProjectContext';
import CloseDetailsBtn from './CloseDetailsBtn';

const ProjectDetailsPage = () => {
    const { myProjects } = useContext(ProjectContext);
    const { projectId } = useParams();
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

    return(
        <div className="container py-5 text-white">
            <div className="mb-4">
                <CloseDetailsBtn />
            </div>

            {/* HEADER SECTION */}
            <div className="mb-5">
                <h1 className="display-4 fw-bold mb-3">{selectedProject.title}</h1>
                <p className="lead opacity-75 w-75">{selectedProject.description}</p>
                
                {/* Converted plain <a> tags into proper UI buttons */}
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

            {/* THE SLIDESHOW */}
            {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                <Carousel className="mb-5 shadow-lg rounded-4 overflow-hidden glass-card border-0">
                    {selectedProject.gallery.map((image, index) => (
                        <Carousel.Item key={image.id || index}>
                            <img
                                className="d-block w-100"
                                src={image.url}
                                alt={`Slide ${index}`}
                                loading="lazy"
                                style={{ height: '500px', objectFit: 'cover' }} 
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            )}

            {/* DETAILS SECTION (Split Grid) */}
            <div className="row g-5">
                
                {/* Left Column: The Narrative */}
                <div className="col-lg-8">
                    {selectedProject.goal && (
                        <div className="mb-5">
                            <h3 className="fw-bold mb-3">The Goal</h3>
                            <p style={{ lineHeight: '1.8' }}>{selectedProject.goal}</p>
                        </div>
                    )}
                    
                    {selectedProject.features && (
                        <div className="mb-5">
                            <h3 className="fw-bold mb-3">Key Features</h3>
                            {/* whiteSpace: 'pre-wrap' preserves your Airtable bullet points */}
                            <p style={{ lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>{selectedProject.features}</p>
                        </div>
                    )}

                    {/* Integrated the Metrics section here! */}
                    {selectedProject.metrics && (
                        <div className="mb-5">
                            <h3 className="fw-bold mb-3">Impact & Metrics</h3>
                            <p style={{ lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>{selectedProject.metrics}</p>
                        </div>
                    )}
                </div>

                {/* Right Column: The Tech Stack */}
                <div className="col-lg-4">
                    {/* sticky-top makes the stack float nicely as they read the long text on the left */}
                    <div className="glass-card p-4 sticky-top" style={{ top: '100px' }}>
                        <h3 className="fw-bold mb-4">Tech Stack</h3>
                        {renderCategory("Design & Creative", selectedProject.design)}
                        {renderCategory("Programming & Scripting", selectedProject.programming)}
                        {renderCategory("Databases & CMS", selectedProject.databases)}
                        {renderCategory("Systems & Hardware", selectedProject.systems)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailsPage;