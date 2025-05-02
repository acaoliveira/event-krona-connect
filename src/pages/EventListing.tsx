import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarIcon, ListFilter, Grid, Calendar, Users, Search, MapPin } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

// Mock data for events
const mockEvents = [
  {
    id: '1',
    title: 'Workshop de Inovação Digital',
    date: '2025-05-15',
    time: '09:00 - 17:00',
    location: 'KPMG São Paulo',
    category: 'Workshop',
    audience: 'Externo',
    description: 'Workshop sobre inovação digital e transformação de negócios.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '2',
    title: 'Seminário Fiscal e Tributário',
    date: '2025-05-20',
    time: '14:00 - 18:00',
    location: 'KPMG Rio de Janeiro',
    category: 'Seminário',
    audience: 'Interno',
    description: 'Seminário sobre as últimas atualizações fiscais e tributárias.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '3',
    title: 'Fórum ESG e Sustentabilidade',
    date: '2025-06-05',
    time: '10:00 - 16:00',
    location: 'KPMG Belo Horizonte',
    category: 'Fórum',
    audience: 'Híbrido',
    description: 'Fórum sobre práticas ESG e sustentabilidade empresarial.',
    image: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '4',
    title: 'Conferência de Auditoria e Compliance',
    date: '2025-06-15',
    time: '09:00 - 18:00',
    location: 'KPMG São Paulo',
    category: 'Conferência',
    audience: 'Externo',
    description: 'Conferência anual sobre auditoria, riscos e compliance.',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  }
];

const EventListing = () => {
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'calendar'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    eventType: '',
    date: '',
    audience: '',
    location: '',
  });
  
  const filteredEvents = mockEvents.filter(event => {
    // Apply search term filter
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply dropdown filters (only if they are set)
    const matchesEventType = filters.eventType ? event.category === filters.eventType : true;
    const matchesDate = filters.date ? event.date === filters.date : true;
    const matchesAudience = filters.audience ? event.audience === filters.audience : true;
    const matchesLocation = filters.location ? event.location.includes(filters.location) : true;
    
    return matchesSearch && matchesEventType && matchesDate && matchesAudience && matchesLocation;
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters({
      ...filters,
      [key]: value
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-kpmg-blue mb-2">Eventos</h1>
            <p className="text-gray-600">
              Explore os próximos eventos da KPMG e faça sua inscrição
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/space-request">
              <Button className="bg-kpmg-blue hover:bg-kpmg-lightblue">
                Solicitar Espaço para Evento
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Pesquisar eventos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-kpmg-blue' : ''}
              >
                <ListFilter className="h-5 w-5" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-kpmg-blue' : ''}
              >
                <Grid className="h-5 w-5" />
              </Button>
              <Button
                variant={viewMode === 'calendar' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('calendar')}
                className={viewMode === 'calendar' ? 'bg-kpmg-blue' : ''}
              >
                <CalendarIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select onValueChange={(value) => handleFilterChange('eventType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de Evento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_types">Todos os tipos</SelectItem>
                <SelectItem value="Workshop">Workshop</SelectItem>
                <SelectItem value="Seminário">Seminário</SelectItem>
                <SelectItem value="Conferência">Conferência</SelectItem>
                <SelectItem value="Fórum">Fórum</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex items-center space-x-2 relative">
              <Input
                type="date"
                onChange={(e) => handleFilterChange('date', e.target.value)}
                className="w-full"
              />
            </div>
            
            <Select onValueChange={(value) => handleFilterChange('audience', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Público-Alvo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_audiences">Todos os públicos</SelectItem>
                <SelectItem value="Interno">Interno</SelectItem>
                <SelectItem value="Externo">Externo</SelectItem>
                <SelectItem value="Híbrido">Híbrido</SelectItem>
              </SelectContent>
            </Select>
            
            <Select onValueChange={(value) => handleFilterChange('location', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Localização" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_locations">Todas as localizações</SelectItem>
                <SelectItem value="São Paulo">São Paulo</SelectItem>
                <SelectItem value="Rio de Janeiro">Rio de Janeiro</SelectItem>
                <SelectItem value="Belo Horizonte">Belo Horizonte</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* View Modes */}
        <div className="mb-6">
          {viewMode === 'list' && (
            <div className="space-y-4">
              {filteredEvents.length > 0 ? (
                filteredEvents.map(event => (
                  <Card key={event.id} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4">
                        <img src={event.image} alt={event.title} className="h-48 md:h-full w-full object-cover" />
                      </div>
                      <div className="md:w-3/4 p-6">
                        <CardHeader className="p-0 pb-4">
                          <CardTitle className="text-xl font-semibold text-kpmg-blue">{event.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            <span>{new Date(event.date).toLocaleDateString('pt-BR')} | {event.time}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="mr-2 h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Users className="mr-2 h-4 w-4" />
                            <span>Público: {event.audience}</span>
                          </div>
                          <p className="text-gray-600 mt-2">{event.description}</p>
                        </CardContent>
                        <CardFooter className="p-0 pt-4">
                          <Link to={`/events/${event.id}`}>
                            <Button className="bg-kpmg-blue hover:bg-kpmg-lightblue">Ver Detalhes</Button>
                          </Link>
                        </CardFooter>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">Nenhum evento encontrado com os filtros selecionados.</p>
                </div>
              )}
            </div>
          )}
          
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.length > 0 ? (
                filteredEvents.map(event => (
                  <Card key={event.id} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-kpmg-blue">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>{new Date(event.date).toLocaleDateString('pt-BR')} | {event.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="mr-2 h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="mr-2 h-4 w-4" />
                        <span>Público: {event.audience}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link to={`/events/${event.id}`}>
                        <Button className="bg-kpmg-blue hover:bg-kpmg-lightblue w-full">Ver Detalhes</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <p className="text-gray-500 text-lg">Nenhum evento encontrado com os filtros selecionados.</p>
                </div>
              )}
            </div>
          )}
          
          {viewMode === 'calendar' && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <Tabs defaultValue="month">
                <TabsList className="mb-6">
                  <TabsTrigger value="day">Dia</TabsTrigger>
                  <TabsTrigger value="week">Semana</TabsTrigger>
                  <TabsTrigger value="month">Mês</TabsTrigger>
                </TabsList>
                
                <TabsContent value="month" className="animate-fade-in">
                  <div className="grid grid-cols-7 gap-1">
                    {/* Calendar header */}
                    {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                      <div key={day} className="p-2 text-center font-semibold bg-gray-50">
                        {day}
                      </div>
                    ))}
                    
                    {/* Calendar grid - simplified for demo */}
                    {Array.from({ length: 35 }).map((_, i) => {
                      // For demo, let's say days 15, 20, and 25 have events
                      const hasEvent = [15, 20, 25].includes(i);
                      const isToday = i === 9; // Just for demo
                      
                      return (
                        <div 
                          key={i} 
                          className={`
                            min-h-[100px] p-2 border border-gray-200
                            ${isToday ? 'bg-blue-50' : 'bg-white'}
                            ${i < 3 || i > 30 ? 'text-gray-400' : ''}
                          `}
                        >
                          <div className="font-medium">{i < 3 ? 28 + i : (i > 30 ? i - 31 : i)}</div>
                          {hasEvent && (
                            <div className="mt-1">
                              <div className="text-xs p-1 bg-kpmg-blue text-white rounded truncate">
                                {i === 15 && "Workshop de Inovação"}
                                {i === 20 && "Seminário Fiscal"}
                                {i === 25 && "Fórum ESG"}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-6 text-center text-gray-500">
                    <p>Visão de calendário completa será implementada em uma versão futura.</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="week" className="text-center py-12 text-gray-500">
                  <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p>Visão de semana será implementada em uma versão futura.</p>
                </TabsContent>
                
                <TabsContent value="day" className="text-center py-12 text-gray-500">
                  <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p>Visão de dia será implementada em uma versão futura.</p>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default EventListing;
