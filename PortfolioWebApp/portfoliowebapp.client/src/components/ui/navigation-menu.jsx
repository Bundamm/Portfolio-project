import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDownIcon, Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

function NavigationMenu({
  className,
  children,
  viewport = true,
  isFixed = false,
  ...props
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        "group/navigation-menu relative flex flex-1 w-fit",
        isFixed && "fixed left-1/2 top-0 z-50 mt-7 -translate-x-1/2 w-11/12 max-w-7xl", 
        "rounded-full bg-background/20 px-4 py-3 shadow-md backdrop-blur-lg",
        className
      )}
      {...props}>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center justify-between w-full">
          {/* Left side - Logo area */}
          <div className="w-1/4 flex justify-start">
            <Link to="/" className="flex items-center">
              {/* You can add your logo here */}
              <span className="font-bold text-lg">Portfolio</span>
            </Link>
          </div>
          
          {/* Center - Navigation items */}
          <div className="flex-1 flex justify-center">
            {children}
          </div>
          
          {/* Right side - Empty or additional controls */}
          <div className="w-1/4 flex justify-end">
            {/* Mobile menu button */}
            <div className="block md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md hover:bg-accent/50"
              >
                <Menu className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full mt-2 p-3 bg-background/80 backdrop-blur-lg rounded-lg shadow-lg md:hidden">
          {/* Mobile menu content is passed via context to avoid prop drilling */}
          <NavigationMobilePrimitive.Slot />
        </div>
      )}
      
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  );
}

// Context to manage mobile menu items
const NavigationMobileContext = React.createContext({
  registerMobileItem: () => {},
  mobileItems: []
});

const NavigationMobilePrimitive = {
  Slot: () => {
    const { mobileItems } = React.useContext(NavigationMobileContext);
    
    return (
      <div className="flex flex-col space-y-2">
        {mobileItems.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    );
  }
};

function NavigationMenuList({
  className,
  ...props
}) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn("group flex justify-center list-none items-center gap-1", className)}
      {...props} />
  );
}

function NavigationMenuItem({
  className,
  children,
  mobileVisible = true,
  ...props
}) {
  const { registerMobileItem } = React.useContext(NavigationMobileContext);
  
  // Register this item for mobile menu if needed
  React.useEffect(() => {
    if (mobileVisible) {
      registerMobileItem(children);
    }
  }, [mobileVisible, children, registerMobileItem]);
  
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}>
      {children}
    </NavigationMenuPrimitive.Item>
  );
}

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1"
)

function NavigationMenuTrigger({
  className,
  children,
  ...props
}) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}>
      {children}{" "}
      <ChevronDownIcon
        className="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
        aria-hidden="true" />
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuContent({
  className,
  ...props
}) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto",
        "group-data-[viewport=false]/navigation-menu:bg-background/80 group-data-[viewport=false]/navigation-menu:backdrop-blur-lg group-data-[viewport=false]/navigation-menu:text-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-lg group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow-lg group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",
        "z-50", // Ensure dropdown appears above other elements
        className
      )}
      {...props} />
  );
}

function NavigationMenuViewport({
  className,
  ...props
}) {
  return (
    <div
      className={cn("absolute top-full left-0 isolate z-50 flex justify-center")}>
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "origin-top-center bg-background/80 backdrop-blur-lg text-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-lg border shadow-lg md:w-[var(--radix-navigation-menu-viewport-width)]",
          className
        )}
        {...props} />
    </div>
  );
}

function NavigationMenuLink({
  className,
  ...props
}) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent/50 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-md p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props} />
  );
}

function NavigationMenuIndicator({
  className,
  ...props
}) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        "data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
        className
      )}
      {...props}>
      <div
        className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  );
}

// Provider component to handle mobile menu items
function NavigationMenuProvider({ children }) {
  const [mobileItems, setMobileItems] = React.useState([]);
  
  const registerMobileItem = React.useCallback((item) => {
    setMobileItems(prev => [...prev, item]);
    return () => setMobileItems(prev => prev.filter(i => i !== item));
  }, []);
  
  return (
    <NavigationMobileContext.Provider value={{ mobileItems, registerMobileItem }}>
      {children}
    </NavigationMobileContext.Provider>
  );
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  NavigationMenuProvider,
  navigationMenuTriggerStyle,
}
