import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projectsApi, categoryApi, imageApi, pdfApi } from '../services/api';
import { Button } from '../components/ui/button';
import { AspectRatio } from '../components/ui/aspect-ratio';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from '../components/ui/carousel';
import { ChevronLeft, FileText, LogOut, Plus, Edit2, Trash2 } from 'lucide-react';
import EditButton from '../components/admin/EditButton';
import AddButton from '../components/admin/AddButton';
import EditProjectDialog from '../components/admin/EditProjectDialog';
import EditImageDialog from '../components/admin/EditImageDialog';
import EditPdfDialog from '../components/admin/EditPdfDialog';
import { useAdmin } from '../contexts/AdminContext';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../components/ui/hover-card';

function Project() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin, logout } = useAdmin();
  
  const [project, setProject] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Admin dialog states
  const [editProjectOpen, setEditProjectOpen] = useState(false);
  const [editImageOpen, setEditImageOpen] = useState(false);
  const [editPdfOpen, setEditPdfOpen] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [editingPdf, setEditingPdf] = useState(null);
  const [isNewImage, setIsNewImage] = useState(false);
  const [isNewPdf, setIsNewPdf] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectData, categoriesData] = await Promise.all([
          projectsApi.getById(parseInt(id)),
          categoryApi.getAll()
        ]);
        setProject(projectData);
        setCategories(categoriesData || []);
      } catch (err) {
        setError('Nie udało się załadować szczegółów projektu. Spróbuj ponownie później.');
        console.error('Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  // Admin handlers
  const handleProjectSave = (savedProject) => {
    setProject(savedProject);
  };

  const handleProjectDelete = () => {
    // Navigate back to projects page after deletion from dialog
    navigate('/projects');
  };

  // Helper function to get category data by category ID
  const getCategoryById = (categoryId) => {
    return categories.find(category => category.categoryId === categoryId);
  };

  // Image handlers
  const handleImageSave = (savedImage) => {
    setProject(prev => {
      const updatedImages = isNewImage 
        ? [...(prev.images || []), savedImage]
        : (prev.images || []).map(img => img.id === savedImage.id ? savedImage : img);
      
      return { ...prev, images: updatedImages };
    });
  };

  const handleImageDelete = (deletedId) => {
    setProject(prev => ({
      ...prev,
      images: (prev.images || []).filter(img => img.id !== deletedId)
    }));
  };

  const openEditImage = (image = null) => {
    setEditingImage(image);
    setIsNewImage(!image);
    setEditImageOpen(true);
  };

  // PDF handlers
  const handlePdfSave = (savedPdf) => {
    setProject(prev => {
      const updatedPdfs = isNewPdf 
        ? [...(prev.pdfs || []), savedPdf]
        : (prev.pdfs || []).map(pdf => pdf.id === savedPdf.id ? savedPdf : pdf);
      
      return { ...prev, pdfs: updatedPdfs };
    });
  };

  const handlePdfDelete = (deletedId) => {
    setProject(prev => ({
      ...prev,
      pdfs: (prev.pdfs || []).filter(pdf => pdf.id !== deletedId)
    }));
  };

  const openEditPdf = (pdf = null) => {
    setEditingPdf(pdf);
    setIsNewPdf(!pdf);
    setEditPdfOpen(true);
  };

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
        <p className="text-red-500 text-center">{error || 'Projekt nie został znaleziony'}</p>
        <div className="mt-6 text-center">
          <Button asChild variant="outline">
            <Link to="/projects">Powrót do projektów</Link>
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
            <ChevronLeft className="h-5 w-5" /> Powrót do projektów
          </Link>
        </Button>
      </div>

      {/* Project header with centered description */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        {isAdmin && (
          <div className="flex items-center justify-center gap-2 mb-6">
            <EditButton 
              onClick={() => setEditProjectOpen(true)}
              size="sm"
            />
            <Button 
              variant="outline" 
              onClick={logout}
              className="flex items-center gap-2 text-red-600 border-red-300 hover:bg-red-50"
              size="sm"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Wyloguj się</span>
            </Button>
          </div>
        )}
        <h1 className="text-4xl font-bold mb-6">{project.name}</h1>
        
        {/* Category with Hover Card */}
        {(() => {
          const projectCategory = getCategoryById(project.categoryId);
          return projectCategory && (
            <div className="mb-6 flex justify-center">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-base font-medium bg-blue-100 text-blue-800 cursor-help hover:bg-blue-200 transition-colors">
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
          );
        })()}
        
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
      <div className="mb-16">
        <div className="flex justify-center items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold">Zdjęcia projektu</h2>
          {isAdmin && (
            <AddButton onClick={() => openEditImage()} size="sm">
              Dodaj zdjęcie
            </AddButton>
          )}
        </div>
        
        {project.images && project.images.length > 0 ? (
          <div className="mx-auto max-w-5xl px-12">
            <Carousel opts={{ loop: true }}>
              <CarouselContent>
                {project.images.map((image) => (
                  <CarouselItem key={image.id}>
                    <div className="relative overflow-hidden rounded-lg border p-1 h-[400px]">
                      {isAdmin && (
                        <div className="absolute top-3 right-3 z-10 flex gap-2">
                          <Button 
                            size="icon" 
                            variant="secondary"
                            onClick={() => openEditImage(image)}
                            className="h-8 w-8 bg-white/80 hover:bg-white"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      <img
                        src={image.path}
                        alt={`${project.name} - Image ${image.id}`}
                        className="h-full w-full object-contain"
                      />
                      {image.isMain && (
                        <div className="absolute bottom-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                          Główne zdjęcie
                        </div>
                      )}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            <p>Nie dodano jeszcze żadnych zdjęć</p>
            {isAdmin && (
              <Button onClick={() => openEditImage()} className="mt-4">
                Dodaj pierwsze zdjęcie
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Project PDFs carousel */}
      <div className="mb-16">
        <div className="flex justify-center items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold">Dokumentacja</h2>
          {isAdmin && (
            <AddButton onClick={() => openEditPdf()} size="sm">
              Dodaj PDF
            </AddButton>
          )}
        </div>
        
        {project.pdfs && project.pdfs.length > 0 ? (
          <div className="mx-auto max-w-5xl px-12">
            <Carousel opts={{ loop: true }}>
              <CarouselContent>
                {project.pdfs.map((pdf) => (
                  <CarouselItem key={pdf.id}>
                    <div className="relative overflow-hidden rounded-lg border p-4">
                      {isAdmin && (
                        <div className="absolute top-3 right-3 z-10 flex gap-2">
                          <Button 
                            size="icon" 
                            variant="secondary"
                            onClick={() => openEditPdf(pdf)}
                            className="h-8 w-8 bg-white/80 hover:bg-white"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      <div className="flex flex-col items-center h-[300px] justify-center">
                        <FileText className="h-24 w-24 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-center mb-2">{pdf.name}</h3>
                        <Button asChild>
                          <a 
                            href={pdf.path} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            Zobacz PDF
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
        ) : (
          <div className="text-center text-gray-500 py-8">
            <p>Nie dodano jeszcze żadnych plików PDF</p>
            {isAdmin && (
              <Button onClick={() => openEditPdf()} className="mt-4">
                Dodaj pierwszy PDF
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Admin Dialogs */}
      <EditProjectDialog
        open={editProjectOpen}
        onOpenChange={setEditProjectOpen}
        data={project}
        isNew={false}
        onSave={handleProjectSave}
        onDelete={handleProjectDelete}
      />
      
      <EditImageDialog
        open={editImageOpen}
        onOpenChange={setEditImageOpen}
        data={editingImage}
        projectId={project?.id}
        isNew={isNewImage}
        onSave={handleImageSave}
        onDelete={handleImageDelete}
      />
      
      <EditPdfDialog
        open={editPdfOpen}
        onOpenChange={setEditPdfOpen}
        data={editingPdf}
        projectId={project?.id}
        isNew={isNewPdf}
        onSave={handlePdfSave}
        onDelete={handlePdfDelete}
      />
    </div>
  );
}

export default Project;
