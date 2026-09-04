import { useContext } from 'react';
import { useParams, Link } from "react-router";

import { ProjectContext } from '../context/ProjectContext';
import Carousel from 'react-bootstrap/Carousel'; //
import CloseDetailsBtn from './CloseDetailsBtn';


const ProjectDetailsPage = () => {
    const { myProjects } = useContext(ProjectContext);

    const { projectId } = useParams();
    const selectedProject = myProjects.find((project) => project.id === projectId);

    console.log(selectedProject);

    if(!selectedProject) {
        return <h2>Project Not found</h2>
    }

    //functions that checks all the categories for tools
    const renderCategory = (categoryTitle, toolsArray) => {
        if (!toolsArray || toolsArray.length === 0) {
            return null;
        }

        //if a category has anything, it will output html
        return (
            <div className="mb-4">
                <h5 className="fw-bold">{categoryTitle}</h5>
                <div className="d-flex flex-wrap gap-2">
                    {toolsArray.map((tool, index) => (
                        <span key={index} className="badge bg-secondary px-3 py-2">
                            {tool}
                        </span>
                    ))}
                </div>
            </div>
        );
    };

    return(
       
        <div className="container p-3 my-5">
             <CloseDetailsBtn />
            <div className="row">
                <div className= "col-md-8">
                    <h1> {selectedProject.title}</h1>
                    {(selectedProject.link || selectedProject.git) && (
                        <div className="links d-flex align-items-center justify-content-around my-3">
                            
                            {selectedProject.link && (
                                <a href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                                    Visit Website
                                </a>
                            )}

                            {selectedProject.git && (
                                <a href={selectedProject.git} target="_blank" rel="noopener noreferrer">
                                    Visit Repository
                                </a>
                            )}            
                        </div> )}
                </div> 
                <div className="col-md-4">
                    <div className="bg-light p-4 rounded">
                        <h3 className="mb-4">Tech Stack</h3>
                    
                        {renderCategory("Design & Creative", selectedProject.design)}
                        {renderCategory("Programming & Scripting", selectedProject.programming)}
                        {renderCategory("Databases & CMS", selectedProject.databases)}
                        {renderCategory("Systems & Hardware", selectedProject.systems)}
                        
                    </div>



                </div>





            </div>

            
            <h2>Description</h2>
            
            <p> {selectedProject.description}</p>

            <div>

                {/* THE SLIDESHOW */}
                    {/* Only render if the gallery array exists and has images */}
                    {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                        <Carousel className="mb-5 shadow-sm rounded overflow-hidden">
                            {selectedProject.gallery.map((image, index) => (
                                <Carousel.Item key={image.id || index}>
                                    <img
                                        className="d-block w-100"
                                        src={image.url}
                                        alt={`Slide ${index}`}
                                        loading="lazy" // The magic performance fix
                                        style={{ height: '400px', objectFit: 'cover' }} 
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    )}
            </div>  


            <div className="d-flex justify-content-around">
                <div>
                    <h2>Goal</h2>
                     <p> {selectedProject.goal}</p>
                </div>
                <div>
                    <h2>Key Features</h2>
                     <p> {selectedProject.features}</p>
                </div>
            
            
            </div>  

        </div>
    )
};

export default ProjectDetailsPage;
