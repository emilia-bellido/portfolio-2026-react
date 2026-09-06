import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button'; 
import { ProjectContext } from '../context/ProjectContext';
import ProjectCard from './ProjectCard';
import Spinner from 'react-bootstrap/Spinner';
import CardGroup from 'react-bootstrap/CardGroup';


const AllWorkSection = () => {
   const { myProjects } = useContext(ProjectContext);
    
    // 1. Set initial state to an empty string so nothing is selected yet
    const [activeCategory, setActiveCategory] = useState("");

    const categoriesBtn = (e) => {
      const categoryName = e.target.innerText;
      setActiveCategory(categoryName);
    };

    // 2. Filter the projects on the fly
    const categorizedProjects = myProjects.filter((project) => project.category === activeCategory);

    // If Airtable is still fetching, show this sleek centered loading spinner
    if (!myProjects || myProjects.length === 0) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center w-100" style={{ minHeight: '50vh' }}>
                <Spinner animation="border" style={{ color: 'var(--text-muted)' }} />
                <p className="text-white mt-3 fw-bold tracking-wide">Loading Projects...</p>
            </div>
        );
    }
    
  return(
    <div id="projects">
      <p className="fw-medium fs-5 mb-3">What would you like to see?</p>

      <div className="d-flex flex-wrap gap-2">
        <Button onClick={categoriesBtn} variant="outline-light" className="rounded-pill px-4 py-2 fw-medium">
          Software & Web Development
        </Button>
        <Button onClick={categoriesBtn} variant="outline-light" className="rounded-pill px-4 py-2 fw-medium">
          Brand & UI Design
        </Button>
        <Button onClick={categoriesBtn} variant="outline-light" className="rounded-pill px-4 py-2 fw-medium">
          Digital Marketing
        </Button>
        <Button onClick={categoriesBtn} variant="outline-light" className="rounded-pill px-4 py-2 fw-medium">
          Video & Multimedia
        </Button>
      </div>

      <CardGroup className="container d-flex flex-wrap mt-4 gap-3 mb-4">
        {categorizedProjects.map((project) => (
            <ProjectCard 
                key={project.id}
                id={project.id}
                title={project.title}
                image={project.image}
            />
        ))}
      </CardGroup>
    </div>
  );
};

export default AllWorkSection;