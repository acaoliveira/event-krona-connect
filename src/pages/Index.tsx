
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MainLayout from '@/components/layout/MainLayout';
import { Calendar, MapPin, Search, User, Users, Clock, Award, Star, Filter, Grid, List } from 'lucide-react';

// Mock event data
const featuredEvents = [
  {
    id: '1',
    title: 'Workshop de Inovação Digital',
    date: '2025-05-15',
    time: '09:00 - 17:00',
    location: 'KPMG São Paulo',
    category: 'Workshop',
    featured: true,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    rating: 4.8,
    attendees: 120,
    availableSpots: 30,
  },
  {
    id: '2',
    title: 'Seminário Fiscal e Tributário',
    date: '2025-05-20',
    time: '14:00 - 18:00',
    location: 'KPMG Rio de Janeiro',
    category: 'Seminário',
    featured: true,
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    rating: 4.5,
    attendees: 80,
    availableSpots: 20,
  },
  {
    id: '3',
    title: 'Fórum ESG e Sustentabilidade',
    date: '2025-06-05',
    time: '10:00 - 16:00',
    location: 'KPMG Belo Horizonte',
    category: 'Fórum',
    featured: true,
    image: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    rating: 4.7,
    attendees: 150,
    availableSpots: 50,
  },
];

const upcomingEvents = [
  {
    id: '4',
    title: 'Conferência de Auditoria e Compliance',
    date: '2025-06-15',
    time: '09:00 - 18:00',
    location: 'KPMG São Paulo',
    category: 'Conferência',
    featured: false,
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    rating: 4.6,
    attendees: 200,
    availableSpots: 50,
  },
  {
    id: '5',
    title: 'Workshop de Design Thinking',
    date: '2025-06-22',
    time: '13:00 - 17:00',
    location: 'KPMG Brasília',
    category: 'Workshop',
    featured: false,
    image: 'https://images.unsplash.com/photo-1558403194-611308249627?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    rating: 4.9,
    attendees: 30,
    availableSpots: 10,
  },
  {
    id: '6',
    title: 'Painel sobre Transformação Digital',
    date: '2025-07-05',
    time: '10:00 - 12:00',
    location: 'KPMG São Paulo',
    category: 'Painel',
    featured: false,
    image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    rating: 4.4,
    attendees: 100,
    availableSpots: 40,
  },
  {
    id: '7',
    title: 'Meetup de Tecnologia e Inovação',
    date: '2025-07-12',
    time: '19:00 - 21:00',
    location: 'KPMG Rio de Janeiro',
    category: 'Meetup',
    featured: false,
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    rating: 4.3,
    attendees: 50,
    availableSpots: 20,
  },
  {
    id: '8',
    title: 'Webinar sobre Mercado Financeiro',
    date: '2025-07-20',
    time: '15:00 - 16:30',
    location: 'Online',
    category: 'Webinar',
    featured: false,
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    rating: 4.2,
    attendees: 300,
    availableSpots: 200,
  },
];

const categories = [
  { name: 'Workshop', icon: Users },
  { name: 'Seminário', icon: Award },
  { name: 'Conferência', icon: Award },
  { name: 'Meetup', icon: Users },
  { name: 'Webinar', icon: Calendar },
  { name: 'Painel', icon: Users },
  { name: 'Fórum', icon: Award },
];

const Index = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('featured');
  
  const allEvents = [...featuredEvents, ...upcomingEvents];
  
  const filteredEvents = allEvents.filter(event => {
    if (activeTab === 'featured' && !event.featured) return false;
    if (searchTerm === '') return true;
    return event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
           event.category.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  return (
    <MainLayout>
      {/* Hero Section with background image */}
      <section className="relative">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&q=80')",
            backgroundPosition: "center 30%"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-kpmg-blue/90 to-kpmg-lightblue/80"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
              Descubra Eventos Inspiradores
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Encontre e participe dos melhores eventos da KPMG
            </p>
            
            <div className="bg-white/20 backdrop-blur-md p-1 rounded-lg max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-100" />
                <Input
                  placeholder="Buscar eventos, locais ou categorias..."
                  className="pl-10 bg-white/10 border-0 placeholder:text-white/70 text-white focus:bg-white/20"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Categorias de Eventos</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Link to={`/events?category=${category.name}`} key={category.name}>
                <div className="bg-white rounded-xl shadow-md px-4 py-3 flex items-center gap-3 hover:bg-kpmg-blue/5 transition-colors cursor-pointer">
                  <category.icon className="h-5 w-5 text-kpmg-blue" />
                  <span className="font-medium">{category.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Events Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-kpmg-blue mb-2">Eventos</h2>
              <p className="text-gray-600">
                Encontre e participe dos melhores eventos
              </p>
            </div>
            
            <div className="mt-4 lg:mt-0 flex items-center gap-4">
              <Tabs 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList>
                  <TabsTrigger value="featured">Destaques</TabsTrigger>
                  <TabsTrigger value="all">Todos os Eventos</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-kpmg-blue' : ''}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-kpmg-blue' : ''}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            {filteredEvents.length > 0 ? (
              <div className={viewMode === 'grid' ? 
                'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' :
                'space-y-6'
              }>
                {viewMode === 'grid' ? (
                  // Grid View
                  filteredEvents.map(event => (
                    <Link to={`/events/${event.id}`} key={event.id}>
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                        <div className="relative h-48">
                          <img 
                            src={event.image} 
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                          {event.featured && (
                            <div className="absolute top-2 left-2 bg-kpmg-blue text-white text-xs font-bold px-2 py-1 rounded">
                              Destaque
                            </div>
                          )}
                          <div className="absolute bottom-2 right-2 bg-white/90 text-kpmg-blue text-xs font-bold px-2 py-1 rounded-full flex items-center">
                            <Star className="h-3 w-3 mr-1 fill-kpmg-blue text-kpmg-blue" />
                            {event.rating}
                          </div>
                        </div>
                        
                        <CardContent className="pt-4 flex-grow">
                          <div className="flex items-center text-xs text-gray-500 mb-2">
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{event.category}</span>
                          </div>
                          
                          <h3 className="font-bold text-lg mb-2 line-clamp-2">{event.title}</h3>
                          
                          <div className="space-y-2 mt-3">
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar className="h-4 w-4 mr-2 text-kpmg-blue" />
                              {new Date(event.date).toLocaleDateString('pt-BR')}
                            </div>
                            
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="h-4 w-4 mr-2 text-kpmg-blue" />
                              {event.time}
                            </div>
                            
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="h-4 w-4 mr-2 text-kpmg-blue" />
                              {event.location}
                            </div>
                          </div>
                        </CardContent>
                        
                        <CardFooter className="flex justify-between items-center border-t bg-gray-50 pt-3">
                          <div className="text-sm text-gray-600 flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {event.attendees} participantes
                          </div>
                          <div className="text-sm font-medium text-kpmg-blue">
                            {event.availableSpots} vagas
                          </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))
                ) : (
                  // List View
                  filteredEvents.map(event => (
                    <Card key={event.id} className="overflow-hidden border hover:shadow-lg transition-shadow">
                      <Link to={`/events/${event.id}`} className="flex flex-col md:flex-row h-full">
                        <div className="md:w-1/4 relative">
                          <img 
                            src={event.image} 
                            alt={event.title}
                            className="w-full h-48 md:h-full object-cover"
                          />
                          {event.featured && (
                            <div className="absolute top-2 left-2 bg-kpmg-blue text-white text-xs font-bold px-2 py-1 rounded">
                              Destaque
                            </div>
                          )}
                        </div>
                        
                        <div className="md:w-3/4 p-4 md:p-6 flex flex-col">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center text-xs text-gray-500 mb-2">
                                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{event.category}</span>
                              </div>
                              <h3 className="font-bold text-xl mb-2">{event.title}</h3>
                            </div>
                            <div className="bg-white/90 text-kpmg-blue text-sm font-bold px-2 py-1 rounded-full flex items-center">
                              <Star className="h-4 w-4 mr-1 fill-kpmg-blue text-kpmg-blue" />
                              {event.rating}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar className="h-4 w-4 mr-2 text-kpmg-blue" />
                              {new Date(event.date).toLocaleDateString('pt-BR')}
                            </div>
                            
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="h-4 w-4 mr-2 text-kpmg-blue" />
                              {event.time}
                            </div>
                            
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="h-4 w-4 mr-2 text-kpmg-blue" />
                              {event.location}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mt-auto pt-4 border-t">
                            <div className="text-sm text-gray-600 flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {event.attendees} participantes
                            </div>
                            <div>
                              <span className="text-sm font-medium text-kpmg-blue">
                                {event.availableSpots} vagas disponíveis
                              </span>
                              <Button 
                                className="ml-3 bg-kpmg-blue hover:bg-kpmg-lightblue"
                                size="sm"
                                asChild
                              >
                                <span>Ver Detalhes</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </Card>
                  ))
                )}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">Nenhum evento encontrado</h3>
                <p className="text-gray-500">Tente ajustar sua busca para encontrar o que procura.</p>
              </div>
            )}
          </div>
          
          <div className="flex justify-center mt-8">
            <Link to="/events">
              <Button 
                variant="outline" 
                className="border-kpmg-blue text-kpmg-blue hover:bg-kpmg-blue hover:text-white"
              >
                Ver Todos os Eventos
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-kpmg-blue/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-kpmg-blue mb-6">Quer participar dos melhores eventos?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Crie sua conta para receber notificações sobre novos eventos que combinam com seus interesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button className="bg-kpmg-blue hover:bg-kpmg-lightblue text-white px-8 py-3 rounded-lg">
                Acessar minha conta
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" className="border-kpmg-blue text-kpmg-blue hover:bg-kpmg-blue hover:text-white px-8 py-3 rounded-lg">
                Criar uma conta
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
