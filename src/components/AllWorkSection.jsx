import { useContext } from 'react';
import { ProjectContext } from '../context/ProjectContext';
import ProjectCard from './ProjectCard';

const AllWorkSection = () => {
    const { myProjects } = useContext(ProjectContext);
  return(
    <div className="container d-flex flex-wrap">
     {myProjects.map((project) => (
        <ProjectCard 
            key={project.id}
            id = {project.id}
            title = {project.title}
            image = {project.image}
         />


     ))}

    </div>
  );

};

export default AllWorkSection;
