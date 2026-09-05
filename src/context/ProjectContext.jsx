import { useState, useEffect, createContext } from 'react';

export const ProjectContext = createContext();

export const ProjectProvider = ({children}) => {
    
    const [myProjects, setMyProjects] = useState([]);

    useEffect(() => {
        const getProjects = async () => {
           
            try {
               const response = await fetch('/api/projects');
                const data = await response.json();
                console.log("Fetched fresh from Airtable:", data);

                const formattedData = data.records.map((project) => ({
                    id: project.fields["Project ID"],
                    title: project.fields["Title"],
                    image: project.fields["Main Image"]?.[0]?.url,
                    category: project.fields["Category"],
                    featured: project.fields["Featured"],
                    description: project.fields["Description"],
                    goal: project.fields["Goal"],
                    features: project.fields["Key Features"],
                    link: project.fields["Link"],
                    git: project.fields["Repository"],
                    design: project.fields["Design & Creative Tools"],
                    programming: project.fields["Programming & Scripting"],
                    databases: project.fields["Databses & Content Systems"],
                    systems: project.fields["Systems, Hardware & Version Control"],
                    gallery: project.fields["Gallery"] || [],
                }));

                const selectedProjects = formattedData.filter(project => project.featured === true);


                // 3. Save the newly formatted data to the browser for next time
                localStorage.setItem('cached_portfolio_projects', JSON.stringify(selectedProjects));
                
                setMyProjects(selectedProjects);
                
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