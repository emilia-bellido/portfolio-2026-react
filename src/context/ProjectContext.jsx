import { useState, useEffect, createContext } from 'react';

export const ProjectContext = createContext();

const CACHE_KEY = 'cached_portfolio_projects';
const CACHE_TIME_KEY = 'cached_portfolio_projects_timestamp';
const CACHE_TTL = 1000 * 60 * 60 * 24 * 14; // 2 weeks

export const ProjectProvider = ({ children }) => {
    const [myProjects, setMyProjects] = useState(() => {
        try {
            const cached = localStorage.getItem(CACHE_KEY);
            return cached ? JSON.parse(cached) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        const cachedTime = Number(localStorage.getItem(CACHE_TIME_KEY) || 0);
        const isFresh = Date.now() - cachedTime < CACHE_TTL;

        // Cache exists and isn't stale -> skip the network call entirely
        if (myProjects.length > 0 && isFresh) {
            console.log("Using cached projects, skipping Airtable call");
            return;
        }

        const getProjects = async () => {
            try {
                const response = await fetch('/api/project');
                const data = await response.json();

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
                    web: project.fields["Frontend & Web Frameworks"],
                    databases: project.fields["Data & Content Systems"],
                    systems: project.fields["Systems, Hardware & Version Control"],
                    gallery: project.fields["Gallery"] || [],
                }));

                const selectedProjects = formattedData.filter(p => p.featured === true);

              
                localStorage.setItem(CACHE_TIME_KEY, String(Date.now()));
                setMyProjects(selectedProjects);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
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
