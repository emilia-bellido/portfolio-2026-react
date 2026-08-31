import { useState, useEffect, createContext } from 'react';

export const ProjectContext = createContext();

export const ProjectProvider = ({children}) => {
    //setting myProjects array empty. useState will update once API call happens

    
    const[myProjects, setMyProjects] = useState([]);

     //const [isLoading, setIsLoading] - useState(true);
    useEffect(() => {
        const getProjects = async () => {
           
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
                    id: project.fields["Project ID"],
                    title: project.fields["Title"],
                    image: project.fields["Main Image"]?.[0]?.url,
                    category: project.fields["Category"],
                    featured: project.fields["Feature"],
                    description: project.fields["Description"],
                    problem: project.fields["The Problem"],
                    solution: project.fields["The Solution"],
                    link: project.fields["Link"],
                    git: project.fields["Repository"],
                    design: project.fields["Design & Creative Tools"],
                    programming: project.fields["Programming & Scripting"],
                    databases: project.fields["Databses & CMS"],
                    systems: project.fields["Systems, Hardware & Version Control"],
                    gallery: project.fields["Gallery"] || [],


                }));

                setMyProjects(formattedData);
                
            }
            catch(error){
                console.error("Error fetching data: ", error);
            };
        };

    getProjects();

  }, []);

    return (
            <ProjectContext.Provider value={{ myProjects }}>
                {children}
            </ProjectContext.Provider>
        );

};

export default ProjectContext;
