import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, ListFilter, Grid, ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import SpaceFilter from '@/components/calendar/SpaceFilter';

const CalendarDashboard = () => {
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'calendar'>('calendar');
  const [calendarView, setCalendarView] = useState<'day' | 'week' | 'month'>('month');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filters, setFilters] = useState({
    eventType: '',
    dateFrom: '',
    dateTo: '',
    space: '',
    audience: '',
  });

  // Mock data for events
  const events = [
    {
      id: '1',
      title: 'Workshop de Inovação Digital',
      date: '2025-05-15',
      time: '09:00 - 17:00',
      location: 'Auditório Principal',
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
      category: 'Conferência',
      audience: 'Externo',
      status: 'Aprovado',
    },
    {
      id: '5',
      title: 'Treinamento de Liderança',
      date: '2025-05-25',
      time: '13:00 - 18:00',
      location: 'Sala de Treinamento',
      category: 'Treinamento',
      audience: 'Interno',
      status: 'Aprovado',
    },
    {
      id: '6',
      title: 'Design Thinking Workshop',
      date: '2025-05-22',
      time: '09:00 - 12:00',
      location: 'Lounge',
      category: 'Workshop',
      audience: 'Interno',
      status: 'Aprovado',
    },
    {
      id: '7',
      title: 'Reunião de Planejamento Q3',
      date: '2025-06-10',
      time: '14:00 - 16:00',
      location: 'Sala de Reuniões B',
      category: 'Reunião',
      audience: 'Interno',
      status: 'Em análise',
    }
  ];

  // List of available spaces
  const availableSpaces = [
    { id: 'auditorio-principal', name: 'Auditório Principal', capacity: 200 },
    { id: 'sala-reunioes-a', name: 'Sala de Reuniões A', capacity: 50 },
    { id: 'sala-reunioes-b', name: 'Sala de Reuniões B', capacity: 80 },
    { id: 'espaco-colaborativo', name: 'Espaço Colaborativo', capacity: 100 },
    { id: 'sala-treinamento', name: 'Sala de Treinamento', capacity: 40 },
    { id: 'lounge', name: 'Lounge', capacity: 30 }
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
    
    // Date filtering logic
    const eventDate = new Date(event.date);
    const dateFrom = filters.dateFrom ? new Date(filters.dateFrom) : null;
    const dateTo = filters.dateTo ? new Date(filters.dateTo) : null;
    
    const matchesDateFrom = !dateFrom || eventDate >= dateFrom;
    const matchesDateTo = !dateTo || eventDate <= dateTo;
    
    return matchesEventType && matchesAudience && matchesSpace && matchesDateFrom && matchesDateTo;
  });

  // Function to get events for a specific day and space
  const getEventsForDayAndSpace = (day: number, spaceId: string): any[] => {
    const eventsForDay: any[] = [];
    const currentYear = currentMonth.getFullYear();
    const currentMonthNum = currentMonth.getMonth();
    
    filteredEvents.forEach(event => {
      const eventDate = new Date(event.date);
      // Map location names to space IDs
      const spaceMapping: Record<string, string> = {
        'Auditório Principal': 'auditorio-principal',
        'Sala de Reuniões A': 'sala-reunioes-a',
        'Sala de Reuniões B': 'sala-reunioes-b',
        'Espaço Colaborativo': 'espaco-colaborativo',
        'Sala de Treinamento': 'sala-treinamento',
        'Lounge': 'lounge'
      };
      
      const eventSpaceId = spaceMapping[event.location] || '';
      
      if (
        eventDate.getFullYear() === currentYear &&
        eventDate.getMonth() === currentMonthNum &&
        eventDate.getDate() === day &&
        (spaceId === 'all' || eventSpaceId === spaceId)
      ) {
        eventsForDay.push({
          ...event,
          spaceId: eventSpaceId
        });
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
        
        // Get events for all spaces on this day
        const spacesWithEvents: Record<string, any[]> = {};
        
        availableSpaces.forEach(space => {
          const eventsForSpace = isCurrentMonth 
            ? getEventsForDayAndSpace(current.getDate(), space.id)
            : [];
          
          if (eventsForSpace.length > 0) {
            spacesWithEvents[space.id] = eventsForSpace;
          }
        });
        
        week.push({
          day: current.getDate(),
          isCurrentMonth,
          isToday,
          isSelected,
          spacesWithEvents
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
                <Tabs defaultValue="month" value={calendarView} onValueChange={(v) => setCalendarView(v as 'day' | 'week' | 'month')}>
                  <TabsList className="mb-6">
                    <TabsTrigger value="day">Dia</TabsTrigger>
                    <TabsTrigger value="week">Semana</TabsTrigger>
                    <TabsTrigger value="month">Mês</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="month">
                    <div className="flex justify-between items-center mb-6">
                      <Button variant="outline" size="sm" onClick={prevMonth}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <h3 className="text-lg font-medium">
                        {currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                      </h3>
                      <Button variant="outline" size="sm" onClick={nextMonth}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Legend for spaces */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      {availableSpaces.map(space => (
                        <div key={space.id} className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded mr-1" 
                            style={{ 
                              backgroundColor: space.id === 'auditorio-principal' ? '#0091DA' : 
                                               space.id === 'sala-reunioes-a' ? '#00A3A1' : 
                                               space.id === 'sala-reunioes-b' ? '#8A8D8F' : 
                                               space.id === 'espaco-colaborativo' ? '#92D400' :
                                               space.id === 'sala-treinamento' ? '#BF5700' : '#702082'
                            }}
                          />
                          <span className="text-xs">{space.name}</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                      {/* Calendar header */}
                      {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                        <div key={day} className="p-2 text-center font-semibold bg-gray-50">
                          {day}
                        </div>
                      ))}
                      
                      {/* Calendar grid with space visualization */}
                      {calendar.map((week, weekIndex) => (
                        week.map((day, dayIndex) => (
                          <div 
                            key={`${weekIndex}-${dayIndex}`} 
                            className={`
                              min-h-[120px] p-2 border border-gray-200
                              ${day.isToday ? 'bg-blue-50' : 'bg-white'}
                              ${!day.isCurrentMonth ? 'text-gray-400' : ''}
                              ${day.isSelected ? 'ring-2 ring-kpmg-blue' : ''}
                            `}
                            onClick={() => setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day.day))}
                          >
                            <div className="font-medium mb-1">{day.day}</div>
                            
                            {/* Space events visualization */}
                            <div className="space-y-1">
                              {Object.entries(day.spacesWithEvents).map(([spaceId, events]) => {
                                // Find the space details
                                const space = availableSpaces.find(s => s.id === spaceId);
                                if (!space) return null;
                                
                                // Determine color based on space
                                let bgColor;
                                switch(spaceId) {
                                  case 'auditorio-principal': bgColor = '#0091DA'; break;
                                  case 'sala-reunioes-a': bgColor = '#00A3A1'; break;
                                  case 'sala-reunioes-b': bgColor = '#8A8D8F'; break;
                                  case 'espaco-colaborativo': bgColor = '#92D400'; break;
                                  case 'sala-treinamento': bgColor = '#BF5700'; break;
                                  default: bgColor = '#702082';
                                }
                                
                                return events.map((event: any, index: number) => (
                                  <div 
                                    key={`${event.id}-${index}`}
                                    className="text-xs p-1 rounded truncate" 
                                    style={{ backgroundColor: bgColor }}
                                  >
                                    <div className="text-white truncate" title={`${event.title} (${space.name})`}>
                                      {event.title.length > 14 ? `${event.title.substring(0, 12)}...` : event.title}
                                    </div>
                                    <div className="text-white text-xs">{event.time.split(' - ')[0]}</div>
                                  </div>
                                ));
                              })}
                            </div>
                          </div>
                        ))
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="week">
                    <div className="flex justify-between items-center mb-6">
                      <Button variant="outline" size="sm" onClick={prevMonth}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <h3 className="text-lg font-medium">
                        Semana de {selectedDate ? selectedDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' }) : new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}
                      </h3>
                      <Button variant="outline" size="sm" onClick={nextMonth}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Week view implementation will go here */}
                    <div className="grid grid-cols-7 gap-2">
                      {/* Headers for days of the week */}
                      {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                        <div key={day} className="text-center font-medium p-2 bg-gray-100 rounded">
                          {day}
                        </div>
                      ))}
                      
                      {/* Content for each day in the week */}
                      {Array(7).fill(0).map((_, i) => (
                        <div key={i} className="h-96 border border-gray-200 p-2 rounded overflow-y-auto">
                          <h4 className="font-medium mb-1">
                            {new Date(currentMonth.getFullYear(), currentMonth.getMonth(), currentMonth.getDate() - currentMonth.getDay() + i).getDate()}
                          </h4>
                          
                          {/* Space slots */}
                          <div className="space-y-4 mt-2">
                            {availableSpaces.map(space => (
                              <div 
                                key={space.id} 
                                className="text-xs p-2 rounded shadow-sm" 
                                style={{ 
                                  backgroundColor: 
                                    space.id === 'auditorio-principal' ? '#0091DA30' : 
                                    space.id === 'sala-reunioes-a' ? '#00A3A130' : 
                                    space.id === 'sala-reunioes-b' ? '#8A8D8F30' : 
                                    space.id === 'espaco-colaborativo' ? '#92D40030' :
                                    space.id === 'sala-treinamento' ? '#BF570030' : '#70208230'
                                }}
                              >
                                <div className="font-medium">{space.name}</div>
                                <div className="mt-1">
                                  {/* Here we would render events for this space on this day */}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="day">
                    <div className="flex justify-between items-center mb-6">
                      <Button variant="outline" size="sm" onClick={prevMonth}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <h3 className="text-lg font-medium">
                        {selectedDate ? selectedDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }) : new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                      </h3>
                      <Button variant="outline" size="sm" onClick={nextMonth}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Day view implementation */}
                    <div className="border rounded-lg">
                      <div className="grid grid-cols-7 border-b">
                        <div className="col-span-1 p-2 border-r">
                          Hora
                        </div>
                        <div className="col-span-6 p-2">
                          Espaços
                        </div>
                      </div>
                      
                      {/* Time slots */}
                      {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'].map(time => (
                        <div key={time} className="grid grid-cols-7 border-b">
                          <div className="col-span-1 p-2 border-r text-sm">
                            {time}
                          </div>
                          <div className="col-span-6 p-2">
                            <div className="grid grid-cols-6 gap-1">
                              {availableSpaces.map(space => (
                                <div
                                  key={space.id}
                                  className="h-8 border border-dashed border-gray-300 rounded relative"
                                  style={{ 
                                    backgroundColor: 
                                      space.id === 'auditorio-principal' ? '#0091DA10' : 
                                      space.id === 'sala-reunioes-a' ? '#00A3A110' : 
                                      space.id === 'sala-reunioes-b' ? '#8A8D8F10' : 
                                      space.id === 'espaco-colaborativo' ? '#92D40010' :
                                      space.id === 'sala-treinamento' ? '#BF570010' : '#70208210'
                                  }}
                                >
                                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                                    <span className="text-xs text-gray-500">{space.name}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
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
