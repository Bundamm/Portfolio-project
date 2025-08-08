import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { projectsApi } from "../services/api";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"


function Navbar() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
            <NavigationMenu 
                viewport={false} 
                isFixed={true} 
                className="z-50"
            >
                {/* Centered Navigation */}
                <NavigationMenuList className="hidden md:flex justify-center flex-1">
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <NavLink to="/about">
                                O mnie
                            </NavLink>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavLink to="/projects">
                            <NavigationMenuTrigger>Moje projekty</NavigationMenuTrigger>
                        </NavLink>
                        <NavigationMenuContent>
                            <ul className="grid w-[450px] grid-cols-2 gap-3 p-4">
                                {loading ? (
                                    <li className="text-sm text-gray-500 py-2 col-span-2">Ładowanie projektów...</li>
                                ) : projects.length > 0 ? (
                                    projects.map(project => (
                                        <li key={project.id}>
                                            <NavigationMenuLink asChild>
                                                <NavLink 
                                                    to={`/project/${project.id}`}
                                                    className="block py-2 px-3 rounded-md hover:bg-gray-100"
                                                >
                                                    {project.name}
                                                </NavLink>
                                            </NavigationMenuLink>
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-sm text-gray-500 py-2 col-span-2">Brak dostępnych projektów</li>
                                )}
                            </ul>
                        </NavigationMenuContent>                    
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <NavLink to="/contact">
                                Kontakt
                            </NavLink>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
    )
}

export default Navbar;