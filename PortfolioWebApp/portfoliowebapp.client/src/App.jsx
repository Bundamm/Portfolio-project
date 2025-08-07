import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/navbar';
import AboutMe from '@/pages/AboutMe';
import Projects from '@/pages/Projects';
import Project from '@/pages/Project';
import Contact from '@/pages/Contact';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-svh flex flex-col">
                <header>
                    <Navbar />
                </header>
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<AboutMe />} />
                        <Route path="/about" element={<AboutMe />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/project/:id" element={<Project />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </main>
                <footer className="p-4 border-t text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Your Portfolio
                </footer>
            </div>
        </BrowserRouter>
    )
}

export default App;