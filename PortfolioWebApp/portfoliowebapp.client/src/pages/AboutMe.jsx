import React, { useState, useEffect } from 'react';
import { aboutMeApi, skillsApi, experienceApi } from '../services/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, BriefcaseIcon, LogOut } from "lucide-react";
import EditButton from '../components/admin/EditButton';
import AddButton from '../components/admin/AddButton';
import EditAboutMeDialog from '../components/admin/EditAboutMeDialog';
import EditExperienceDialog from '../components/admin/EditExperienceDialog';
import { useAdmin } from '../contexts/AdminContext';

function AboutMe() {
  const { isAdmin, logout } = useAdmin();
  
  // State for different data sources
  const [aboutMeData, setAboutMeData] = useState({
    title: '',
    description: '', // Using correct property name from AboutMeDto
    phone: null,
    email: null
  });
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  
  // Loading and error states
  const [loadingStates, setLoadingStates] = useState({
    aboutMe: true,
    skills: true,
    experiences: true
  });
  const [errors, setErrors] = useState({
    aboutMe: null,
    skills: null,
    experiences: null
  });

  // Admin dialog states
  const [editAboutMeOpen, setEditAboutMeOpen] = useState(false);
  const [editExperienceOpen, setEditExperienceOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [isNewExperience, setIsNewExperience] = useState(false);

  // Helper to update loading state for a specific data type
  const setLoading = (type, isLoading) => {
    setLoadingStates(prev => ({ ...prev, [type]: isLoading }));
  };

  // Helper to update error state for a specific data type
  const setError = (type, error) => {
    setErrors(prev => ({ ...prev, [type]: error }));
  };

  // Fetch AboutMe data
  useEffect(() => {
    const fetchAboutMeData = async () => {
      try {
        setLoading('aboutMe', true);
        const data = await aboutMeApi.getById(1);
        setAboutMeData(data);
        
        // Fetch all experiences (they will be displayed together)
        try {
          setLoading('experiences', true);
          const experienceData = await experienceApi.getAll();
          setExperiences(experienceData || []);
        } catch (err) {
          console.error("Error fetching experience data:", err);
          setError('experiences', "Nie udało się pobrać doświadczenia zawodowego.");
        } finally {
          setLoading('experiences', false);
        }
      } catch (err) {
        console.error("Error fetching AboutMe data:", err);
        setError('aboutMe', "Nie udało się pobrać danych profilu.");
      } finally {
        setLoading('aboutMe', false);
      }
    };

    fetchAboutMeData();
  }, []);

  // Fetch skills
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading('skills', true);
        const data = await skillsApi.getAll();
        setSkills(data || []);
      } catch (err) {
        console.error("Error fetching skills data:", err);
        setError('skills', "Nie udało się pobrać umiejętności.");
      } finally {
        setLoading('skills', false);
      }
    };

    fetchSkills();
  }, []);

  // Format date to a readable format
  const formatDate = (dateString) => {
    if (!dateString) return 'Obecnie';
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', { 
      year: 'numeric', 
      month: 'long'
    });
  };

  // Admin handlers
  const handleAboutMeSave = (updatedData) => {
    setAboutMeData(updatedData);
  };

  const handleExperienceSave = (savedExperience) => {
    if (isNewExperience) {
      setExperiences(prev => [...prev, savedExperience]);
    } else {
      setExperiences(prev => 
        prev.map(exp => 
          exp.id === savedExperience.id ? savedExperience : exp
        )
      );
    }
  };

  const handleExperienceDelete = (deletedId) => {
    setExperiences(prev => prev.filter(exp => exp.id !== deletedId));
  };

  const openEditExperience = (experience = null) => {
    setEditingExperience(experience);
    setIsNewExperience(!experience);
    setEditExperienceOpen(true);
  };

  // Check if all essential data is loading
  const isLoading = loadingStates.aboutMe;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const hasErrors = errors.aboutMe;
  
  if (hasErrors) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-6">O mnie</h1>
        <p className="text-red-600">{errors.aboutMe}</p>
      </div>
    );
  }

  // Sort experiences by startDate in descending order (newest first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return dateB - dateA;
  });

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{aboutMeData.title || 'O mnie'}</h1>
        {isAdmin && (
          <Button 
            variant="outline" 
            onClick={logout}
            className="flex items-center gap-2 text-red-600 border-red-300 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            Wyloguj się
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content - about me description */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>O mnie</CardTitle>
                <EditButton onClick={() => setEditAboutMeOpen(true)} size="sm" />
              </div>
            </CardHeader>
            <CardContent>
              {aboutMeData.description ? (
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: aboutMeData.description }} />
              ) : (
                <>
                  <p className="mb-4">
                    Niestety, nie udało się załadować informacji o mnie.
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          {/* Experience section */}
          <div className="flex justify-between items-center mt-10 mb-6">
            <h2 className="text-2xl font-bold flex items-center">
              <BriefcaseIcon className="mr-2" size={24} />
              Doświadczenie
            </h2>
            <AddButton
              onClick={() => openEditExperience()}
              size="sm"
            />
          </div>
          
          {loadingStates.experiences ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : errors.experiences ? (
            <p className="text-red-600">{errors.experiences}</p>
          ) : sortedExperiences.length === 0 ? (
            <p className="text-muted-foreground">Brak informacji o doświadczeniu zawodowym.</p>
          ) : (
            <div className="space-y-6">
              {sortedExperiences.map((exp, index) => (
                <Card key={`${exp.workplace}-${exp.startDate}-${index}`}>
                  <CardHeader className="text-center relative">
                    <EditButton 
                      onClick={() => openEditExperience(exp)}
                      className="absolute top-4 right-4"
                      size="icon"
                      showText={false}
                    />
                    <div className="flex flex-col items-center gap-2">
                      <CardTitle className="text-xl font-semibold">{exp.workplace}</CardTitle>
                      <div className="flex items-center gap-2">
                        <CalendarIcon size={14} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {exp.workDescription && (
                      <div className="prose prose-sm max-w-none text-muted-foreground" 
                           dangerouslySetInnerHTML={{ __html: exp.workDescription }} />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
        
        {/* Sidebar with skills and contact */}
        <div>
          {/* Skills section */}
          <Card>
            <CardHeader>
              <CardTitle>Umiejętności</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingStates.skills ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : errors.skills ? (
                <p className="text-red-600">{errors.skills}</p>
              ) : skills.length === 0 ? (
                <p className="text-red-600">Brak umiejętności</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge key={`${skill.name}-${index}`}>
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Contact section (if available) */}
          {(aboutMeData.email || aboutMeData.phone) && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Kontakt</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {aboutMeData.email && (
                  <div>
                    <strong>Email:</strong>{' '}
                    <a href={`mailto:${aboutMeData.email}`} className="text-primary hover:underline">
                      {aboutMeData.email}
                    </a>
                  </div>
                )}
                {aboutMeData.phone && (
                  <div>
                    <strong>Telefon:</strong>{' '}
                    <a href={`tel:${aboutMeData.phone}`} className="text-primary hover:underline">
                      {aboutMeData.phone}
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Admin Dialogs */}
      <EditAboutMeDialog
        open={editAboutMeOpen}
        onOpenChange={setEditAboutMeOpen}
        data={aboutMeData}
        onSave={handleAboutMeSave}
      />

      <EditExperienceDialog
        open={editExperienceOpen}
        onOpenChange={setEditExperienceOpen}
        data={editingExperience}
        isNew={isNewExperience}
        onSave={handleExperienceSave}
        onDelete={handleExperienceDelete}
      />
    </div>
  );
}

export default AboutMe;
