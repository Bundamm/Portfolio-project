import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/navbar';
import NavbarMobile from '@/components/navbar-mobile';
import AboutMe from '@/pages/AboutMe';
import Projects from '@/pages/Projects';
import Project from '@/pages/Project';
import Contact from '@/pages/Contact';
import AdminLogin from '@/pages/AdminLogin';
import { AdminProvider } from '@/contexts/AdminContext';
import './App.css';

function App() {
    return (
        <AdminProvider>
            <BrowserRouter>
                <div className="min-h-svh flex flex-col">
                    <header>
                        {/* Desktop Navbar - hidden on mobile */}
                        <div className="hidden md:block">
                            <Navbar />
                        </div>
                        
                        {/* Mobile Navbar - only visible on small screens */}
                        <div className="md:hidden">
                            <NavbarMobile />
                            {/* Spacer to prevent content from being hidden under fixed header */}
                            <div className="h-16"></div>
                        </div>
                    </header>
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<AboutMe />} />
                            <Route path="/about" element={<AboutMe />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/project/:id" element={<Project />} />
                            <Route path="/contact" element={<Contact />} />
                            {/* Hidden admin route */}
                            <Route path="/secret-admin-portal" element={<AdminLogin />} />
                        </Routes>
                    </main>
                    <footer className="p-4 border-t text-center text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} Portfolio
                    </footer>
                </div>
            </BrowserRouter>
        </AdminProvider>
    )
}

export default App;