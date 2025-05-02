
import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, Edit, Trash2, Eye } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from '@/components/ui/use-toast';

// Mock data for event requests
const mockRequests = [
  {
    id: '1',
    title: 'Workshop de Inovação Digital',
    requestDate: '2025-04-05',
    eventDate: '2025-05-15',
    space: 'Auditório São Paulo',
    requester: 'Maria Silva',
    status: 'Em análise',
  },
  {
    id: '2',
    title: 'Seminário Fiscal e Tributário',
    requestDate: '2025-04-10',
    eventDate: '2025-05-20',
    space: 'Sala Rio de Janeiro',
    requester: 'João Pereira',
    status: 'Aprovado',
  },
  {
    id: '3',
    title: 'Fórum ESG e Sustentabilidade',
    requestDate: '2025-04-15',
    eventDate: '2025-06-05',
    space: 'Auditório Belo Horizonte',
    requester: 'Ana Souza',
    status: 'Reprovado',
  },
  {
    id: '4',
    title: 'Conferência de Auditoria e Compliance',
    requestDate: '2025-04-20',
    eventDate: '2025-06-15',
    space: 'Auditório São Paulo',
    requester: 'Carlos Santos',
    status: 'Aprovado',
  },
  {
    id: '5',
    title: 'Curso de Gestão de Riscos',
    requestDate: '2025-04-25',
    eventDate: '2025-06-25',
    space: 'Sala de Treinamento',
    requester: 'Pedro Almeida',
    status: 'Cancelado',
  },
];

const EventRequests = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    requestDate: '',
    eventDate: '',
    eventType: '',
    space: '',
  });
  
  const [cancelRequestId, setCancelRequestId] = useState<string | null>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const handleFilterChange = (key: string, value: string) => {
    setFilters({
      ...filters,
      [key]: value
    });
  };

  const handleCancelRequest = (id: string) => {
    setCancelRequestId(id);
    setShowCancelDialog(true);
  };

  const confirmCancelRequest = () => {
    // In a real app, you would make an API call here
    toast({
      title: "Solicitação cancelada",
      description: "A solicitação foi cancelada com sucesso."
    });
    setShowCancelDialog(false);
  };

  const filteredRequests = mockRequests.filter(request => {
    // Apply search term filter
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        request.requester.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply dropdown filters (only if they are set)
    const matchesStatus = filters.status ? request.status === filters.status : true;
    const matchesRequestDate = filters.requestDate ? request.requestDate === filters.requestDate : true;
    const matchesEventDate = filters.eventDate ? request.eventDate === filters.eventDate : true;
    const matchesSpace = filters.space ? request.space === filters.space : true;
    
    return matchesSearch && matchesStatus && matchesRequestDate && matchesEventDate && matchesSpace;
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Em análise':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-300">Em análise</Badge>;
      case 'Aprovado':
        return <Badge variant="outline" className="bg-green-50 text-green-800 border-green-300">Aprovado</Badge>;
      case 'Reprovado':
        return <Badge variant="outline" className="bg-red-50 text-red-800 border-red-300">Reprovado</Badge>;
      case 'Cancelado':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">Cancelado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-kpmg-blue mb-2">Solicitações</h1>
            <p className="text-gray-600">
              Gerencie todas as solicitações de espaço para eventos
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/dashboard/solicitacoes/nova">
              <Button className="bg-kpmg-blue hover:bg-kpmg-lightblue">
                Nova Solicitação
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="mb-4">
            <div className="relative">
              <Input
                placeholder="Pesquisar por título, solicitante..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Eye className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <Select onValueChange={(value) => handleFilterChange('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="Em análise">Em análise</SelectItem>
                <SelectItem value="Aprovado">Aprovado</SelectItem>
                <SelectItem value="Reprovado">Reprovado</SelectItem>
                <SelectItem value="Cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex items-center space-x-2 relative">
              <Input
                type="date"
                placeholder="Data da Solicitação"
                onChange={(e) => handleFilterChange('requestDate', e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="flex items-center space-x-2 relative">
              <Input
                type="date"
                placeholder="Data do Evento"
                onChange={(e) => handleFilterChange('eventDate', e.target.value)}
                className="w-full"
              />
            </div>
            
            <Select onValueChange={(value) => handleFilterChange('eventType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de Evento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="Workshop">Workshop</SelectItem>
                <SelectItem value="Seminário">Seminário</SelectItem>
                <SelectItem value="Conferência">Conferência</SelectItem>
                <SelectItem value="Fórum">Fórum</SelectItem>
              </SelectContent>
            </Select>
            
            <Select onValueChange={(value) => handleFilterChange('space', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Espaço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os espaços</SelectItem>
                <SelectItem value="Auditório São Paulo">Auditório São Paulo</SelectItem>
                <SelectItem value="Sala Rio de Janeiro">Sala Rio de Janeiro</SelectItem>
                <SelectItem value="Auditório Belo Horizonte">Auditório Belo Horizonte</SelectItem>
                <SelectItem value="Sala de Treinamento">Sala de Treinamento</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Event Requests Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título do Evento</TableHead>
                <TableHead className="hidden sm:table-cell">Data da Solicitação</TableHead>
                <TableHead>Data do Evento</TableHead>
                <TableHead className="hidden md:table-cell">Espaço</TableHead>
                <TableHead className="hidden lg:table-cell">Solicitante</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map(request => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.title}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {new Date(request.requestDate).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      {new Date(request.eventDate).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{request.space}</TableCell>
                    <TableCell className="hidden lg:table-cell">{request.requester}</TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Link to={`/dashboard/solicitacoes/${request.id}`}>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0 text-gray-500 hover:text-gray-900"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      {request.status !== 'Cancelado' && request.status !== 'Reprovado' && (
                        <>
                          <Link to={`/dashboard/solicitacoes/${request.id}/editar`}>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-8 w-8 p-0 text-blue-500 hover:text-blue-700"
                              disabled={request.status === 'Aprovado' || request.status === 'Cancelado'}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                            onClick={() => handleCancelRequest(request.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                    Nenhuma solicitação encontrada com os filtros selecionados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Cancel Request Dialog */}
        <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cancelar Solicitação</DialogTitle>
              <DialogDescription>
                Deseja realmente cancelar esta solicitação de evento? Essa ação é irreversível.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
                Não
              </Button>
              <Button variant="destructive" onClick={confirmCancelRequest}>
                Sim, cancelar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default EventRequests;
