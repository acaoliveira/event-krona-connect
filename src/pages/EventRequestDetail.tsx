
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Check, X } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

const EventRequestDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Event management state (for approved events)
  const [eventManagement, setEventManagement] = useState({
    budget: '5000',
    actualCost: '0',
    coverImage: '',
    registrationStart: '2025-05-01',
    registrationEnd: '2025-05-10',
    releaseToCalendar: false,
    enableEvaluation: false
  });

  // Mock data for the current event request
  const eventRequest = {
    id: id,
    eventName: 'Workshop de Inovação Digital',
    requestDate: '2025-04-15',
    eventDate: '2025-05-15',
    eventTime: '09:00 - 17:00',
    space: 'Auditório Principal',
    requester: 'Ana Silva',
    requesterEmail: 'ana.silva@empresa.com',
    status: 'Em análise',
    eventType: 'Externo',
    estimatedAttendees: 150,
    responsibleArea: 'Departamento de Inovação',
    description: 'Workshop focado em tendências de inovação digital e transformação de negócios para empresas de médio e grande porte.'
  };
  
  // Mock data for participants
  const participants = [
    { id: '1', name: 'João Silva', email: 'joao.silva@empresa.com', registrationDate: '2025-04-20', company: 'Empresa ABC', position: 'Diretor de TI', status: 'Aprovado' },
    { id: '2', name: 'Maria Oliveira', email: 'maria.oliveira@empresa.com', registrationDate: '2025-04-21', company: 'Empresa XYZ', position: 'Gerente de Projetos', status: 'Aprovado' },
    { id: '3', name: 'Pedro Santos', email: 'pedro.santos@empresa.com', registrationDate: '2025-04-22', company: 'Empresa 123', position: 'Analista de Sistemas', status: 'Em análise' }
  ];

  // Mock data for change history
  const changeHistory = [
    { id: '1', user: 'Ana Silva', date: '2025-04-15 14:30', action: 'Criou a solicitação' },
    { id: '2', user: 'Sistema', date: '2025-04-15 14:31', action: 'Notificação enviada para aprovadores' },
    { id: '3', user: 'Carlos Mendes', date: '2025-04-16 09:45', action: 'Visualizou a solicitação' }
  ];

  const handleReject = () => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setShowRejectDialog(false);
      
      toast({
        title: "Solicitação reprovada",
        description: "A solicitação foi reprovada e o solicitante será notificado."
      });
      
      navigate('/dashboard/solicitacoes');
    }, 1000);
  };

  const handleApprove = () => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setShowApproveDialog(false);
      
      toast({
        title: "Solicitação aprovada",
        description: "A solicitação foi aprovada e o solicitante será notificado."
      });
      
      // Instead of navigating away, we'll show the approved tabs
      const mockEvent = { ...eventRequest, status: 'Aprovado' };
      // In a real implementation, we would update the state with the new status
    }, 1000);
  };

  const handleCancel = () => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setShowCancelDialog(false);
      
      toast({
        title: "Solicitação cancelada",
        description: "A solicitação foi cancelada com sucesso."
      });
      
      navigate('/dashboard/solicitacoes');
    }, 1000);
  };

  const handleEventManagementChange = (field: string, value: any) => {
    setEventManagement(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveEventManagement = () => {
    toast({
      title: "Configurações salvas",
      description: "As configurações do evento foram atualizadas com sucesso."
    });
  };

  // Determine if this user can see the event management tabs (event is approved)
  const showManagementTabs = eventRequest.status === 'Aprovado' || true; // Forcing true for demonstration

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-kpmg-blue">{eventRequest.eventName}</h1>
            <div className="flex items-center mt-2 space-x-4">
              <Badge className={`
                ${eventRequest.status === 'Em análise' ? 'bg-amber-500' : ''}
                ${eventRequest.status === 'Aprovado' ? 'bg-green-500' : ''}
                ${eventRequest.status === 'Reprovado' ? 'bg-red-500' : ''}
                ${eventRequest.status === 'Cancelado' ? 'bg-gray-500' : ''}
              `}>
                {eventRequest.status}
              </Badge>
              <span className="text-gray-600 text-sm">
                Solicitado em {new Date(eventRequest.requestDate).toLocaleDateString('pt-BR')}
              </span>
            </div>
          </div>

          <div className="flex space-x-2">
            {eventRequest.status === 'Em análise' && (
              <>
                <Button 
                  variant="outline" 
                  className="border-red-200 text-red-600 hover:bg-red-50"
                  onClick={() => setShowRejectDialog(true)}
                >
                  <X className="h-4 w-4 mr-2" /> Reprovar
                </Button>
                <Button 
                  variant="outline" 
                  className="border-green-200 text-green-600 hover:bg-green-50"
                  onClick={() => setShowApproveDialog(true)}
                >
                  <Check className="h-4 w-4 mr-2" /> Aprovar
                </Button>
              </>
            )}
            {(eventRequest.status === 'Em análise' || eventRequest.status === 'Aprovado') && (
              <Button 
                variant="outline" 
                className="border-gray-200 text-gray-600 hover:bg-gray-50"
                onClick={() => setShowCancelDialog(true)}
              >
                Cancelar
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="details">
          <TabsList className="mb-6">
            <TabsTrigger value="details">Detalhes da Solicitação</TabsTrigger>
            {showManagementTabs && (
              <>
                <TabsTrigger value="management">Gestão do Evento</TabsTrigger>
                <TabsTrigger value="participants">Participantes</TabsTrigger>
                <TabsTrigger value="history">Histórico</TabsTrigger>
              </>
            )}
          </TabsList>
          
          {/* Details Tab */}
          <TabsContent value="details">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Informações do Evento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">Nome do Evento</h3>
                    <p>{eventRequest.eventName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">Tipo de Evento</h3>
                    <p>{eventRequest.eventType}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">Data do Evento</h3>
                    <p>{new Date(eventRequest.eventDate).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">Horário</h3>
                    <p>{eventRequest.eventTime}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">Espaço Solicitado</h3>
                    <p>{eventRequest.space}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">Estimativa de Participantes</h3>
                    <p>{eventRequest.estimatedAttendees}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">Área Responsável</h3>
                    <p>{eventRequest.responsibleArea}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-1">Solicitante</h3>
                    <p>{eventRequest.requester} ({eventRequest.requesterEmail})</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">Descrição</h3>
                  <p className="text-gray-600">{eventRequest.description}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Event Management Tab */}
          <TabsContent value="management">
            <Card className="border-0 shadow-md mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Gestão Financeira</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="budget" className="text-sm font-medium mb-1 block">Orçamento Planejado (R$)</label>
                    <Input 
                      id="budget" 
                      value={eventManagement.budget} 
                      onChange={(e) => handleEventManagementChange('budget', e.target.value)} 
                    />
                  </div>
                  <div>
                    <label htmlFor="actualCost" className="text-sm font-medium mb-1 block">Custo Realizado (R$)</label>
                    <Input 
                      id="actualCost" 
                      value={eventManagement.actualCost} 
                      onChange={(e) => handleEventManagementChange('actualCost', e.target.value)} 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Configuração da Inscrição</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="registrationStart" className="text-sm font-medium mb-1 block">Data de Início das Inscrições</label>
                    <Input 
                      id="registrationStart" 
                      type="date"
                      value={eventManagement.registrationStart} 
                      onChange={(e) => handleEventManagementChange('registrationStart', e.target.value)} 
                    />
                  </div>
                  <div>
                    <label htmlFor="registrationEnd" className="text-sm font-medium mb-1 block">Data de Término das Inscrições</label>
                    <Input 
                      id="registrationEnd" 
                      type="date"
                      value={eventManagement.registrationEnd} 
                      onChange={(e) => handleEventManagementChange('registrationEnd', e.target.value)} 
                    />
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-gray-50">
                  <h3 className="text-sm font-semibold mb-3">Campos da ficha de inscrição</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Nome completo</label>
                      <Badge>Obrigatório</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm">E-mail</label>
                      <Badge>Obrigatório</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Empresa</label>
                      <Badge className="bg-gray-500">Opcional</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Cargo</label>
                      <Badge className="bg-gray-500">Opcional</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Telefone</label>
                      <Badge className="bg-gray-500">Opcional</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Liberar no Calendário Oficial</p>
                    <p className="text-sm text-gray-500">O evento ficará visível no calendário público da aplicação</p>
                  </div>
                  <Switch 
                    checked={eventManagement.releaseToCalendar} 
                    onCheckedChange={(checked) => handleEventManagementChange('releaseToCalendar', checked)} 
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Habilitar Avaliação do Evento</p>
                    <p className="text-sm text-gray-500">Participantes poderão avaliar o evento após sua conclusão</p>
                  </div>
                  <Switch 
                    checked={eventManagement.enableEvaluation} 
                    onCheckedChange={(checked) => handleEventManagementChange('enableEvaluation', checked)} 
                  />
                </div>

                <div className="pt-4">
                  <Button className="bg-kpmg-blue hover:bg-kpmg-lightblue" onClick={handleSaveEventManagement}>
                    Salvar Configurações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Participants Tab */}
          <TabsContent value="participants">
            <Card className="border-0 shadow-md">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Lista de Participantes</CardTitle>
                <Button variant="outline" size="sm">
                  Exportar Excel
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>E-mail</TableHead>
                      <TableHead>Data de Inscrição</TableHead>
                      <TableHead>Empresa</TableHead>
                      <TableHead>Cargo</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {participants.map((participant) => (
                      <TableRow key={participant.id}>
                        <TableCell className="font-medium">{participant.name}</TableCell>
                        <TableCell>{participant.email}</TableCell>
                        <TableCell>{new Date(participant.registrationDate).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>{participant.company}</TableCell>
                        <TableCell>{participant.position}</TableCell>
                        <TableCell>
                          <Badge className={`
                            ${participant.status === 'Aprovado' ? 'bg-green-500' : ''}
                            ${participant.status === 'Em análise' ? 'bg-amber-500' : ''}
                          `}>
                            {participant.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            Visualizar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Histórico de Alterações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {changeHistory.map((change) => (
                    <div key={change.id} className="flex">
                      <div className="mr-4 relative">
                        <div className="h-2 w-2 rounded-full bg-kpmg-blue mt-2"></div>
                        {change.id !== changeHistory[changeHistory.length - 1].id && (
                          <div className="absolute top-3 bottom-0 left-1 -ml-px w-0.5 bg-gray-200"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="text-sm font-medium">{change.action}</div>
                        <div className="text-xs text-gray-500">
                          {change.user} • {change.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Reject Dialog */}
        <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reprovar solicitação</DialogTitle>
              <DialogDescription>
                Informe o motivo da reprovação da solicitação. Este motivo será enviado ao solicitante.
              </DialogDescription>
            </DialogHeader>
            <Textarea 
              placeholder="Motivo da reprovação" 
              value={rejectReason} 
              onChange={(e) => setRejectReason(e.target.value)}
              className="min-h-[100px]"
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowRejectDialog(false)} disabled={isSubmitting}>
                Cancelar
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleReject} 
                disabled={isSubmitting || !rejectReason.trim()}
              >
                {isSubmitting ? 'Reprovando...' : 'Confirmar Reprovação'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Approve Dialog */}
        <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Aprovar solicitação</DialogTitle>
              <DialogDescription>
                Tem certeza que deseja aprovar esta solicitação de evento?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowApproveDialog(false)} disabled={isSubmitting}>
                Cancelar
              </Button>
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={handleApprove} 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Aprovando...' : 'Confirmar Aprovação'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Cancel Dialog */}
        <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cancelar solicitação</DialogTitle>
              <DialogDescription>
                Deseja realmente cancelar esta solicitação de evento? Essa ação é irreversível.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCancelDialog(false)} disabled={isSubmitting}>
                Não
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleCancel} 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Cancelando...' : 'Sim'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default EventRequestDetail;
