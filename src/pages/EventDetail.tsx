import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { CalendarIcon, MapPin, Users, Clock } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const EventDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    foodPreference: ''
  });
  
  // Sample event data
  const event = {
    id,
    title: 'Workshop de Inovação Digital',
    date: '2025-05-15',
    time: '09:00 - 17:00',
    location: 'KPMG São Paulo - Auditório Principal',
    address: 'Rua Arquiteto Olavo Redig de Campos, 105 - Vila São Francisco, São Paulo',
    category: 'Workshop',
    audience: 'Externo',
    registrationOpen: true,
    maxAttendees: 150,
    currentAttendees: 80,
    description: 'Workshop sobre inovação digital e transformação de negócios para empresas de médio e grande porte. Aprenda sobre as últimas tendências de mercado e como implementá-las em sua empresa.',
    detailedDescription: `
      <p>O Workshop de Inovação Digital é um evento imersivo de um dia inteiro onde especialistas da KPMG compartilharão insights sobre:</p>
      <ul>
        <li>Transformação digital em empresas tradicionais</li>
        <li>Implementação de cultura de inovação</li>
        <li>Tecnologias emergentes e seus impactos nos negócios</li>
        <li>Modelos de negócio disruptivos</li>
      </ul>
      <p>Este workshop é ideal para executivos, gestores e profissionais que buscam implementar inovação em suas organizações.</p>
    `,
    agenda: [
      { time: '08:30 - 09:00', activity: 'Credenciamento e café de boas-vindas' },
      { time: '09:00 - 10:30', activity: 'Palestra: Cenário atual da transformação digital' },
      { time: '10:30 - 10:45', activity: 'Intervalo' },
      { time: '10:45 - 12:15', activity: 'Workshop prático: Identificando oportunidades de inovação' },
      { time: '12:15 - 13:30', activity: 'Almoço' },
      { time: '13:30 - 15:00', activity: 'Painel de discussão: Cases de sucesso' },
      { time: '15:00 - 15:15', activity: 'Intervalo' },
      { time: '15:15 - 16:45', activity: 'Workshop prático: Plano de ação para implementação' },
      { time: '16:45 - 17:00', activity: 'Encerramento' }
    ],
    speakers: [
      {
        name: 'Carlos Mendes',
        position: 'Diretor de Inovação, KPMG Brasil',
        bio: 'Especialista em transformação digital com mais de 15 anos de experiência na área.'
      },
      {
        name: 'Ana Ferreira',
        position: 'Sócia de Tecnologia, KPMG Brasil',
        bio: 'Consultora em estratégias de inovação para grandes empresas.'
      }
    ],
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  };

  const handleChange = (field: string, value: string) => {
    setRegistrationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowRegisterDialog(false);
      
      toast({
        title: "Inscrição realizada",
        description: "Sua inscrição foi recebida e será analisada. Você receberá uma confirmação por e-mail.",
      });
    }, 1500);
  };
  
  // Check if form is valid
  const isFormValid = () => {
    return (
      registrationData.name.trim() !== '' &&
      registrationData.email.trim() !== '' &&
      acceptTerms
    );
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Hero section with image */}
            <div className="rounded-lg overflow-hidden shadow-md mb-6">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-64 object-cover"
              />
            </div>
            
            {/* Event header */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge>{event.category}</Badge>
                <Badge variant="outline">{event.audience}</Badge>
              </div>
              <h1 className="text-3xl font-bold text-kpmg-blue mb-4">{event.title}</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-5 w-5 text-gray-500" />
                  <span>{new Date(event.date).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-gray-500" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-gray-500" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-gray-500" />
                  <span>{event.currentAttendees} / {event.maxAttendees} participantes</span>
                </div>
              </div>
              
              <p className="text-gray-700">{event.description}</p>
            </div>
            
            <Card className="mb-6 border-0 shadow-md">
              <CardHeader>
                <CardTitle>Sobre o Evento</CardTitle>
              </CardHeader>
              <CardContent>
                <div dangerouslySetInnerHTML={{ __html: event.detailedDescription }} className="prose max-w-none" />
              </CardContent>
            </Card>
            
            <Card className="mb-6 border-0 shadow-md">
              <CardHeader>
                <CardTitle>Agenda</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {event.agenda.map((item, index) => (
                    <div key={index} className={`flex items-start py-2 ${index !== 0 ? 'border-t border-gray-200' : ''}`}>
                      <div className="w-28 font-medium text-gray-700">{item.time}</div>
                      <div>{item.activity}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="mb-6 border-0 shadow-md">
              <CardHeader>
                <CardTitle>Palestrantes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {event.speakers.map((speaker, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                        <span className="text-xl font-bold text-gray-500">{speaker.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h3 className="font-medium">{speaker.name}</h3>
                        <p className="text-sm text-gray-500">{speaker.position}</p>
                        <p className="text-sm mt-1">{speaker.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Localização</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{event.address}</p>
                <div className="bg-gray-200 h-64 rounded-md flex items-center justify-center">
                  <p className="text-gray-500">Mapa será exibido aqui</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <Card className="border-0 shadow-md mb-6">
                <CardHeader>
                  <CardTitle>Inscrição</CardTitle>
                  {event.registrationOpen ? (
                    <CardDescription>
                      As inscrições estão abertas
                    </CardDescription>
                  ) : (
                    <CardDescription className="text-red-600">
                      Inscrições encerradas
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Vagas Disponíveis:</span>
                      <span className="font-medium">{event.maxAttendees - event.currentAttendees}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div 
                        className="bg-kpmg-blue h-2.5 rounded-full" 
                        style={{ width: `${(event.currentAttendees / event.maxAttendees) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600">
                      {event.currentAttendees} de {event.maxAttendees} participantes inscritos
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-kpmg-blue hover:bg-kpmg-lightblue"
                    disabled={!event.registrationOpen}
                    onClick={() => setShowRegisterDialog(true)}
                  >
                    {event.registrationOpen ? 'Realizar Inscrição' : 'Inscrições Encerradas'}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Dialog */}
      <Dialog open={showRegisterDialog} onOpenChange={setShowRegisterDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Inscrição para o Evento</DialogTitle>
            <DialogDescription>
              Preencha o formulário abaixo para se inscrever no evento. Todos os campos marcados com * são obrigatórios.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right text-sm font-medium">
                  Nome Completo *
                </label>
                <Input
                  id="name"
                  className="col-span-3"
                  value={registrationData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="email" className="text-right text-sm font-medium">
                  E-mail *
                </label>
                <Input
                  id="email"
                  type="email"
                  className="col-span-3"
                  value={registrationData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="phone" className="text-right text-sm font-medium">
                  Telefone
                </label>
                <Input
                  id="phone"
                  className="col-span-3"
                  value={registrationData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="company" className="text-right text-sm font-medium">
                  Empresa
                </label>
                <Input
                  id="company"
                  className="col-span-3"
                  value={registrationData.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="position" className="text-right text-sm font-medium">
                  Cargo
                </label>
                <Input
                  id="position"
                  className="col-span-3"
                  value={registrationData.position}
                  onChange={(e) => handleChange('position', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="foodPreference" className="text-right text-sm font-medium">
                  Preferência Alimentar
                </label>
                <Textarea
                  id="foodPreference"
                  className="col-span-3"
                  value={registrationData.foodPreference}
                  onChange={(e) => handleChange('foodPreference', e.target.value)}
                  placeholder="Informe restrições alimentares ou preferências"
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={acceptTerms} 
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)} 
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Aceito os termos de uso e política de privacidade *
                </label>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowRegisterDialog(false)} disabled={isSubmitting}>
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className="bg-kpmg-blue hover:bg-kpmg-lightblue" 
                disabled={isSubmitting || !isFormValid()}
              >
                {isSubmitting ? "Enviando..." : "Inscrever-me"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default EventDetail;
