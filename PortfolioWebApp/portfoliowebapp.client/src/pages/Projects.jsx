import React from 'react';

function Projects() {
  // This is a placeholder for project data
  // Later you can fetch this from your Server component
  const projects = [
    {
      id: 1,
      title: 'Portfolio Website',
      description: 'Osobista strona portfolio stworzona przy użyciu React i ASP.NET Core.',
      technologies: ['React', 'ASP.NET Core', 'Tailwind CSS'],
      imageUrl: 'https://via.placeholder.com/300',
    },
    {
      id: 2,
      title: 'E-commerce Platform',
      description: 'Platforma zakupowa z systemem płatności online i zarządzaniem zamówieniami.',
      technologies: ['React', 'Redux', 'Node.js', 'MongoDB'],
      imageUrl: 'https://via.placeholder.com/300',
    },
    {
      id: 3,
      title: 'Task Management App',
      description: 'Aplikacja do zarządzania zadaniami z funkcjami współpracy zespołowej.',
      technologies: ['.NET', 'React', 'SQL Server', 'Azure'],
      imageUrl: 'https://via.placeholder.com/300',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Moje projekty</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
