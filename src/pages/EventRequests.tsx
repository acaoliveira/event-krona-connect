
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Edit, Trash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface EventRequest {
  id: string;
  eventName: string;
  requestDate: string;
  eventDate: string;
  space: string;
  requester: string;
  status: 'Em análise' | 'Aprovado' | 'Reprovado' | 'Cancelado';
}

const EventRequests = () => {
  const { toast } = useToast();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    status: '',
    requestDate: '',
    eventDate: '',
    eventType: '',
    space: '',
  });

  // Mock data for event requests
  const eventRequests: EventRequest[] = [
    {
      id: '1',
      eventName: 'Workshop de Inovação Digital',
      requestDate: '2025-04-15',
      eventDate: '2025-05-15',
      space: 'Auditório Principal',
      requester: 'Ana Silva',
      status: 'Em análise',
    },
    {
      id: '2',
      eventName: 'Seminário Fiscal',
      requestDate: '2025-04-10',
      eventDate: '2025-05-20',
      space: 'Sala de Reuniões A',
      requester: 'Carlos Mendes',
      status: 'Aprovado',
    },
    {
      id: '3',
      eventName: 'Fórum ESG',
      requestDate: '2025-04-05',
      eventDate: '2025-06-05',
      space: 'Espaço Colaborativo',
      requester: 'Patricia Lopes',
      status: 'Reprovado',
    },
    {
      id: '4',
      eventName: 'Conferência de Auditoria',
      requestDate: '2025-04-01',
      eventDate: '2025-06-15',
      space: 'Auditório Principal',
      requester: 'Ricardo Gomes',
      status: 'Cancelado',
    },
  ];

  const handleFilterChange = (key: string, value: string) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  const filteredRequests = eventRequests.filter((request) => {
    return (
      (filters.status ? request.status === filters.status : true) &&
      (filters.requestDate ? request.requestDate === filters.requestDate : true) &&
      (filters.eventDate ? request.eventDate === filters.eventDate : true) &&
      (filters.space ? request.space.includes(filters.space) : true)
    );
  });

  const handleCancelConfirm = () => {
    if (selectedRequestId) {
      toast({
        title: "Solicitação cancelada",
        description: "A solicitação do evento foi cancelada com sucesso.",
      });
    }
    setShowDeleteDialog(false);
  };

  const handleCancelRequest = (id: string) => {
    setSelectedRequestId(id);
    setShowDeleteDialog(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Em análise':
        return <Badge className="bg-amber-500">Em análise</Badge>;
      case 'Aprovado':
        return <Badge className="bg-green-500">Aprovado</Badge>;
      case 'Reprovado':
        return <Badge className="bg-red-500">Reprovado</Badge>;
      case 'Cancelado':
        return <Badge className="bg-gray-500">Cancelado</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-kpmg-blue mb-2">Solicitações de Eventos</h1>
          <p className="text-gray-600">
            Gerencie todas as suas solicitações de espaços para eventos
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6 border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <Select onValueChange={(value) => handleFilterChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos os status</SelectItem>
                    <SelectItem value="Em análise">Em análise</SelectItem>
                    <SelectItem value="Aprovado">Aprovado</SelectItem>
                    <SelectItem value="Reprovado">Reprovado</SelectItem>
                    <SelectItem value="Cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex items-center relative">
                  <Input
                    type="date"
                    placeholder="Data da Solicitação"
                    onChange={(e) => handleFilterChange('requestDate', e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center relative">
                  <Input
                    type="date"
                    placeholder="Data do Evento"
                    onChange={(e) => handleFilterChange('eventDate', e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <Select onValueChange={(value) => handleFilterChange('eventType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de Evento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos os tipos</SelectItem>
                    <SelectItem value="interno">Interno</SelectItem>
                    <SelectItem value="externo">Externo</SelectItem>
                    <SelectItem value="híbrido">Híbrido</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select onValueChange={(value) => handleFilterChange('space', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Espaço" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos os espaços</SelectItem>
                    <SelectItem value="Auditório Principal">Auditório Principal</SelectItem>
                    <SelectItem value="Sala de Reuniões A">Sala de Reuniões A</SelectItem>
                    <SelectItem value="Espaço Colaborativo">Espaço Colaborativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Requests Table */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome do Evento</TableHead>
                    <TableHead>Data da Solicitação</TableHead>
                    <TableHead>Data do Evento</TableHead>
                    <TableHead>Espaço</TableHead>
                    <TableHead>Solicitante</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.length > 0 ? (
                    filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.eventName}</TableCell>
                        <TableCell>{new Date(request.requestDate).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>{new Date(request.eventDate).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>{request.space}</TableCell>
                        <TableCell>{request.requester}</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Link to={`/dashboard/solicitacoes/${request.id}`}>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-1" />
                                Visualizar
                              </Button>
                            </Link>
                            
                            {(request.status === 'Em análise' || request.status === 'Aprovado') && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-red-500 border-red-200 hover:bg-red-50"
                                onClick={() => handleCancelRequest(request.id)}
                              >
                                <Trash className="h-4 w-4 mr-1" />
                                Cancelar
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                        Nenhuma solicitação encontrada com os filtros selecionados
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Cancel Confirmation Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar cancelamento</DialogTitle>
              <DialogDescription>
                Deseja realmente cancelar esta solicitação de evento? Essa ação é irreversível.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                Não
              </Button>
              <Button variant="destructive" onClick={handleCancelConfirm}>
                Sim
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default EventRequests;
