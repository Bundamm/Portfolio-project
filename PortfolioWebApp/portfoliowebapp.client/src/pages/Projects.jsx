import React, { useEffect, useState } from 'react';
import { projectsApi, categoryApi } from "../services/api";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import EditButton from '../components/admin/EditButton';
import AddButton from '../components/admin/AddButton';
import EditProjectDialog from '../components/admin/EditProjectDialog';
import { useAdmin } from '../contexts/AdminContext';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../components/ui/hover-card';

function Projects() {
  const { isAdmin, logout } = useAdmin();
  
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Admin dialog states
  const [editProjectOpen, setEditProjectOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [isNewProject, setIsNewProject] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, categoriesData] = await Promise.all([
          projectsApi.getAll(),
          categoryApi.getAll()
        ]);
        setProjects(projectsData);
        setCategories(categoriesData || []);
      } catch (err) {
        setError('Nie udało się załadować danych. Spróbuj ponownie później.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Admin handlers
  const handleProjectSave = (savedProject) => {
    if (isNewProject) {
      setProjects(prev => [...prev, savedProject]);
    } else {
      setProjects(prev => 
        prev.map(project => 
          project.id === savedProject.id ? savedProject : project
        )
      );
    }
  };

  const handleProjectDelete = (deletedId) => {
    setProjects(prev => prev.filter(project => project.id !== deletedId));
  };

  const openEditProject = (project = null) => {
    setEditingProject(project);
    setIsNewProject(!project);
    setEditProjectOpen(true);
  };

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

  // Helper function to get category data by category ID
  const getCategoryById = (categoryId) => {
    return categories.find(category => category.categoryId === categoryId);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold">Moje Projekty</h1>
        <div className="flex items-center gap-4">
          {isAdmin && (
            <>
              <AddButton onClick={() => openEditProject()} size="sm">
                Dodaj Projekt
              </AddButton>
              <Button 
                variant="outline" 
                onClick={logout}
                className="flex items-center gap-2 text-red-600 border-red-300 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Wyloguj się
              </Button>
            </>
          )}
        </div>
      </div>
      
      <div className="space-y-24">
        {projectsToDisplay.map((project, index) => {
          const mainImage = getMainImage(project);
          const projectCategory = getCategoryById(project.categoryId);
          
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
              <div className="w-full md:w-1/2 relative">
                {isAdmin && (
                  <EditButton 
                    onClick={() => openEditProject(project)}
                    className="absolute top-0 right-0"
                    size="icon"
                    showText={false}
                  />
                )}
                <h2 className="text-2xl font-bold mb-4">{project.name}</h2>
                
                {/* Category with Hover Card */}
                {projectCategory && (
                  <div className="mb-4">
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 cursor-help hover:bg-blue-200 transition-colors">
                          {projectCategory.categoryName}
                        </span>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold">{projectCategory.categoryName}</h4>
                          <p className="text-sm text-gray-600">
                            {projectCategory.description || 'Brak dostępnego opisu'}
                          </p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                )}
                
                <p className="text-gray-700 mb-6">{project.description}</p>
                
                <div className="flex justify-center">
                  <Button asChild>
                    <Link to={`/project/${project.id}`}>
                      Zobacz szczegóły
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Admin Dialog */}
      <EditProjectDialog
        open={editProjectOpen}
        onOpenChange={setEditProjectOpen}
        data={editingProject}
        isNew={isNewProject}
        onSave={handleProjectSave}
        onDelete={handleProjectDelete}
      />
    </div>
  );
}

export default Projects;
