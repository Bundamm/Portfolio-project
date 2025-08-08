import React, { useEffect, useState } from 'react';
import { projectsApi } from "../services/api";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectsApi.getAll();
        setProjects(data);
      } catch (err) {
        setError('Failed to load projects. Please try again later.');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }
  
  const projectsToDisplay = projects;

  // Helper function to get the first image from a project or return null
  const getMainImage = (project) => {
    if (project.images && project.images.length > 0) {
      return project.images[0].path;
    }
    return null;
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-12 text-center">My Projects</h1>
      
      <div className="space-y-24">
        {projectsToDisplay.map((project, index) => {
          const mainImage = getMainImage(project);
          
          return (
            <div 
              key={project.id} 
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
            >
              {/* Project Image with Centered Title */}
              <div className="w-full md:w-1/2">
                <div className="relative w-full overflow-hidden rounded-lg border-2 border-gray-300" style={{ paddingBottom: '75%' }}>
                  {mainImage ? (
                    <>
                      {/* Main image */}
                      <img 
                        src={mainImage} 
                        alt={project.name} 
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      
                      {/* Dark overlay for better text visibility */}
                      <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-white text-center px-4">{project.name}</h2>
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-600 text-center px-4">{project.name}</h2>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Project Details */}
              <div className="w-full md:w-1/2">
                <h2 className="text-2xl font-bold mb-4">{project.name}</h2>
                <p className="text-gray-700 mb-6">{project.description}</p>
                
                <div className="flex gap-4">
                  <Button asChild>
                    <Link to={`/project/${project.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Projects;
