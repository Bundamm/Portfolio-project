import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectsApi } from '../services/api';
import { Button } from '../components/ui/button';
import { AspectRatio } from '../components/ui/aspect-ratio';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from '../components/ui/carousel';
import { ChevronLeft, FileText } from 'lucide-react';

function Project() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await projectsApi.getById(parseInt(id));
        setProject(data);
      } catch (err) {
        setError('Failed to load project details. Please try again later.');
        console.error('Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="container mx-auto px-4 py-16">
        <p className="text-red-500 text-center">{error || 'Project not found'}</p>
        <div className="mt-6 text-center">
          <Button asChild variant="outline">
            <Link to="/projects">Back to Projects</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Back button */}
      <div className="mb-8">
        <Button asChild variant="ghost" className="flex items-center gap-2">
          <Link to="/projects">
            <ChevronLeft className="h-5 w-5" /> Back to Projects
          </Link>
        </Button>
      </div>

      {/* Project header with centered description */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{project.name}</h1>
        
        {/* Description in aspect ratio container */}
        <div className="rounded-lg border-2 border-gray-300 bg-gray-50 mb-8 overflow-hidden">
          <AspectRatio ratio={4/1} className="bg-gray-50">
            <div className="flex items-center justify-center p-6 h-full">
              <p className="text-gray-700">{project.description}</p>
            </div>
          </AspectRatio>
        </div>
      </div>

      {/* Project images carousel */}
      {project.images && project.images.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Project Images</h2>
          <div className="mx-auto max-w-5xl px-12">
            <Carousel opts={{ loop: true }}>
              <CarouselContent>
                {project.images.map((image) => (
                  <CarouselItem key={image.id}>
                    <div className="relative overflow-hidden rounded-lg border p-1 h-[400px]">
                      <img
                        src={image.path}
                        alt={`${project.name} - Image ${image.id}`}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      )}

      {/* Project PDFs cerousel */}
      {project.pdfs && project.pdfs.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Documentation</h2>
          <div className="mx-auto max-w-5xl px-12">
            <Carousel opts={{ loop: true }}>
              <CarouselContent>
                {project.pdfs.map((pdf) => (
                  <CarouselItem key={pdf.id}>
                    <div className="relative overflow-hidden rounded-lg border p-4">
                      <div className="flex flex-col items-center h-[300px] justify-center">
                        <FileText className="h-24 w-24 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-center mb-2">{pdf.name}</h3>
                        <Button asChild>
                          <a 
                            href={pdf.path} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            View PDF
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
}

export default Project;
