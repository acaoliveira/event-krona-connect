
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import MainLayout from '@/components/layout/MainLayout';
import { Calendar, User, LogIn } from 'lucide-react';

const Index = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-100 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h1 className="text-4xl md:text-5xl font-bold text-kpmg-blue mb-6 leading-tight">
                Gestão de eventos <span className="text-kpmg-green">simplificada</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Plataforma completa para solicitação, gerenciamento e participação em eventos da KPMG.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                  <Button className="bg-kpmg-blue hover:bg-kpmg-lightblue text-white px-6 py-2 rounded-lg flex items-center">
                    <LogIn className="mr-2 h-5 w-5" />
                    Entrar
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" className="border-kpmg-blue text-kpmg-blue hover:bg-kpmg-blue hover:text-white px-6 py-2 rounded-lg flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Cadastrar-se
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt="Eventos KPMG"
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-kpmg-blue mb-12">Como funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-kpmg-blue p-3 rounded-full text-white mr-4">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Solicitação de Espaços</h3>
                </div>
                <p className="text-gray-600">
                  Solicite espaços para eventos internos e externos, com agendamento e fluxo de aprovação integrado.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-kpmg-lightblue p-3 rounded-full text-white mr-4">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Gestão de Eventos</h3>
                </div>
                <p className="text-gray-600">
                  Gerencie participantes, orçamentos e configurações do evento em um único lugar.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-kpmg-green p-3 rounded-full text-white mr-4">
                    <User className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Participação</h3>
                </div>
                <p className="text-gray-600">
                  Inscreva-se em eventos, receba confirmações e certificados de participação.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-kpmg-blue mb-6">Pronto para começar?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Acesse agora mesmo a plataforma e aproveite todos os recursos disponíveis para gerenciar seus eventos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button className="bg-kpmg-blue hover:bg-kpmg-lightblue text-white px-8 py-3 rounded-lg">
                Acessar a plataforma
              </Button>
            </Link>
            <Link to="/events">
              <Button variant="outline" className="border-kpmg-blue text-kpmg-blue hover:bg-kpmg-blue hover:text-white px-8 py-3 rounded-lg">
                Ver eventos
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
