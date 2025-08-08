import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { projectsApi } from "../services/api";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Mobile navbar component with a hamburger menu that opens a drawer
 */
function NavbarMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedProjects, setExpandedProjects] = useState(false);
  const location = useLocation();

  // Close the menu when navigating to a new page
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Fetch projects for the dropdown
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectsApi.getAll();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects for navbar:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Handle body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      {/* Fixed Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/20 backdrop-blur-lg shadow-sm">
        <div className="flex items-center justify-between p-4">
          {/* Logo */}
          <Link to="/" className="font-bold text-lg text-foreground">
            Portfolio
          </Link>
          
          {/* Hamburger button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-2 rounded-md hover:bg-accent/50 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      {/* Overlay and drawer with animations */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            
            {/* Sliding drawer */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed right-0 top-0 h-full w-[80%] max-w-[320px] bg-background shadow-xl p-5 z-[10000] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with close button */}
              <div className="flex items-center justify-between mb-8">
                <p className="text-lg font-medium text-foreground">Menu</p>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-accent/50 transition-colors duration-200"
                  aria-label="Close menu"
                >
                  <X className="size-5" />
                </motion.button>
              </div>

              {/* Navigation links with animations */}
              <nav className="flex flex-col space-y-2.5">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <NavLink 
                    to="/about" 
                    className={({ isActive }) => 
                      cn("px-4 py-3 rounded-md flex items-center text-base font-medium transition-all duration-200", 
                         isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent/50 text-foreground")
                    }
                  >
                    O mnie
                  </NavLink>
                </motion.div>

                {/* Projects dropdown */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <button 
                    onClick={() => setExpandedProjects(!expandedProjects)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-md hover:bg-accent/50 transition-all duration-200 text-base font-medium text-foreground"
                  >
                    <span>Moje projekty</span>
                    <ChevronDown 
                      className={cn(
                        "size-4.5 transition-transform duration-200",
                        expandedProjects ? "rotate-180" : ""
                      )}
                    />
                  </button>

                  {/* Projects dropdown content with animation */}
                  <AnimatePresence>
                    {expandedProjects && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 py-1.5 space-y-1">
                          <NavLink 
                            to="/projects" 
                            className={({ isActive }) => 
                              cn("block px-4 py-2.5 rounded-md transition-colors duration-200", 
                                 isActive ? "bg-accent/80 text-accent-foreground" : "hover:bg-accent/30 text-foreground")
                            }
                          >
                            Wszystkie projekty
                          </NavLink>

                          {loading ? (
                            <div className="px-4 py-2.5 text-sm text-muted-foreground flex items-center space-x-2">
                              <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                              <span>Ładowanie projektów...</span>
                            </div>
                          ) : projects.length > 0 ? (
                            projects.map((project, index) => (
                              <motion.div
                                key={project.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + index * 0.05 }}
                              >
                                <NavLink 
                                  to={`/project/${project.id}`}
                                  className={({ isActive }) => 
                                    cn("block px-4 py-2.5 rounded-md transition-colors duration-200", 
                                       isActive ? "bg-accent/80 text-accent-foreground" : "hover:bg-accent/30 text-foreground")
                                  }
                                >
                                  {project.name}
                                </NavLink>
                              </motion.div>
                            ))
                          ) : (
                            <div className="px-4 py-2.5 text-sm text-muted-foreground">
                              Brak dostępnych projektów
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <NavLink 
                    to="/contact" 
                    className={({ isActive }) => 
                      cn("px-4 py-3 rounded-md flex items-center text-base font-medium transition-all duration-200", 
                         isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent/50 text-foreground")
                    }
                  >
                    Kontakt
                  </NavLink>
                </motion.div>
              </nav>

              {/* Footer space */}
              <div className="mt-auto pt-6 border-t border-border/40 mt-8">
                <Link to="/" className="flex items-center px-4 py-3 text-foreground">
                  <span className="font-semibold">Portfolio</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default NavbarMobile;
