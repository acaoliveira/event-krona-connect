
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SpaceFilter from '@/components/calendar/SpaceFilter';
import AvailabilityCalendar from '@/components/calendar/AvailabilityCalendar';

const EventSpaceRequest = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCalendarView, setSelectedCalendarView] = useState<'day' | 'week' | 'month'>('month');
  const [eventData, setEventData] = useState({
    eventName: '',
    eventType: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    desiredSpace: '',
    estimatedAttendees: '',
    responsibleArea: ''
  });

  // Mock data for available spaces
  const availableSpaces = [
    { id: '1', name: 'Auditório Principal', capacity: 200, spaceId: 'auditorio-principal' },
    { id: '2', name: 'Sala de Reuniões A', capacity: 50, spaceId: 'sala-reunioes-a' },
    { id: '3', name: 'Espaço Colaborativo', capacity: 100, spaceId: 'espaco-colaborativo' },
    { id: '4', name: 'Sala de Conferência B', capacity: 80, spaceId: 'sala-reunioes-b' }
  ];

  const handleChange = (field: string, value: string) => {
    setEventData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Check if estimated attendees exceeds space capacity
    const selectedSpace = availableSpaces.find(space => space.id === eventData.desiredSpace);
    if (selectedSpace && parseInt(eventData.estimatedAttendees) > selectedSpace.capacity) {
      toast({
        title: "Aviso",
        description: `O número de participantes excede a capacidade máxima do espaço (${selectedSpace.capacity} pessoas)`,
        variant: "destructive"
      });
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Solicitação enviada",
        description: "Sua solicitação de espaço foi enviada e está em análise",
      });
    }, 1500);
  };

  // Find the space ID for the selected space
  const getSelectedSpaceId = () => {
    const selectedSpace = availableSpaces.find(space => space.id === eventData.desiredSpace);
    return selectedSpace?.spaceId || 'all';
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-kpmg-blue">Solicitar Espaço para Evento</h1>
          <p className="text-gray-600 mt-2">
            Preencha o formulário abaixo para solicitar um espaço para o seu evento na KPMG
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl text-kpmg-blue">Formulário de Solicitação</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="eventName" className="block text-sm font-medium mb-1">Nome do Evento</label>
                    <Input 
                      id="eventName" 
                      value={eventData.eventName} 
                      onChange={(e) => handleChange('eventName', e.target.value)} 
                      required 
                    />
                  </div>

                  <div>
                    <label htmlFor="eventType" className="block text-sm font-medium mb-1">Tipo de Evento</label>
                    <Select 
                      onValueChange={(value) => handleChange('eventType', value)}
                      value={eventData.eventType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de evento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="internal">Interno</SelectItem>
                        <SelectItem value="external">Externo</SelectItem>
                        <SelectItem value="hybrid">Híbrido</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="startDate" className="block text-sm font-medium mb-1">Data de Início</label>
                      <div className="relative">
                        <Input 
                          id="startDate" 
                          type="date" 
                          value={eventData.startDate} 
                          onChange={(e) => handleChange('startDate', e.target.value)} 
                          required 
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="startTime" className="block text-sm font-medium mb-1">Hora de Início</label>
                      <Input 
                        id="startTime" 
                        type="time" 
                        value={eventData.startTime} 
                        onChange={(e) => handleChange('startTime', e.target.value)} 
                        required 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="endDate" className="block text-sm font-medium mb-1">Data de Término</label>
                      <Input 
                        id="endDate" 
                        type="date" 
                        value={eventData.endDate} 
                        onChange={(e) => handleChange('endDate', e.target.value)} 
                        required 
                      />
                    </div>
                    <div>
                      <label htmlFor="endTime" className="block text-sm font-medium mb-1">Hora de Término</label>
                      <Input 
                        id="endTime" 
                        type="time" 
                        value={eventData.endTime} 
                        onChange={(e) => handleChange('endTime', e.target.value)} 
                        required 
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="desiredSpace" className="block text-sm font-medium mb-1">Espaço Desejado</label>
                    <Select 
                      onValueChange={(value) => handleChange('desiredSpace', value)}
                      value={eventData.desiredSpace}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o espaço desejado" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableSpaces.map((space) => (
                          <SelectItem key={space.id} value={space.id}>
                            {space.name} (Capacidade: {space.capacity})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="estimatedAttendees" className="block text-sm font-medium mb-1">Número estimado de participantes</label>
                    <Input 
                      id="estimatedAttendees" 
                      type="number" 
                      value={eventData.estimatedAttendees} 
                      onChange={(e) => handleChange('estimatedAttendees', e.target.value)} 
                      required 
                    />
                  </div>

                  <div>
                    <label htmlFor="responsibleArea" className="block text-sm font-medium mb-1">Área responsável pelo evento</label>
                    <Input 
                      id="responsibleArea" 
                      value={eventData.responsibleArea} 
                      onChange={(e) => handleChange('responsibleArea', e.target.value)} 
                      required 
                    />
                  </div>

                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full bg-kpmg-blue hover:bg-kpmg-lightblue"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="shadow-lg border-0 sticky top-6">
              <CardHeader>
                <CardTitle className="text-xl text-kpmg-blue">Disponibilidade</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs 
                  defaultValue="month" 
                  value={selectedCalendarView}
                  onValueChange={(value) => setSelectedCalendarView(value as 'day' | 'week' | 'month')}
                >
                  <TabsList className="mb-6">
                    <TabsTrigger value="day">Dia</TabsTrigger>
                    <TabsTrigger value="week">Semana</TabsTrigger>
                    <TabsTrigger value="month">Mês</TabsTrigger>
                  </TabsList>
                  
                  {eventData.desiredSpace ? (
                    <>
                      <AvailabilityCalendar 
                        spaceId={getSelectedSpaceId()} 
                        mode={selectedCalendarView} 
                      />
                      <p className="text-xs text-gray-500 mt-4 text-center">
                        Os dados de disponibilidade são atualizados em tempo real. 
                        Selecione o espaço e período desejado para verificar a disponibilidade.
                      </p>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <CalendarIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-500 text-sm mb-2">
                        Selecione um espaço para visualizar o calendário de disponibilidade
                      </p>
                      <p className="text-gray-400 text-xs">
                        O calendário mostrará os dias disponíveis e ocupados para o espaço selecionado
                      </p>
                    </div>
                  )}
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EventSpaceRequest;
