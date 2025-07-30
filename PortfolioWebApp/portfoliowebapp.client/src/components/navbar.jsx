import { Link, NavLink } from "react-router-dom";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

function Navbar() {
    return (
        <NavigationMenu viewport={false} className="max-w-screen-xl mx-auto">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <NavLink 
                            to="/about" 
                            className={({ isActive }) => isActive ? "font-bold" : ""}
                        >
                            O mnie
                        </NavLink>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Moje projekty</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="flex flex-col gap-2 p-4 w-[200px]">
                            <NavigationMenuLink asChild>
                                <NavLink 
                                    to="/projects" 
                                    className={({ isActive }) => isActive ? "font-bold" : ""}
                                >
                                    Wszystkie projekty
                                </NavLink>
                            </NavigationMenuLink>
                            {/* You can add specific project links here later */}
                        </div>
                    </NavigationMenuContent>                    
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <NavLink 
                            to="/contact" 
                            className={({ isActive }) => isActive ? "font-bold" : ""}
                        >
                            Kontakt
                        </NavLink>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default Navbar;