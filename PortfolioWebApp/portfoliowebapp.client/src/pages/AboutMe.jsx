import React, { useState, useEffect } from 'react';
import { aboutMeApi } from '../services/api/aboutMeApi';

function AboutMe() {
  const [aboutMeData, setAboutMeData] = useState({
    title: '',
    description: '',
    phone: null,
    email: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutMeData = async () => {
      try {
        setLoading(true);
        const data = await aboutMeApi.getById(1);
        setAboutMeData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching AboutMe data:", err);
        setError("Nie udało się pobrać danych.");
        setLoading(false);
      }
    };

    fetchAboutMeData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">O mnie</h1>
        <p>Ładowanie danych...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">O mnie</h1>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{aboutMeData.title || 'O mnie'}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {aboutMeData.description ? (
            <div dangerouslySetInnerHTML={{ __html: aboutMeData.description }} />
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
        </div>
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Umiejętności</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>React, Redux</li>
            <li>ASP.NET Core</li>
            <li>JavaScript/TypeScript</li>
            <li>Tailwind CSS</li>
            <li>SQL Server</li>
            <li>Azure/AWS</li>
          </ul>
          
          {(aboutMeData.email || aboutMeData.phone) && (
            <>
              <h2 className="text-xl font-semibold mt-6 mb-4">Kontakt</h2>
              <div className="space-y-1">
                {aboutMeData.email && (
                  <p>Email: <a href={`mailto:${aboutMeData.email}`} className="text-blue-600 hover:underline">{aboutMeData.email}</a></p>
                )}
                {aboutMeData.phone && (
                  <p>Telefon: <a href={`tel:${aboutMeData.phone}`} className="text-blue-600 hover:underline">{aboutMeData.phone}</a></p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
