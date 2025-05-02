
import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  ListFilter,
  BarChart3,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Bell
} from 'lucide-react';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    {
      name: 'Calendário de Eventos',
      path: '/dashboard',
      icon: <Calendar className="h-5 w-5" />
    },
    {
      name: 'Solicitações',
      path: '/dashboard/solicitacoes',
      icon: <ListFilter className="h-5 w-5" />
    },
    {
      name: 'Indicadores',
      path: '/dashboard/indicadores',
      icon: <BarChart3 className="h-5 w-5" />
    },
    {
      name: 'Configurações',
      path: '/dashboard/configuracoes',
      icon: <Settings className="h-5 w-5" />
    }
  ];

  const isActive = (path: string) => {
    // Special case for dashboard home
    if (path === '/dashboard' && location.pathname === '/dashboard') {
      return true;
    }
    // For other paths, check if current path starts with the nav item path
    return location.pathname.startsWith(path) && path !== '/dashboard';
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm z-30">
        <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="mr-2 h-10 w-10 p-0 lg:hidden"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Link to="/dashboard" className="flex items-center gap-3">
              <span className="font-bold text-xl text-kpmg-blue hidden md:block">KPMG Events</span>
              <span className="font-bold text-xl text-kpmg-blue md:hidden">KEvents</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" className="relative" size="icon">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-gray-100 px-1 gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-kpmg-blue text-white">KP</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium hidden sm:block">Usuário KPMG</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-64 p-2">
                      <div className="flex items-center gap-3 p-2">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-kpmg-blue text-white">KP</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">Usuário KPMG</p>
                          <p className="text-xs text-gray-500">usuario@kpmg.com</p>
                        </div>
                      </div>
                      <Separator className="my-2" />
                      <Link to="/dashboard/perfil" className="flex items-center gap-2 p-2 text-sm rounded-md hover:bg-gray-100 transition-colors">
                        <User className="h-4 w-4" />
                        Meu Perfil
                      </Link>
                      <Link to="/dashboard/configuracoes" className="flex items-center gap-2 p-2 text-sm rounded-md hover:bg-gray-100 transition-colors">
                        <Settings className="h-4 w-4" />
                        Configurações
                      </Link>
                      <Separator className="my-2" />
                      <Link to="/login" className="flex items-center gap-2 p-2 text-sm rounded-md hover:bg-gray-100 text-red-600 transition-colors">
                        <LogOut className="h-4 w-4" />
                        Sair
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for desktop */}
        <aside className={`hidden lg:block transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-20'} border-r bg-white`}>
          <div className="flex flex-col h-full">
            <div className="p-4 flex justify-end">
              <Button variant="ghost" size="sm" onClick={toggleSidebar} className="h-8 w-8 p-0">
                <ChevronDown 
                  className={`h-5 w-5 transition-transform ${isSidebarOpen ? 'rotate-0' : 'rotate-180'}`} 
                />
              </Button>
            </div>
            <nav className="flex-1 overflow-y-auto p-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 mb-1 rounded-md transition-colors",
                    isActive(item.path)
                      ? "bg-kpmg-blue text-white"
                      : "hover:bg-gray-100"
                  )}
                >
                  {item.icon}
                  {isSidebarOpen && <span>{item.name}</span>}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50">
            <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
              <div className="p-4 flex justify-between items-center border-b">
                <h2 className="font-bold text-lg">Menu</h2>
                <Button variant="ghost" size="sm" onClick={toggleMobileMenu} className="h-8 w-8 p-0">
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="p-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={toggleMobileMenu}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 mb-1 rounded-md transition-colors",
                      isActive(item.path)
                        ? "bg-kpmg-blue text-white"
                        : "hover:bg-gray-100"
                    )}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
