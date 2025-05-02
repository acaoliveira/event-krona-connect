
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, Clock, Search } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({
    category: '',
    date: '',
    location: '',
  });
  
  // Sample event data
  const events = [
    {
      id: '1',
      title: 'Workshop de Inovação Digital',
      date: '15 de Maio, 2025',
      time: '09:00 - 17:00',
      location: 'KPMG São Paulo',
      category: 'Workshop',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      featured: true,
    },
    {
      id: '2',
      title: 'Seminário Fiscal e Tributário',
      date: '20 de Maio, 2025',
      time: '14:00 - 18:00',
      location: 'KPMG Rio de Janeiro',
      category: 'Seminário',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      featured: true,
    },
    {
      id: '3',
      title: 'Fórum ESG e Sustentabilidade',
      date: '5 de Junho, 2025',
      time: '10:00 - 16:00',
      location: 'KPMG Belo Horizonte',
      category: 'Fórum',
      image: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      featured: false,
    },
    {
      id: '4',
      title: 'Conferência de Auditoria e Compliance',
      date: '15 de Junho, 2025',
      time: '09:00 - 18:00',
      location: 'KPMG São Paulo',
      category: 'Conferência',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      featured: false,
    },
    {
      id: '5',
      title: 'Webinar: Transformação Digital',
      date: '22 de Junho, 2025',
      time: '15:00 - 17:00',
      location: 'Online',
      category: 'Webinar',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      featured: false,
    },
    {
      id: '6',
      title: 'Encontro de Líderes em Tecnologia',
      date: '30 de Junho, 2025',
      time: '10:00 - 18:00',
      location: 'KPMG São Paulo',
      category: 'Encontro',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      featured: true,
    },
  ];
  
  // Filter events based on search term and filters
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filter.category || event.category === filter.category;
    const matchesLocation = !filter.location || event.location.includes(filter.location);
    // For simplicity, date filter is not implemented in this example
    
    return matchesSearch && matchesCategory && matchesLocation;
  });
  
  const featuredEvents = events.filter(event => event.featured);
  const upcomingEvents = events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  // Categories for the filter
  const categories = ['Workshop', 'Seminário', 'Fórum', 'Conferência', 'Webinar', 'Encontro'];
  
  // Locations for the filter
  const locations = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Online'];
  
  return (
    <MainLayout>
      {/* Hero Section with Background Image */}
      <div className="relative bg-kpmg-blue">
        {/* Background image with overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')" }}
        ></div>
        
        <div className="relative container mx-auto px-4 py-20 text-white z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Descubra Eventos Inspiradores</h1>
            <p className="text-xl md:text-2xl mb-8">Participe dos melhores eventos da KPMG focados em inovação, negócios e tecnologia</p>
            
            {/* Search and Filter Section */}
            <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Buscar eventos..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="md:w-1/2 flex gap-2">
                  <Select onValueChange={(value) => setFilter({ ...filter, category: value })}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todas as categorias</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select onValueChange={(value) => setFilter({ ...filter, location: value })}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Local" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todos os locais</SelectItem>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <Button className="bg-kpmg-blue hover:bg-kpmg-lightblue text-white">
                  Buscar Eventos
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Events Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-kpmg-blue mb-2 text-center">Eventos em Destaque</h2>
          <p className="text-gray-600 mb-8 text-center">Confira os próximos eventos mais aguardados</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.slice(0, 3).map((event) => (
              <Link key={event.id} to={`/events/${event.id}`}>
                <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all h-full transform hover:-translate-y-1">
                  <div className="h-48 overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center text-sm text-kpmg-green mb-2">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-kpmg-blue">{event.title}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="mr-2 h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="mt-4">
                      <span className="inline-block bg-kpmg-blue bg-opacity-10 text-kpmg-blue px-3 py-1 rounded-full text-sm">
                        {event.category}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/events">
              <Button variant="outline" className="border-kpmg-blue text-kpmg-blue hover:bg-kpmg-blue hover:text-white">
                Ver Todos os Eventos
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Event Categories Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-kpmg-blue mb-2 text-center">Categorias de Eventos</h2>
          <p className="text-gray-600 mb-12 text-center">Encontre eventos de acordo com seu interesse</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link key={category} to={`/events?category=${category}`}>
                <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-kpmg-blue bg-opacity-10 flex items-center justify-center">
                    <Calendar className="h-8 w-8 text-kpmg-blue" />
                  </div>
                  <h3 className="font-semibold text-kpmg-blue">{category}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {events.filter(e => e.category === category).length} eventos
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* All Events Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-kpmg-blue mb-2 text-center">Próximos Eventos</h2>
          <p className="text-gray-600 mb-8 text-center">Confira nossa agenda de eventos</p>
          
          <Tabs defaultValue="all" className="w-full max-w-4xl mx-auto">
            <TabsList className="mb-8 flex justify-center">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="workshop">Workshops</TabsTrigger>
              <TabsTrigger value="seminar">Seminários</TabsTrigger>
              <TabsTrigger value="conference">Conferências</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event) => (
                  <Link key={event.id} to={`/events/${event.id}`}>
                    <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
                      <div className="h-48 overflow-hidden">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center text-sm text-kpmg-green mb-2">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>{event.date}</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-kpmg-blue">{event.title}</h3>
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <Clock className="mr-2 h-4 w-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="mr-2 h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="mt-4">
                          <span className="inline-block bg-kpmg-blue bg-opacity-10 text-kpmg-blue px-3 py-1 rounded-full text-sm">
                            {event.category}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="workshop">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.filter(e => e.category === 'Workshop').map((event) => (
                  // Workshop card content (same as above)
                  <Link key={event.id} to={`/events/${event.id}`}>
                    <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
                      <div className="h-48 overflow-hidden">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center text-sm text-kpmg-green mb-2">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>{event.date}</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-kpmg-blue">{event.title}</h3>
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <Clock className="mr-2 h-4 w-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="mr-2 h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="mt-4">
                          <span className="inline-block bg-kpmg-blue bg-opacity-10 text-kpmg-blue px-3 py-1 rounded-full text-sm">
                            {event.category}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="seminar">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.filter(e => e.category === 'Seminário').map((event) => (
                  // Seminars card content (same as above)
                  <Link key={event.id} to={`/events/${event.id}`}>
                    <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
                      <div className="h-48 overflow-hidden">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center text-sm text-kpmg-green mb-2">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>{event.date}</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-kpmg-blue">{event.title}</h3>
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <Clock className="mr-2 h-4 w-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="mr-2 h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="mt-4">
                          <span className="inline-block bg-kpmg-blue bg-opacity-10 text-kpmg-blue px-3 py-1 rounded-full text-sm">
                            {event.category}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="conference">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.filter(e => e.category === 'Conferência').map((event) => (
                  // Conferences card content (same as above)
                  <Link key={event.id} to={`/events/${event.id}`}>
                    <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
                      <div className="h-48 overflow-hidden">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center text-sm text-kpmg-green mb-2">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>{event.date}</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-kpmg-blue">{event.title}</h3>
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <Clock className="mr-2 h-4 w-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="mr-2 h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="mt-4">
                          <span className="inline-block bg-kpmg-blue bg-opacity-10 text-kpmg-blue px-3 py-1 rounded-full text-sm">
                            {event.category}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="bg-kpmg-blue py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Está pensando em realizar um evento?</h2>
            <p className="text-xl mb-8">Entre em contato com nossa equipe e descubra como podemos ajudar a criar uma experiência memorável</p>
            <Link to="/event-space-request">
              <Button variant="secondary" className="bg-kpmg-lightblue hover:bg-white hover:text-kpmg-blue">
                Solicitar um Evento
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
