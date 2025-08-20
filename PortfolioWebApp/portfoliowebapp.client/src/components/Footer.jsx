import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';

function Footer() {
  // GitHub profiles data - you can customize these
  const githubProfiles = [
    {
      id: 1,
      name: "Tomasz Szewa",
      username: "Bundamm",
      bio: "Created backend",
      profileUrl: "https://github.com/Bundamm",
      avatar: "https://github.com/Bundamm.png"
    },
    {
      id: 2,
      name: "Maciej Świder", 
      username: "MacSwider",
      bio: "Created backend",
      profileUrl: "https://github.com/MacSwider",
      avatar: "https://github.com/MacSwider.png"
    },
    {
      id: 3,
      name: "Konrad Zieliński",
      username: "konradziel", 
      bio: "Created frontend",
      profileUrl: "https://github.com/konradziel",
      avatar: "https://github.com/konradziel.png"
    }
  ];

  return (
    <footer className="border-t bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Main footer content */}
        <div className="flex flex-col items-center space-y-6">
          {/* Created by section */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Created by
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
              {githubProfiles.map((profile) => (
                <HoverCard key={profile.id}>
                  <HoverCardTrigger asChild>
                    <a
                      href={profile.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center space-x-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md transition-all duration-200"
                    >
                      <Github className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                        @{profile.username}
                      </span>
                      <ExternalLink className="h-3 w-3 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                    </a>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex space-x-4">
                      <img
                        className="h-12 w-12 rounded-full"
                        src={profile.avatar}
                        alt={`${profile.name} avatar`}
                        onError={(e) => {
                          // Fallback to a default avatar if GitHub avatar fails to load
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=6366f1&color=fff`;
                        }}
                      />
                      <div className="space-y-1 flex-1">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          {profile.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {profile.bio}
                        </p>
                        <div className="flex items-center pt-2">
                          <Github className="h-4 w-4 mr-1 text-gray-500" />
                          <span className="text-xs text-gray-500">
                            github.com/{profile.username}
                          </span>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="w-full max-w-md h-px bg-gray-200 dark:bg-gray-700"></div>

          {/* Copyright section */}
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
            <p className="mt-1">Built with React & .NET</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
