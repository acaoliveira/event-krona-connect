
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, ListFilter, Grid, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const CalendarDashboard = () => {
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'calendar'>('calendar');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSpace, setSelectedSpace] = useState<string>('all');
  const [filters, setFilters] = useState({
    eventType: '',
    dateFrom: '',
    dateTo: '',
    space: '',
    audience: '',
  });

  // Mock data for spaces
  const spaces = [
    { id: 'aud1', name: 'Auditório Principal', capacity: 200 },
    { id: 'sala1', name: 'Sala de Reuniões A', capacity: 30 },
    { id: 'esp1', name: 'Espaço Colaborativo', capacity: 50 },
    { id: 'aud2', name: 'Auditório Secundário', capacity: 100 },
    { id: 'sala2', name: 'Sala de Reuniões B', capacity: 20 },
  ];

  // Mock data for events
  const events = [
    {
      id: '1',
      title: 'Workshop de Inovação Digital',
      date: '2025-05-15',
      time: '09:00 - 17:00',
      location: 'Auditório Principal',
      spaceId: 'aud1',
      category: 'Workshop',
      audience: 'Externo',
      status: 'Aprovado',
    },
    {
      id: '2',
      title: 'Seminário Fiscal e Tributário',
      date: '2025-05-20',
      time: '14:00 - 18:00',
      location: 'Sala de Reuniões A',
      spaceId: 'sala1',
      category: 'Seminário',
      audience: 'Interno',
      status: 'Aprovado',
    },
    {
      id: '3',
      title: 'Fórum ESG e Sustentabilidade',
      date: '2025-06-05',
      time: '10:00 - 16:00',
      location: 'Espaço Colaborativo',
      spaceId: 'esp1',
      category: 'Fórum',
      audience: 'Híbrido',
      status: 'Em análise',
    },
    {
      id: '4',
      title: 'Conferência de Auditoria',
      date: '2025-06-15',
      time: '09:00 - 18:00',
      location: 'Auditório Principal',
      spaceId: 'aud1',
      category: 'Conferência',
      audience: 'Externo',
      status: 'Aprovado',
    },
    {
      id: '5',
      title: 'Reunião de Planejamento Estratégico',
      date: '2025-05-18',
      time: '13:00 - 15:00',
      location: 'Sala de Reuniões B',
      spaceId: 'sala2',
      category: 'Reunião',
      audience: 'Interno',
      status: 'Aprovado',
    },
    {
      id: '6',
      title: 'Treinamento de Liderança',
      date: '2025-05-25',
      time: '09:00 - 12:00',
      location: 'Auditório Secundário',
      spaceId: 'aud2',
      category: 'Treinamento',
      audience: 'Interno',
      status: 'Aprovado',
    },
  ];

  const handleFilterChange = (key: string, value: string) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  const filteredEvents = events.filter(event => {
    const matchesEventType = !filters.eventType || event.category === filters.eventType;
    const matchesAudience = !filters.audience || event.audience === filters.audience;
    const matchesSpace = !filters.space || event.location.includes(filters.space);
    const matchesSelectedSpace = selectedSpace === 'all' || event.spaceId === selectedSpace;
    
    // Date filtering logic
    const eventDate = new Date(event.date);
    const dateFrom = filters.dateFrom ? new Date(filters.dateFrom) : null;
    const dateTo = filters.dateTo ? new Date(filters.dateTo) : null;
    
    const matchesDateFrom = !dateFrom || eventDate >= dateFrom;
    const matchesDateTo = !dateTo || eventDate <= dateTo;
    
    return matchesEventType && matchesAudience && matchesSpace && matchesDateFrom && matchesDateTo && matchesSelectedSpace;
  });

  // Function to get events for a specific day (used in calendar view)
  const getEventsForDay = (day: number): string[] => {
    const eventsForDay: string[] = [];
    const currentYear = currentMonth.getFullYear();
    const currentMonthNum = currentMonth.getMonth();
    
    filteredEvents.forEach(event => {
      const eventDate = new Date(event.date);
      if (
        eventDate.getFullYear() === currentYear &&
        eventDate.getMonth() === currentMonthNum &&
        eventDate.getDate() === day
      ) {
        eventsForDay.push(event.title);
      }
    });
    
    return eventsForDay;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Aprovado':
        return <Badge className="bg-green-500">Aprovado</Badge>;
      case 'Em análise':
        return <Badge className="bg-amber-500">Em análise</Badge>;
      case 'Reprovado':
        return <Badge className="bg-red-500">Reprovado</Badge>;
      case 'Cancelado':
        return <Badge className="bg-gray-500">Cancelado</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Calendar navigation
  const prevMonth = () => {
    setCurrentMonth(prev => {
      const date = new Date(prev);
      date.setMonth(date.getMonth() - 1);
      return date;
    });
  };

  const nextMonth = () => {
    setCurrentMonth(prev => {
      const date = new Date(prev);
      date.setMonth(date.getMonth() + 1);
      return date;
    });
  };

  // Generate calendar days
  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Get first day of month and last day
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Calculate start day (adding days from previous month if needed)
    const startOffset = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const totalDays = lastDay.getDate() + startOffset;
    
    // Calculate rows needed
    const rows = Math.ceil(totalDays / 7);
    
    const calendar = [];
    let day = 1 - startOffset;
    
    for (let row = 0; row < rows; row++) {
      const week = [];
      for (let col = 0; col < 7; col++) {
        const current = new Date(year, month, day);
        const isCurrentMonth = current.getMonth() === month;
        const isToday = new Date().toDateString() === current.toDateString();
        const isSelected = selectedDate && selectedDate.toDateString() === current.toDateString();
        
        week.push({
          day: current.getDate(),
          isCurrentMonth,
          isToday,
          isSelected,
          events: isCurrentMonth ? getEventsForDay(current.getDate()) : []
        });
        day++;
      }
      calendar.push(week);
    }
    
    return calendar;
  };

  const calendar = generateCalendar();

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-kpmg-blue mb-2">Calendário de Eventos</h1>
            <p className="text-gray-600">
              Visualize e gerencie todos os eventos agendados
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Link to="/event-space-request">
              <Button className="bg-kpmg-blue hover:bg-kpmg-lightblue">
                Solicitar Espaço para Evento
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <Card className="shadow-md border-0 p-4 mb-6">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
              <div className="flex-grow">
                <Input placeholder="Buscar eventos..." className="w-full" />
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
                  <Calendar className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
                  <SelectItem value="Reunião">Reunião</SelectItem>
                  <SelectItem value="Treinamento">Treinamento</SelectItem>
                </SelectContent>
              </Select>

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
              
              <Select onValueChange={(value) => handleFilterChange('space', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Espaço" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_spaces">Todos os espaços</SelectItem>
                  <SelectItem value="Auditório Principal">Auditório Principal</SelectItem>
                  <SelectItem value="Sala de Reuniões A">Sala de Reuniões A</SelectItem>
                  <SelectItem value="Espaço Colaborativo">Espaço Colaborativo</SelectItem>
                  <SelectItem value="Auditório Secundário">Auditório Secundário</SelectItem>
                  <SelectItem value="Sala de Reuniões B">Sala de Reuniões B</SelectItem>
                </SelectContent>
              </Select>
              
              <div>
                <Input 
                  type="date" 
                  placeholder="Data Início"
                  value={filters.dateFrom}
                  onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                />
              </div>
              
              <div>
                <Input 
                  type="date" 
                  placeholder="Data Fim"
                  value={filters.dateTo}
                  onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* View Modes */}
        <div className="mb-6">
          {viewMode === 'list' && (
            <div className="space-y-4">
              {filteredEvents.length > 0 ? (
                filteredEvents.map(event => (
                  <Card key={event.id} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-3/4 p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-semibold text-kpmg-blue">{event.title}</h3>
                          {getStatusBadge(event.status)}
                        </div>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>{new Date(event.date).toLocaleDateString('pt-BR')} | {event.time}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <span className="text-gray-500">{event.location}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="bg-gray-200 px-2 py-0.5 rounded text-gray-700">{event.audience}</span>
                          </div>
                        </div>
                        <div>
                          <Link to={`/dashboard/solicitacoes/${event.id}`}>
                            <Button variant="outline">Visualizar</Button>
                          </Link>
                        </div>
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
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-kpmg-blue">{event.title}</h3>
                        {getStatusBadge(event.status)}
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>{new Date(event.date).toLocaleDateString('pt-BR')} | {event.time}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="text-gray-500">{event.location}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="bg-gray-200 px-2 py-0.5 rounded text-gray-700">{event.audience}</span>
                        </div>
                      </div>
                      <div>
                        <Link to={`/dashboard/solicitacoes/${event.id}`}>
                          <Button variant="outline" className="w-full">Visualizar</Button>
                        </Link>
                      </div>
                    </div>
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
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <Tabs defaultValue="month">
                  <TabsList className="mb-6">
                    <TabsTrigger value="day">Dia</TabsTrigger>
                    <TabsTrigger value="week">Semana</TabsTrigger>
                    <TabsTrigger value="month">Mês</TabsTrigger>
                    <TabsTrigger value="space">Espaço</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="month">
                    <div className="flex justify-between items-center mb-6">
                      <Button variant="outline" size="sm" onClick={prevMonth} className="border-kpmg-blue text-kpmg-blue hover:bg-kpmg-blue hover:text-white">
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <h3 className="text-lg font-medium">
                        {currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                      </h3>
                      <Button variant="outline" size="sm" onClick={nextMonth} className="border-kpmg-blue text-kpmg-blue hover:bg-kpmg-blue hover:text-white">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                      {/* Calendar header */}
                      {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                        <div key={day} className="p-2 text-center font-semibold bg-gray-50">
                          {day}
                        </div>
                      ))}
                      
                      {/* Calendar grid */}
                      {calendar.map((week, weekIndex) => (
                        week.map((day, dayIndex) => (
                          <div 
                            key={`${weekIndex}-${dayIndex}`} 
                            className={`
                              min-h-[100px] p-2 border border-gray-200
                              ${day.isToday ? 'bg-blue-50' : 'bg-white'}
                              ${!day.isCurrentMonth ? 'text-gray-400' : ''}
                              ${day.isSelected ? 'ring-2 ring-kpmg-blue' : ''}
                            `}
                            onClick={() => setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day.day))}
                          >
                            <div className="font-medium">{day.day}</div>
                            <div className="mt-1 space-y-1">
                              {day.events.map((eventTitle, index) => (
                                <div 
                                  key={index} 
                                  className="text-xs p-1 bg-kpmg-blue text-white rounded truncate"
                                  title={eventTitle}
                                >
                                  {eventTitle.length > 20 ? `${eventTitle.substring(0, 18)}...` : eventTitle}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))
                      ))}
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
                  
                  <TabsContent value="space">
                    <div className="mb-6">
                      <Select 
                        value={selectedSpace}
                        onValueChange={setSelectedSpace}
                      >
                        <SelectTrigger className="max-w-xs">
                          <SelectValue placeholder="Selecione um espaço" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos os espaços</SelectItem>
                          {spaces.map(space => (
                            <SelectItem key={space.id} value={space.id}>
                              {space.name} (Cap: {space.capacity})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex justify-between items-center mb-6">
                      <Button variant="outline" size="sm" onClick={prevMonth} className="border-kpmg-blue text-kpmg-blue hover:bg-kpmg-blue hover:text-white">
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <h3 className="text-lg font-medium">
                        {currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                      </h3>
                      <Button variant="outline" size="sm" onClick={nextMonth} className="border-kpmg-blue text-kpmg-blue hover:bg-kpmg-blue hover:text-white">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr>
                            <th className="p-2 bg-gray-50 border border-gray-200">Espaço</th>
                            {Array.from({ length: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate() }, (_, i) => i + 1).map(day => (
                              <th key={day} className={`p-2 text-center border border-gray-200 ${
                                new Date().getDate() === day && 
                                new Date().getMonth() === currentMonth.getMonth() && 
                                new Date().getFullYear() === currentMonth.getFullYear() ? 'bg-blue-50' : 'bg-gray-50'
                              }`}>
                                {day}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {(selectedSpace === 'all' ? spaces : spaces.filter(s => s.id === selectedSpace)).map(space => (
                            <tr key={space.id}>
                              <td className="p-2 border border-gray-200 font-medium">{space.name}</td>
                              {Array.from({ length: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate() }, (_, i) => i + 1).map(day => {
                                const eventsForDay = filteredEvents.filter(event => {
                                  const eventDate = new Date(event.date);
                                  return (
                                    eventDate.getDate() === day && 
                                    eventDate.getMonth() === currentMonth.getMonth() && 
                                    eventDate.getFullYear() === currentMonth.getFullYear() &&
                                    event.spaceId === space.id
                                  );
                                });
                                
                                return (
                                  <td key={day} className="p-1 border border-gray-200 min-w-[80px] h-[80px] align-top">
                                    {eventsForDay.length > 0 && (
                                      <div className="space-y-1">
                                        {eventsForDay.map(event => (
                                          <div 
                                            key={event.id} 
                                            className="text-xs p-1 bg-kpmg-blue text-white rounded truncate cursor-pointer"
                                            title={`${event.title} - ${event.time}`}
                                          >
                                            {event.title.length > 12 ? `${event.title.substring(0, 10)}...` : event.title}
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CalendarDashboard;
