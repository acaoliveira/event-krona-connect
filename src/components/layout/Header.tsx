
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, User, LogIn } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-kpmg-blue">KPMG</span>
            <span className="ml-2 text-xl text-kpmg-green">EventConnect</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/events" className="text-gray-700 hover:text-kpmg-blue flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            <span>Eventos</span>
          </Link>
          <Link to="/login" className="text-gray-700 hover:text-kpmg-blue flex items-center">
            <LogIn className="mr-1 h-4 w-4" />
            <span>Login</span>
          </Link>
          <Link to="/register">
            <Button className="bg-kpmg-blue hover:bg-kpmg-lightblue text-white flex items-center">
              <User className="mr-1 h-4 w-4" />
              <span>Cadastre-se</span>
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 hover:text-kpmg-blue focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white px-4 py-4 animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/events" 
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Calendar className="mr-2 h-4 w-4" />
              <span>Eventos</span>
            </Link>
            <Link 
              to="/login" 
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <LogIn className="mr-2 h-4 w-4" />
              <span>Login</span>
            </Link>
            <Link 
              to="/register" 
              className="flex items-center px-4 py-2 bg-kpmg-blue text-white hover:bg-kpmg-lightblue rounded"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User className="mr-2 h-4 w-4" />
              <span>Cadastre-se</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
