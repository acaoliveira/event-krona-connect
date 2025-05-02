
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-kpmg-blue">KPMG</span>
              <span className="ml-1 text-lg text-kpmg-green">EventConnect</span>
            </Link>
            <p className="mt-2 text-sm text-gray-600">
              Plataforma de gerenciamento de eventos
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center space-x-6">
            <Link to="/terms" className="text-sm text-gray-600 hover:text-kpmg-blue my-1">
              Termos de Uso
            </Link>
            <Link to="/privacy" className="text-sm text-gray-600 hover:text-kpmg-blue my-1">
              Política de Privacidade
            </Link>
            <Link to="/help" className="text-sm text-gray-600 hover:text-kpmg-blue my-1">
              Suporte
            </Link>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-4 text-center text-sm text-gray-600">
          © {currentYear} KPMG. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
