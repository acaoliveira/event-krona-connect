
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { format, addDays, parse, isSameDay } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface AvailabilityCalendarProps {
  spaceId: string;
  mode: 'day' | 'week' | 'month';
}

interface BookingEvent {
  date: Date;
  timeSlots: string[];
  status: 'available' | 'partially-booked' | 'fully-booked';
}

const AvailabilityCalendar = ({ spaceId, mode }: AvailabilityCalendarProps) => {
  const [date, setDate] = useState<Date>(new Date());
  
  // Simulated data based on space ID
  const generateMockBookings = (space: string): BookingEvent[] => {
    const today = new Date();
    const bookings: BookingEvent[] = [];
    
    // Generate random bookings for the next 30 days
    for (let i = 0; i < 30; i++) {
      const currentDate = addDays(today, i);
      
      // Different booking patterns based on space
      if (space === 'auditorio-principal') {
        if (i % 3 === 0) {
          bookings.push({
            date: currentDate,
            timeSlots: ['09:00-12:00', '14:00-17:00'],
            status: 'fully-booked'
          });
        } else if (i % 5 === 0) {
          bookings.push({
            date: currentDate,
            timeSlots: ['14:00-17:00'],
            status: 'partially-booked'
          });
        }
      } else if (space === 'sala-reunioes-a' || space === 'sala-reunioes-b') {
        if (i % 2 === 0) {
          bookings.push({
            date: currentDate,
            timeSlots: ['09:00-12:00'],
            status: 'partially-booked'
          });
        } else if (i % 7 === 0) {
          bookings.push({
            date: currentDate,
            timeSlots: ['09:00-12:00', '14:00-17:00', '18:00-20:00'],
            status: 'fully-booked'
          });
        }
      } else if (space !== 'all') { // Other spaces
        if (i % 4 === 0) {
          bookings.push({
            date: currentDate,
            timeSlots: ['14:00-17:00'],
            status: 'partially-booked'
          });
        }
      }
    }
    
    return bookings;
  };
  
  const bookings = generateMockBookings(spaceId);
  
  // Function to determine the day's status
  const getDayStatus = (day: Date) => {
    const booking = bookings.find(b => isSameDay(b.date, day));
    return booking?.status || 'available';
  };

  // Display different view based on mode
  if (mode === 'day') {
    const dayBooking = bookings.find(b => isSameDay(b.date, date));
    const timeSlots = [
      '08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00', 
      '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00',
      '17:00-18:00', '18:00-19:00', '19:00-20:00'
    ];
    
    return (
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <h3 className="font-medium mb-4">
            Disponibilidade para {format(date, 'dd/MM/yyyy')}
          </h3>
          <div className="space-y-2">
            {timeSlots.map((slot) => {
              const isBooked = dayBooking?.timeSlots.some(bookedSlot => {
                const [bookedStart] = bookedSlot.split('-');
                const [slotStart] = slot.split('-');
                return bookedStart === slotStart;
              });
              
              return (
                <div 
                  key={slot} 
                  className={`p-2 rounded flex justify-between ${
                    isBooked 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  <span>{slot}</span>
                  <Badge 
                    variant={isBooked ? "destructive" : "outline"}
                    className={isBooked ? "bg-red-500" : "bg-green-500 text-white"}
                  >
                    {isBooked ? 'Ocupado' : 'Disponível'}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (mode === 'week') {
    const startOfWeek = date;
    const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startOfWeek, i));
    
    return (
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <h3 className="font-medium mb-4">
            Semana de {format(startOfWeek, 'dd/MM')} até {format(addDays(startOfWeek, 6), 'dd/MM')}
          </h3>
          <div className="grid grid-cols-7 gap-1">
            {weekDays.map((day, index) => {
              const status = getDayStatus(day);
              let bgColor = "bg-green-100";
              let textColor = "text-green-800";
              
              if (status === 'partially-booked') {
                bgColor = "bg-amber-100";
                textColor = "text-amber-800";
              } else if (status === 'fully-booked') {
                bgColor = "bg-red-100";
                textColor = "text-red-800";
              }
              
              return (
                <div key={index} className="text-center p-2">
                  <div className="font-medium">{format(day, 'EEE')}</div>
                  <div className="text-sm">{format(day, 'dd')}</div>
                  <div 
                    className={`mt-2 rounded-full w-4 h-4 mx-auto ${bgColor}`} 
                    title={status === 'available' 
                      ? 'Disponível' 
                      : status === 'partially-booked' 
                        ? 'Parcialmente ocupado' 
                        : 'Totalmente ocupado'
                    }
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-md">
      <CardContent className="p-6">
        <h3 className="font-medium mb-4">Disponibilidade - {spaceId !== 'all' ? spaceId : 'Todos os espaços'}</h3>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => date && setDate(date)}
          className="p-0 pointer-events-auto"
          modifiers={{
            booked: (date) => {
              const status = getDayStatus(date);
              return status === 'fully-booked';
            },
            partiallyBooked: (date) => {
              const status = getDayStatus(date);
              return status === 'partially-booked';
            }
          }}
          modifiersClassNames={{
            booked: 'bg-red-100 text-red-900 font-bold',
            partiallyBooked: 'bg-amber-100 text-amber-900'
          }}
          components={{
            DayContent: (props) => {
              const date = props.date;
              const status = getDayStatus(date);
              
              return (
                <div className="flex flex-col items-center justify-center w-full h-full">
                  <div>{props.date.getDate()}</div>
                  {status !== 'available' && (
                    <div 
                      className={cn(
                        "w-2 h-2 rounded-full mt-1",
                        status === 'partially-booked' ? "bg-amber-500" : "bg-red-500"
                      )} 
                    />
                  )}
                </div>
              );
            }
          }}
        />
        <div className="flex justify-center mt-4 space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
            <span>Disponível</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-amber-500 mr-1"></div>
            <span>Parcialmente ocupado</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
            <span>Totalmente ocupado</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailabilityCalendar;
