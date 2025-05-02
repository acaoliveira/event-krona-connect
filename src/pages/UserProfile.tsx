
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
import { Mail, Building, Phone, MapPin, Shield, Bell, Key } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: 'Usuário KPMG',
    email: 'usuario@kpmg.com',
    office: 'São Paulo',
    department: 'Eventos',
    role: 'Gerente',
    phone: '+55 (11) 9999-8888',
    joinDate: '15/03/2022',
  });
  
  const [formData, setFormData] = useState({ ...userData });

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
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="info">Informações</TabsTrigger>
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
                          <input type="checkbox" className="form-checkbox h-4 w-4 text-kpmg-blue" defaultChecked />
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
                          <input type="checkbox" className="form-checkbox h-4 w-4 text-kpmg-blue" defaultChecked />
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h4 className="font-medium">Lembretes</h4>
                          <p className="text-sm text-gray-500">Receba lembretes de eventos próximos</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Bell className="h-4 w-4 text-gray-500" />
                          <input type="checkbox" className="form-checkbox h-4 w-4 text-kpmg-blue" defaultChecked />
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
                  </CardContent>
                  <CardFooter className="flex justify-end">
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
