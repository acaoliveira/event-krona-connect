
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Building, 
  Phone, 
  MapPin, 
  Shield, 
  Bell, 
  Key, 
  Calendar, 
  FileText, 
  Download, 
  Share2, 
  Check, 
  X, 
  Edit,
  QrCode,
  Trash2
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Checkbox } from "@/components/ui/checkbox";

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: 'Usuário KPMG',
    email: 'usuario@kpmg.com',
    office: 'São Paulo',
    department: 'Eventos',
    role: 'Gerente',
    phone: '+55 (11) 9999-8888',
    joinDate: '15/03/2022',
    emailPreferences: {
      marketing: true,
      notifications: true,
      updates: true
    }
  });
  
  const [formData, setFormData] = useState({ ...userData });
  const [selectedRegistration, setSelectedRegistration] = useState<string | null>(null);

  // Mock data for registrations
  const registrations = [
    {
      id: '1',
      eventName: 'Workshop de Inovação',
      eventDate: new Date(2023, 9, 15),
      status: 'approved',
      location: 'Auditório Principal',
      hasCheckin: true,
      eventEnded: true,
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=event-1-user-kpmg'
    },
    {
      id: '2',
      eventName: 'Painel de Discussão: Finanças',
      eventDate: new Date(2023, 10, 22),
      status: 'approved',
      location: 'Sala de Conferências 2',
      hasCheckin: false,
      eventEnded: true
    },
    {
      id: '3',
      eventName: 'Treinamento de Liderança',
      eventDate: new Date(2023, 11, 5),
      status: 'rejected',
      location: 'Sala de Treinamento',
      hasCheckin: false,
      eventEnded: true
    },
    {
      id: '4',
      eventName: 'Networking de Final de Ano',
      eventDate: new Date(2023, 11, 20),
      status: 'cancelled',
      location: 'Lounge',
      hasCheckin: false,
      eventEnded: true
    },
    {
      id: '5',
      eventName: 'Conferência de Tecnologia',
      eventDate: new Date(),
      status: 'approved',
      location: 'Auditório Principal',
      hasCheckin: false,
      eventEnded: false
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUserData({ ...formData });
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso.",
    });
  };

  const handleCancelRegistration = (id: string) => {
    // In a real app, this would call an API to cancel the registration
    toast({
      title: "Inscrição cancelada",
      description: "Sua inscrição foi cancelada com sucesso.",
    });
  };

  const handleEditRegistration = (id: string) => {
    // In a real app, this would navigate to an edit page
    toast({
      title: "Editar inscrição",
      description: "Você será redirecionado para editar sua inscrição.",
    });
  };

  const handleDownloadCertificate = (id: string) => {
    // In a real app, this would download a PDF certificate
    toast({
      title: "Download iniciado",
      description: "O download do seu certificado começou.",
    });
  };

  const handleShareCertificate = (id: string) => {
    // In a real app, this would share to LinkedIn
    toast({
      title: "Compartilhar certificado",
      description: "Opções de compartilhamento no LinkedIn abertas.",
    });
  };

  const handleDeleteAccount = () => {
    // In a real app, this would call an API to delete the account
    const confirmed = window.confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.");
    if (confirmed) {
      toast({
        title: "Conta excluída",
        description: "Sua conta foi excluída com sucesso.",
        variant: "destructive"
      });
    }
  };

  const handleEmailPreferenceChange = (key: keyof typeof userData.emailPreferences) => {
    setUserData(prev => ({
      ...prev,
      emailPreferences: {
        ...prev.emailPreferences,
        [key]: !prev.emailPreferences[key]
      }
    }));
    
    toast({
      title: "Preferências atualizadas",
      description: "Suas preferências de email foram atualizadas.",
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-kpmg-green">Aprovada</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Reprovada</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="text-gray-500">Cancelada</Badge>;
      default:
        return <Badge variant="outline">Pendente</Badge>;
    }
  };

  const canEditRegistration = (registration: any) => {
    // Logic to determine if a registration can be edited
    return registration.status === 'approved' && !registration.eventEnded;
  };

  const canCancelRegistration = (registration: any) => {
    // Logic to determine if a registration can be cancelled
    return registration.status === 'approved' && !registration.eventEnded;
  };

  const canViewCertificate = (registration: any) => {
    // Logic to determine if a certificate is available
    return registration.status === 'approved' && registration.hasCheckin && registration.eventEnded;
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-kpmg-blue mb-2">Meu Perfil</h1>
            <p className="text-gray-600">
              Gerencie suas informações pessoais e configurações
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="text-2xl bg-kpmg-blue text-white">
                    {userData.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle>{userData.name}</CardTitle>
              <CardDescription>{userData.role}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{userData.email}</span>
                </div>
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{userData.department}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{userData.office}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{userData.phone}</span>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="space-y-2">
                <Badge variant="outline" className="flex items-center gap-1 px-2 py-1">
                  <Shield className="h-3 w-3" />
                  <span>Perfil verificado</span>
                </Badge>
                <p className="text-xs text-gray-500 mt-2">
                  Membro desde {userData.joinDate}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="lg:col-span-2">
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="info">Informações</TabsTrigger>
                <TabsTrigger value="registrations">Inscrições</TabsTrigger>
                <TabsTrigger value="notifications">Notificações</TabsTrigger>
                <TabsTrigger value="security">Segurança</TabsTrigger>
              </TabsList>
              
              <TabsContent value="info">
                <Card>
                  <form onSubmit={handleSave}>
                    <CardHeader>
                      <CardTitle>Informações Pessoais</CardTitle>
                      <CardDescription>
                        Atualize suas informações pessoais e de contato
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nome completo</Label>
                          <Input 
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Telefone</Label>
                          <Input 
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">Cargo</Label>
                          <Input 
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="department">Departamento</Label>
                          <Input 
                            id="department"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="office">Escritório</Label>
                          <Input 
                            id="office"
                            name="office"
                            value={formData.office}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button type="submit" className="bg-kpmg-blue hover:bg-kpmg-lightblue">
                        Salvar alterações
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
              
              <TabsContent value="registrations">
                <Card>
                  <CardHeader>
                    <CardTitle>Minhas Inscrições</CardTitle>
                    <CardDescription>
                      Histórico e gerenciamento de suas inscrições em eventos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedRegistration ? (
                      // Registration Detail View
                      <div>
                        {(() => {
                          const reg = registrations.find(r => r.id === selectedRegistration);
                          if (!reg) return <p>Inscrição não encontrada</p>;
                          
                          return (
                            <div className="space-y-6">
                              <div className="flex justify-between items-center">
                                <h3 className="text-xl font-semibold">{reg.eventName}</h3>
                                <Button 
                                  variant="outline" 
                                  onClick={() => setSelectedRegistration(null)}
                                >
                                  Voltar
                                </Button>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <p className="text-sm text-gray-500">Data do Evento</p>
                                  <p className="font-medium">
                                    {format(new Date(reg.eventDate), "PPP", { locale: ptBR })}
                                  </p>
                                </div>
                                <div className="space-y-2">
                                  <p className="text-sm text-gray-500">Local</p>
                                  <p className="font-medium">{reg.location}</p>
                                </div>
                                <div className="space-y-2">
                                  <p className="text-sm text-gray-500">Status</p>
                                  <p>{getStatusBadge(reg.status)}</p>
                                </div>
                              </div>
                              
                              <Separator />
                              
                              {reg.status === 'approved' && (
                                <div className="space-y-4">
                                  {/* QR Code Section */}
                                  <div className="space-y-2">
                                    <h4 className="font-medium flex items-center gap-2">
                                      <QrCode className="h-4 w-4" /> QR Code do Evento
                                    </h4>
                                    <div className="flex justify-center p-4 bg-gray-50 rounded-md">
                                      {reg.qrCode ? (
                                        <img 
                                          src={reg.qrCode} 
                                          alt="QR Code do Evento" 
                                          className="w-48 h-48"
                                        />
                                      ) : (
                                        <div className="w-48 h-48 bg-gray-200 flex items-center justify-center rounded-md">
                                          <p className="text-gray-500 text-sm">QR Code não disponível</p>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  
                                  {/* Certificate Section */}
                                  {canViewCertificate(reg) && (
                                    <div className="space-y-3">
                                      <h4 className="font-medium flex items-center gap-2">
                                        <FileText className="h-4 w-4" /> Certificado
                                      </h4>
                                      <div className="p-4 bg-gray-50 rounded-md">
                                        <div className="border p-4 mb-4 rounded-md bg-white">
                                          <div className="text-center space-y-2">
                                            <h3 className="text-lg font-semibold text-kpmg-blue">Certificado de Participação</h3>
                                            <p className="text-sm">Este documento certifica que</p>
                                            <p className="text-lg font-medium">{userData.name}</p>
                                            <p className="text-sm">participou do evento</p>
                                            <p className="text-lg font-medium">{reg.eventName}</p>
                                            <p className="text-sm">realizado em {format(new Date(reg.eventDate), "PPP", { locale: ptBR })}</p>
                                            <div className="pt-4">
                                              <img 
                                                src="https://upload.wikimedia.org/wikipedia/commons/9/9d/KPMG_logo.svg" 
                                                alt="KPMG Logo" 
                                                className="h-8 mx-auto"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="flex justify-center space-x-4">
                                          <Button 
                                            onClick={() => handleDownloadCertificate(reg.id)}
                                            className="bg-kpmg-blue hover:bg-kpmg-lightblue"
                                          >
                                            <Download className="h-4 w-4 mr-2" /> Download PDF
                                          </Button>
                                          <Button 
                                            variant="outline"
                                            onClick={() => handleShareCertificate(reg.id)}
                                          >
                                            <Share2 className="h-4 w-4 mr-2" /> Compartilhar no LinkedIn
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                              
                              <div className="flex justify-between mt-6">
                                {canEditRegistration(reg) && (
                                  <Button 
                                    variant="outline" 
                                    onClick={() => handleEditRegistration(reg.id)}
                                    className="flex items-center gap-2"
                                  >
                                    <Edit className="h-4 w-4" /> Editar Inscrição
                                  </Button>
                                )}
                                
                                {canCancelRegistration(reg) && (
                                  <Button 
                                    variant="destructive" 
                                    onClick={() => handleCancelRegistration(reg.id)}
                                    className="flex items-center gap-2"
                                  >
                                    <X className="h-4 w-4" /> Cancelar Inscrição
                                  </Button>
                                )}
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    ) : (
                      // Registration List View
                      <div className="space-y-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Evento</TableHead>
                              <TableHead>Data</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Ações</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {registrations.map((registration) => (
                              <TableRow key={registration.id}>
                                <TableCell className="font-medium">{registration.eventName}</TableCell>
                                <TableCell>
                                  {format(new Date(registration.eventDate), "dd/MM/yyyy")}
                                </TableCell>
                                <TableCell>{getStatusBadge(registration.status)}</TableCell>
                                <TableCell>
                                  <div className="flex items-center space-x-2">
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => setSelectedRegistration(registration.id)}
                                    >
                                      Detalhes
                                    </Button>
                                    
                                    {canEditRegistration(registration) && (
                                      <Button 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => handleEditRegistration(registration.id)}
                                      >
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                    )}
                                    
                                    {canCancelRegistration(registration) && (
                                      <Button 
                                        variant="destructive" 
                                        size="sm"
                                        onClick={() => handleCancelRegistration(registration.id)}
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    )}
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferências de Notificações</CardTitle>
                    <CardDescription>
                      Configure como você deseja receber notificações do sistema
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h4 className="font-medium">Novos eventos</h4>
                          <p className="text-sm text-gray-500">Seja notificado quando novos eventos forem criados</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Bell className="h-4 w-4 text-gray-500" />
                          <Checkbox 
                            checked={userData.emailPreferences.updates} 
                            onCheckedChange={() => handleEmailPreferenceChange('updates')}
                          />
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h4 className="font-medium">Atualizações de eventos</h4>
                          <p className="text-sm text-gray-500">Receba notificações sobre mudanças em eventos que você está participando</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Bell className="h-4 w-4 text-gray-500" />
                          <Checkbox 
                            checked={userData.emailPreferences.notifications} 
                            onCheckedChange={() => handleEmailPreferenceChange('notifications')}
                          />
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h4 className="font-medium">Comunicações de marketing</h4>
                          <p className="text-sm text-gray-500">Receba informações sobre novidades da KPMG</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <Checkbox 
                            checked={userData.emailPreferences.marketing} 
                            onCheckedChange={() => handleEmailPreferenceChange('marketing')}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button className="bg-kpmg-blue hover:bg-kpmg-lightblue">
                      Salvar preferências
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Segurança da Conta</CardTitle>
                    <CardDescription>
                      Gerencie sua senha e segurança da conta
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium flex items-center gap-2">
                        <Key className="h-4 w-4" />
                        Alteração de senha
                      </h4>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Senha atual</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">Nova senha</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirmar nova senha</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <div className="space-y-4">
                      <h4 className="font-medium text-destructive flex items-center gap-2">
                        <Trash2 className="h-4 w-4" /> 
                        Excluir conta
                      </h4>
                      <p className="text-sm text-gray-500">
                        Esta ação é permanente e não poderá ser desfeita. Todos os seus dados, incluindo perfil, 
                        histórico de eventos e preferências serão excluídos definitivamente.
                      </p>
                      <Button 
                        variant="destructive"
                        onClick={handleDeleteAccount}
                      >
                        Excluir minha conta
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div></div>
                    <Button className="bg-kpmg-blue hover:bg-kpmg-lightblue">
                      Alterar senha
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserProfile;
