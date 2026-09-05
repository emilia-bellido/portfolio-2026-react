import { useState, useEffect, createContext } from 'react';

export const ProjectContext = createContext();

export const ProjectProvider = ({children}) => {
    
    const [myProjects, setMyProjects] = useState([]);

    useEffect(() => {
        const getProjects = async () => {
           
            try {
                // 1. Check if we already have the data saved in the browser
                const cachedData = localStorage.getItem('cached_portfolio_projects');
                
                if (cachedData) {
                    // If we do, parse it, set it, and STOP the function. No API call!
                    setMyProjects(JSON.parse(cachedData));
                    console.log("Loaded projects from local cache! API bypassed.");
                    return; 
                }

                // 2. If no cache exists, do the normal API call
                const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
                const url = `https://api.airtable.com/v0/${baseId}/Projects`;

                const response = await fetch(url, {
                    headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_PAT}`
                    }
                });

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