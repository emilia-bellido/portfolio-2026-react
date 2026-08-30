import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';

const AllWorkSection = () => {

    //setting myProjects array empty. useState will update once API call happens
    const[myProjects, setMyProjects] = useState([]);

    //const [isLoading, setIsLoading] - useState(true);



  useEffect(() => {

    const getProjects = async () =>{
        try{
            const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
            const url = `https://api.airtable.com/v0/${baseId}/Projects`;

            const response = await fetch(url, {
                headers: {
                Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_PAT}`
                }
            });

            const data = await response.json();
            console.log(data);

            const formattedData = data.records.map((project) => ({
                id: project.fields["Project Id"],
                title: project.fields["Title"],
                image: project.fields["Main Image"]?.[0]?.url
            }));

            setMyProjects(formattedData);
            
        }
        catch(error){
            console.error("Error fetching data: ", error);
        };
    };

    getProjects();

  }, []);

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
