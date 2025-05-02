
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarIcon, ImagePlus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SpaceFilter from '@/components/calendar/SpaceFilter';
import AvailabilityCalendar from '@/components/calendar/AvailabilityCalendar';
import { Separator } from '@/components/ui/separator';

const EventSpaceRequest = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCalendarView, setSelectedCalendarView] = useState<'day' | 'week' | 'month'>('month');
  const [activeTab, setActiveTab] = useState('informacoesBasicas');
  const [eventImage, setEventImage] = useState<string | null>(null);
  const [eventData, setEventData] = useState({
    eventName: '',
    eventType: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    desiredSpace: '',
    estimatedAttendees: '',
    responsibleArea: '',
    eventImage: '',
    eventDescription: '',
    eventCategory: '',
    eventTopic: '',
    organizerName: '',
    organizerPhone: '',
    organizerEmail: '',
    needsAudioVisual: '',
    needsCatering: '',
    additionalRequests: ''
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setEventImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
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
                  {/* Moved Espaço Desejado to the top with enhanced styling */}
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <label htmlFor="desiredSpace" className="block text-lg font-medium text-kpmg-blue mb-2">Espaço Desejado</label>
                    <Select 
                      onValueChange={(value) => handleChange('desiredSpace', value)}
                      value={eventData.desiredSpace}
                    >
                      <SelectTrigger className="text-base">
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
                    <p className="text-sm text-blue-600 mt-2">
                      Selecione primeiro o espaço para verificar a disponibilidade no calendário
                    </p>
                  </div>

                  <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
                    <TabsList className="mb-6">
                      <TabsTrigger value="informacoesBasicas">1. Informações básicas</TabsTrigger>
                      <TabsTrigger value="dataHorario">2. Data e horário</TabsTrigger>
                      <TabsTrigger value="descricaoEvento">3. Descrição do evento</TabsTrigger>
                    </TabsList>
                    
                    {/* Tab 1: Informações Básicas */}
                    <TabsContent value="informacoesBasicas" className="space-y-6">
                      <div>
                        <label htmlFor="eventName" className="block text-sm font-medium mb-1">Nome do Evento*</label>
                        <Input 
                          id="eventName" 
                          value={eventData.eventName} 
                          onChange={(e) => handleChange('eventName', e.target.value)} 
                          required 
                          placeholder="Insira o nome do seu evento"
                        />
                        <p className="text-xs text-gray-500 mt-1">100 caracteres restantes</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Imagem de divulgação (opcional)</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                          {eventImage ? (
                            <div className="w-full">
                              <img 
                                src={eventImage} 
                                alt="Preview" 
                                className="max-h-48 mx-auto object-contain"
                              />
                              <Button 
                                variant="outline" 
                                className="mt-4 w-full" 
                                onClick={() => setEventImage(null)}
                              >
                                Remover imagem
                              </Button>
                            </div>
                          ) : (
                            <>
                              <ImagePlus className="h-12 w-12 text-gray-400" />
                              <p className="mt-2 text-sm text-gray-600">Clique ou arraste a imagem aqui</p>
                              <p className="text-xs text-gray-500 mt-1">
                                A dimensão recomendada é de 1600 x 838 <br />
                                Formato JPG, GIF ou PNG de no máximo 2MB
                              </p>
                              <Input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                id="imageUpload" 
                                onChange={handleImageUpload} 
                              />
                              <Button 
                                variant="outline" 
                                className="mt-4" 
                                onClick={() => document.getElementById('imageUpload')?.click()}
                              >
                                Selecionar imagem
                              </Button>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Assunto*</label>
                          <Select 
                            onValueChange={(value) => handleChange('eventTopic', value)}
                            value={eventData.eventTopic}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um assunto" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="financas">Finanças</SelectItem>
                              <SelectItem value="tecnologia">Tecnologia</SelectItem>
                              <SelectItem value="auditoria">Auditoria</SelectItem>
                              <SelectItem value="impostos">Impostos</SelectItem>
                              <SelectItem value="consultoria">Consultoria</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Categoria (opcional)</label>
                          <Select 
                            onValueChange={(value) => handleChange('eventCategory', value)}
                            value={eventData.eventCategory}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma categoria" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="treinamento">Treinamento</SelectItem>
                              <SelectItem value="conferencia">Conferência</SelectItem>
                              <SelectItem value="workshop">Workshop</SelectItem>
                              <SelectItem value="feira">Feira</SelectItem>
                              <SelectItem value="seminario">Seminário</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="eventType" className="block text-sm font-medium mb-1">Tipo de Evento*</label>
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

                      <div>
                        <label htmlFor="estimatedAttendees" className="block text-sm font-medium mb-1">Número estimado de participantes*</label>
                        <Input 
                          id="estimatedAttendees" 
                          type="number" 
                          value={eventData.estimatedAttendees} 
                          onChange={(e) => handleChange('estimatedAttendees', e.target.value)} 
                          required 
                        />
                      </div>

                      <div>
                        <label htmlFor="responsibleArea" className="block text-sm font-medium mb-1">Área responsável pelo evento*</label>
                        <Input 
                          id="responsibleArea" 
                          value={eventData.responsibleArea} 
                          onChange={(e) => handleChange('responsibleArea', e.target.value)} 
                          required 
                        />
                      </div>
                      
                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-3">Informações do organizador</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Nome do organizador*</label>
                            <Input 
                              value={eventData.organizerName} 
                              onChange={(e) => handleChange('organizerName', e.target.value)} 
                              required 
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Telefone*</label>
                              <Input 
                                value={eventData.organizerPhone} 
                                onChange={(e) => handleChange('organizerPhone', e.target.value)} 
                                required 
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium mb-1">Email*</label>
                              <Input 
                                type="email"
                                value={eventData.organizerEmail} 
                                onChange={(e) => handleChange('organizerEmail', e.target.value)} 
                                required 
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button 
                          type="button" 
                          onClick={() => setActiveTab('dataHorario')}
                        >
                          Próximo
                        </Button>
                      </div>
                    </TabsContent>
                    
                    {/* Tab 2: Data e horário */}
                    <TabsContent value="dataHorario" className="space-y-6">
                      <div className="space-y-2">
                        <h4 className="font-medium">Informe aos participantes quando seu evento vai acontecer</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="startDate" className="block text-sm font-medium mb-1">Data de Início*</label>
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
                            <label htmlFor="startTime" className="block text-sm font-medium mb-1">Hora de Início*</label>
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
                            <label htmlFor="endDate" className="block text-sm font-medium mb-1">Data de Término*</label>
                            <Input 
                              id="endDate" 
                              type="date" 
                              value={eventData.endDate} 
                              onChange={(e) => handleChange('endDate', e.target.value)} 
                              required 
                            />
                          </div>
                          <div>
                            <label htmlFor="endTime" className="block text-sm font-medium mb-1">Hora de Término*</label>
                            <Input 
                              id="endTime" 
                              type="time" 
                              value={eventData.endTime} 
                              onChange={(e) => handleChange('endTime', e.target.value)} 
                              required 
                            />
                          </div>
                        </div>
                      </div>
                      
                      {eventData.startDate && eventData.endDate && (
                        <p className="text-sm text-blue-600">
                          Seu evento vai durar {
                            Math.ceil((new Date(eventData.endDate).getTime() - new Date(eventData.startDate).getTime()) / (1000 * 60 * 60 * 24))
                          } dias
                        </p>
                      )}
                      
                      <div className="flex justify-between">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setActiveTab('informacoesBasicas')}
                        >
                          Anterior
                        </Button>
                        <Button 
                          type="button" 
                          onClick={() => setActiveTab('descricaoEvento')}
                        >
                          Próximo
                        </Button>
                      </div>
                    </TabsContent>
                    
                    {/* Tab 3: Descrição do evento */}
                    <TabsContent value="descricaoEvento" className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-2">Descrição do evento</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          Conte todos os detalhes do seu evento, como a programação e os diferenciais da sua produção!
                        </p>
                        <Textarea 
                          value={eventData.eventDescription}
                          onChange={(e) => handleChange('eventDescription', e.target.value)}
                          placeholder="Adicione aqui a descrição do seu evento..."
                          className="min-h-[200px]"
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-medium">Recursos adicionais</h4>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Equipamento audiovisual</label>
                          <Select 
                            onValueChange={(value) => handleChange('needsAudioVisual', value)}
                            value={eventData.needsAudioVisual}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Necessita equipamento audiovisual?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sim">Sim</SelectItem>
                              <SelectItem value="nao">Não</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Serviço de alimentação</label>
                          <Select 
                            onValueChange={(value) => handleChange('needsCatering', value)}
                            value={eventData.needsCatering}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Necessita serviço de alimentação?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sim">Sim</SelectItem>
                              <SelectItem value="nao">Não</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Solicitações adicionais</label>
                          <Textarea 
                            value={eventData.additionalRequests}
                            onChange={(e) => handleChange('additionalRequests', e.target.value)}
                            placeholder="Informe aqui quaisquer solicitações adicionais para o seu evento..."
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setActiveTab('dataHorario')}
                        >
                          Anterior
                        </Button>
                        <Button 
                          type="submit" 
                          className="bg-kpmg-blue hover:bg-kpmg-lightblue"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
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
