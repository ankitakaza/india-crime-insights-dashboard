
import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '../context/AuthContext';
import Footer from './Footer';
import { cn } from '@/lib/utils';

const Layout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header 
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          isScrolled 
            ? "bg-white shadow-md py-2" 
            : "bg-transparent py-4"
        )}
      >
        <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-crime-blue-800 text-white p-2 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17l6-6-6-6" />
              </svg>
            </div>
            <span className={cn(
              "font-poppins font-bold text-lg md:text-xl transition-colors",
              isScrolled ? "text-crime-blue-800" : "text-crime-blue-700"
            )}>
              India Crime Tracker
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink to="/" label="Home" current={location.pathname} />
            <NavLink to="/dashboard" label="Dashboard" current={location.pathname} />
            <NavLink to="/about" label="About" current={location.pathname} />
            {isAuthenticated ? (
              <Button 
                variant="outline" 
                className="text-crime-blue-600 border-crime-blue-600 hover:bg-crime-blue-50"
                onClick={logout}
              >
                Logout
              </Button>
            ) : (
              <Link to="/auth">
                <Button className="bg-crime-blue-600 hover:bg-crime-blue-700">
                  Login / Signup
                </Button>
              </Link>
            )}
          </nav>
          
          <div className="md:hidden">
            <MobileMenu isAuthenticated={isAuthenticated} logout={logout} pathname={location.pathname} />
          </div>
        </div>
      </header>

      <main className="flex-grow pt-16">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

const NavLink = ({ to, label, current }: { to: string; label: string; current: string }) => {
  const isActive = current === to || (current.startsWith(to) && to !== "/");
  
  return (
    <Link 
      to={to} 
      className={cn(
        "text-base font-medium transition-colors duration-200",
        isActive 
          ? "text-crime-blue-600 font-semibold" 
          : "text-gray-700 hover:text-crime-blue-600"
      )}
    >
      {label}
    </Link>
  );
};

const MobileMenu = ({ 
  isAuthenticated, 
  logout,
  pathname
}: { 
  isAuthenticated: boolean; 
  logout: () => void;
  pathname: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="sm" 
        className="p-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
          />
        </svg>
      </Button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1">
          <Link 
            to="/" 
            className={cn(
              "block px-4 py-2 text-sm",
              pathname === "/" ? "bg-gray-100 text-crime-blue-600" : "text-gray-700"
            )}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/dashboard" 
            className={cn(
              "block px-4 py-2 text-sm",
              pathname === "/dashboard" ? "bg-gray-100 text-crime-blue-600" : "text-gray-700"
            )}
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <Link 
            to="/about" 
            className={cn(
              "block px-4 py-2 text-sm",
              pathname === "/about" ? "bg-gray-100 text-crime-blue-600" : "text-gray-700"
            )}
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          {isAuthenticated ? (
            <button
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
            >
              Logout
            </button>
          ) : (
            <Link 
              to="/auth" 
              className="block px-4 py-2 text-sm text-crime-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Login / Signup
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Layout;
