import React from 'react';

function AboutMe() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">O mnie</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
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
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
