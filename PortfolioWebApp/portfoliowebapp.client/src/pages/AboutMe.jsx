import React, { useState, useEffect } from 'react';
import { aboutMeApi, skillsApi, experienceApi } from '../services/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, BriefcaseIcon } from "lucide-react";

function AboutMe() {
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

  // Check if all essential data is loading
  const isLoading = loadingStates.aboutMe;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-6">O mnie</h1>
        <div className="flex items-center space-x-4">
          <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p>Ładowanie danych...</p>
        </div>
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
      <h1 className="text-3xl font-bold mb-6">{aboutMeData.title || 'O mnie'}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content - about me description */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>O mnie</CardTitle>
            </CardHeader>
            <CardContent>
              {aboutMeData.description ? (
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: aboutMeData.description }} />
              ) : (
                <>
                  <p className="mb-4">
                    Witaj na mojej stronie portfolio! Jestem profesjonalnym programistą z pasją do
                    tworzenia nowoczesnych i wydajnych aplikacji webowych.
                  </p>
                  <p className="mb-4">
                    Specjalizuję się w technologiach takich jak React, .NET, i tworzeniu
                    aplikacji full-stack.
                  </p>
                  <p>
                    Zawsze dążę do pisania czystego, utrzymywalnego kodu i tworzenia
                    aplikacji, które są nie tylko funkcjonalne, ale również przyjazne dla użytkownika.
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          {/* Experience section */}
          <h2 className="text-2xl font-bold mt-10 mb-6 flex items-center">
            <BriefcaseIcon className="mr-2" size={24} />
            Doświadczenie
          </h2>
          
          {loadingStates.experiences ? (
            <div className="flex items-center space-x-4">
              <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p>Ładowanie doświadczenia...</p>
            </div>
          ) : errors.experiences ? (
            <p className="text-red-600">{errors.experiences}</p>
          ) : sortedExperiences.length === 0 ? (
            <p className="text-muted-foreground">Brak informacji o doświadczeniu zawodowym.</p>
          ) : (
            <div className="space-y-6">
              {sortedExperiences.map((exp, index) => (
                <Card key={`${exp.workplace}-${exp.startDate}-${index}`}>
                  <CardHeader className="text-center">
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
                <div className="flex items-center space-x-4">
                  <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <p>Ładowanie umiejętności...</p>
                </div>
              ) : errors.skills ? (
                <p className="text-red-600">{errors.skills}</p>
              ) : skills.length === 0 ? (
                <div className="space-y-2">
                  <Badge className="mr-2">React</Badge>
                  <Badge className="mr-2">ASP.NET Core</Badge>
                  <Badge className="mr-2">JavaScript</Badge>
                  <Badge className="mr-2">TypeScript</Badge>
                  <Badge className="mr-2">Tailwind CSS</Badge>
                  <Badge className="mr-2">SQL Server</Badge>
                </div>
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
    </div>
  );
}

export default AboutMe;
