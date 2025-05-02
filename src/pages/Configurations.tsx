
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { Edit, Plus, Trash } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Define the Space type explicitly
type Space = {
  id: string;
  name: string;
  description: string;
  maxCapacity: number;
  isActive: boolean;
  location: string;
  hasAccessibility: boolean;
};

// Mock data for spaces/resources
const mockSpaces: Space[] = [
  {
    id: '1',
    name: 'Auditório Principal',
    description: 'Auditório com capacidade para eventos de grande porte, equipado com sistema de som e projeção.',
    maxCapacity: 200,
    isActive: true,
    location: 'Térreo',
    hasAccessibility: true,
  },
  {
    id: '2',
    name: 'Sala de Reuniões A',
    description: 'Sala para reuniões de médio porte com equipamentos para videoconferência.',
    maxCapacity: 30,
    isActive: true,
    location: '3º andar',
    hasAccessibility: true,
  },
  {
    id: '3',
    name: 'Espaço Colaborativo',
    description: 'Ambiente aberto e flexível para eventos interativos e workshops.',
    maxCapacity: 50,
    isActive: true,
    location: '2º andar',
    hasAccessibility: false,
  },
  {
    id: '4',
    name: 'Sala de Treinamento',
    description: 'Equipada com computadores e projetor para treinamentos técnicos.',
    maxCapacity: 25,
    isActive: false,
    location: '4º andar',
    hasAccessibility: true,
  }
];

// Define schema for form validation
const spaceSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  maxCapacity: z.coerce.number().positive('Capacidade deve ser um número positivo'),
  isActive: z.boolean().default(true),
  location: z.string().min(2, 'Localização deve ter pelo menos 2 caracteres'),
  hasAccessibility: z.boolean().default(false),
});

type SpaceFormValues = z.infer<typeof spaceSchema>;

const Configurations = () => {
  const [spaces, setSpaces] = useState<Space[]>(mockSpaces);
  const [isEditing, setIsEditing] = useState<string | null>(null);

  const form = useForm<SpaceFormValues>({
    resolver: zodResolver(spaceSchema),
    defaultValues: {
      name: '',
      description: '',
      maxCapacity: 0,
      isActive: true,
      location: '',
      hasAccessibility: false,
    }
  });
  
  const onSubmit = (values: SpaceFormValues) => {
    if (isEditing) {
      // Update existing space
      setSpaces(spaces.map(space => 
        space.id === isEditing ? { ...values, id: space.id } as Space : space
      ));
      toast.success('Espaço atualizado com sucesso!');
      setIsEditing(null);
    } else {
      // Add new space
      // Ensure all required fields are present by explicitly specifying them
      const newSpace: Space = {
        id: `${Date.now()}`,
        name: values.name,
        description: values.description,
        maxCapacity: values.maxCapacity,
        isActive: values.isActive,
        location: values.location,
        hasAccessibility: values.hasAccessibility
      };
      setSpaces([...spaces, newSpace]);
      toast.success('Espaço adicionado com sucesso!');
    }
    form.reset();
  };

  const handleEdit = (id: string) => {
    const spaceToEdit = spaces.find(space => space.id === id);
    if (spaceToEdit) {
      form.reset(spaceToEdit);
      setIsEditing(id);
    }
  };

  const handleDelete = (id: string) => {
    setSpaces(spaces.filter(space => space.id !== id));
    toast.success('Espaço removido com sucesso!');
    if (isEditing === id) {
      setIsEditing(null);
      form.reset();
    }
  };

  const handleCancel = () => {
    setIsEditing(null);
    form.reset();
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold text-kpmg-blue mb-6">Configurações</h1>
        
        <Tabs defaultValue="spaces" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="spaces">Gestão de Recursos e Espaços</TabsTrigger>
            <TabsTrigger value="general" disabled>Configurações Gerais</TabsTrigger>
            <TabsTrigger value="users" disabled>Gestão de Usuários</TabsTrigger>
          </TabsList>
          
          <TabsContent value="spaces" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Form Card */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>{isEditing ? 'Editar Espaço' : 'Adicionar Novo Espaço'}</CardTitle>
                  <CardDescription>
                    {isEditing 
                      ? 'Atualize as informações do espaço selecionado' 
                      : 'Preencha os dados para adicionar um novo espaço ou recurso'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome do Espaço</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Auditório Principal" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Descrição</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Descreva o espaço e suas características" 
                                className="min-h-[100px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="maxCapacity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Capacidade Máxima</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" {...field} />
                            </FormControl>
                            <FormDescription>
                              Número máximo de pessoas que o espaço comporta
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Localização</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: 2º andar, Bloco A" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="isActive"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Ativo</FormLabel>
                                <FormDescription>
                                  Disponível para solicitações
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="hasAccessibility"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Acessibilidade</FormLabel>
                                <FormDescription>
                                  Possui acesso PCD
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="flex justify-end gap-2 pt-4">
                        {isEditing && (
                          <Button 
                            variant="outline" 
                            type="button" 
                            onClick={handleCancel}
                          >
                            Cancelar
                          </Button>
                        )}
                        <Button 
                          type="submit" 
                          className="bg-kpmg-blue hover:bg-kpmg-lightblue"
                        >
                          {isEditing ? 'Atualizar' : 'Adicionar'} Espaço
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
              
              {/* Table Card */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Espaços e Recursos Disponíveis</CardTitle>
                  <CardDescription>
                    Gerencie os espaços e recursos disponíveis para eventos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead className="hidden md:table-cell">Capacidade</TableHead>
                          <TableHead className="hidden md:table-cell">Localização</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {spaces.map((space) => (
                          <TableRow key={space.id}>
                            <TableCell className="font-medium">{space.name}</TableCell>
                            <TableCell className="hidden md:table-cell">{space.maxCapacity} pessoas</TableCell>
                            <TableCell className="hidden md:table-cell">{space.location}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                space.isActive 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {space.isActive ? 'Ativo' : 'Inativo'}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEdit(space.id)}
                                >
                                  <Edit className="h-4 w-4" />
                                  <span className="sr-only">Editar</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDelete(space.id)}
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash className="h-4 w-4" />
                                  <span className="sr-only">Excluir</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                        
                        {spaces.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                              Nenhum espaço cadastrado
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  
                  {spaces.length > 0 && (
                    <div className="mt-4 text-sm text-gray-500">
                      Total de {spaces.length} espaços cadastrados
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Configurações Gerais</CardTitle>
                <CardDescription>
                  Configurações gerais do sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Esta funcionalidade será implementada em breve.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Gestão de Usuários</CardTitle>
                <CardDescription>
                  Gerencie os usuários do sistema e suas permissões
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Esta funcionalidade será implementada em breve.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Configurations;
