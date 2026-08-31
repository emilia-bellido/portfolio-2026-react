import { useContext } from 'react';
import { useParams } from "react-router";

import { ProjectContext } from '../context/ProjectContext';


//find which project the user has clicked on 




const ProjectDetailsPage = () => {
    const { myProjects } = useContext(ProjectContext);

    const { projectId } = useParams();
    const selectedProject = myProjects.find((project) => project.id === projectId);

    if(!selectedProject) {
        return <h2>Project Not found</h2>
    }

    return(
        <div>
            <h1> {selectedProject.title}</h1>
        </div>
    )
};

export default ProjectDetailsPage;
