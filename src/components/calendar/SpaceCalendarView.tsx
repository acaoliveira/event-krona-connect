
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Tipo para os eventos
interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  audience: string;
  status: string;
  spaceId?: string; // ID do espaço
}

interface SpaceCalendarViewProps {
  currentMonth: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  events: Event[];
  selectedSpaceId: string;
  onSelectDate?: (date: Date) => void;
}

const SpaceCalendarView = ({ 
  currentMonth, 
  onPrevMonth, 
  onNextMonth, 
  events,
  selectedSpaceId,
  onSelectDate 
}: SpaceCalendarViewProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Formatar o nome do mês e ano
  const monthYearFormat = currentMonth.toLocaleDateString('pt-BR', { 
    month: 'long', 
    year: 'numeric' 
  });

  // Filtrar eventos pelo espaço selecionado
  const filteredEvents = selectedSpaceId === 'all' 
    ? events 
    : events.filter(event => {
        // Mapear nomes de localização para IDs de espaços
        const spaceMapping: Record<string, string> = {
          'Auditório Principal': 'auditorio-principal',
          'Sala de Reuniões A': 'sala-reunioes-a',
          'Sala de Reuniões B': 'sala-reunioes-b',
          'Espaço Colaborativo': 'espaco-colaborativo',
          'Sala de Treinamento': 'sala-treinamento',
          'Lounge': 'lounge'
        };
        
        const eventSpaceId = spaceMapping[event.location] || '';
        return eventSpaceId === selectedSpaceId;
      });

  // Função para obter eventos para um dia específico
  const getEventsForDay = (day: number): Event[] => {
    const eventsForDay: Event[] = [];
    const currentYear = currentMonth.getFullYear();
    const currentMonthNum = currentMonth.getMonth();
    
    filteredEvents.forEach(event => {
      const eventDate = new Date(event.date);
      if (
        eventDate.getFullYear() === currentYear &&
        eventDate.getMonth() === currentMonthNum &&
        eventDate.getDate() === day
      ) {
        eventsForDay.push(event);
      }
    });
    
    return eventsForDay;
  };

  // Gerar o calendário
  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Obter primeiro e último dia do mês
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Calcular o dia inicial (adicionando dias do mês anterior, se necessário)
    const startOffset = firstDay.getDay(); // 0 = Domingo, 1 = Segunda, etc.
    const totalDays = lastDay.getDate() + startOffset;
    
    // Calcular número de linhas necessárias
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
        const eventsForDay = isCurrentMonth ? getEventsForDay(current.getDate()) : [];
        
        week.push({
          day: current.getDate(),
          isCurrentMonth,
          isToday,
          isSelected,
          events: eventsForDay
        });
        day++;
      }
      calendar.push(week);
    }
    
    return calendar;
  };

  const calendar = generateCalendar();

  // Função para selecionar uma data
  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    if (onSelectDate) {
      onSelectDate(date);
    }
  };

  // Função para obter o status do badge
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

  return (
    <Card className="border-0 shadow-md">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" size="sm" onClick={onPrevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="text-lg font-medium capitalize">
            {monthYearFormat}
          </h3>
          <Button variant="outline" size="sm" onClick={onNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {/* Cabeçalho do calendário */}
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
            <div key={day} className="p-2 text-center font-semibold bg-gray-50">
              {day}
            </div>
          ))}
          
          {/* Grade do calendário */}
          {calendar.map((week, weekIndex) => (
            week.map((day, dayIndex) => (
              <div 
                key={`${weekIndex}-${dayIndex}`} 
                className={`
                  min-h-[100px] p-2 border border-gray-200 cursor-pointer
                  ${day.isToday ? 'bg-blue-50' : 'bg-white'}
                  ${!day.isCurrentMonth ? 'text-gray-400' : ''}
                  ${day.isSelected ? 'ring-2 ring-kpmg-blue' : ''}
                  ${day.events.length > 0 ? 'hover:bg-gray-50' : ''}
                `}
                onClick={() => {
                  if (day.isCurrentMonth) {
                    handleSelectDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day.day));
                  }
                }}
              >
                <div className="font-medium">{day.day}</div>
                <div className="mt-1 space-y-1">
                  {day.events.map((event, index) => (
                    <div 
                      key={`${event.id}-${index}`} 
                      className="text-xs p-1 rounded truncate flex justify-between items-center"
                      style={{ backgroundColor: event.status === 'Aprovado' ? '#00A3A1' : '#0091DA' }}
                    >
                      <span className="text-white truncate" title={event.title}>
                        {event.title.length > 16 ? `${event.title.substring(0, 14)}...` : event.title}
                      </span>
                      <span className="text-white text-xs ml-1">{event.time.split(' - ')[0]}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SpaceCalendarView;
