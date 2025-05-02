
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar, Download, BarChart3, PieChart, TrendingUp, Users } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';

const DashboardIndicators = () => {
  const [dateFilter, setDateFilter] = useState('thisYear');
  const [eventFilter, setEventFilter] = useState('all');

  // Mock data for the charts
  const eventsByMonthData = [
    { name: 'Jan', eventos: 4 },
    { name: 'Fev', eventos: 6 },
    { name: 'Mar', eventos: 8 },
    { name: 'Abr', eventos: 7 },
    { name: 'Mai', eventos: 12 },
    { name: 'Jun', eventos: 10 },
    { name: 'Jul', eventos: 5 },
    { name: 'Ago', eventos: 9 },
    { name: 'Set', eventos: 11 },
    { name: 'Out', eventos: 14 },
    { name: 'Nov', eventos: 8 },
    { name: 'Dez', eventos: 6 },
  ];

  const attendanceByEventData = [
    { name: 'Workshop Inovação', inscritos: 150, presentes: 120, ausentes: 30 },
    { name: 'Seminário Fiscal', inscritos: 80, presentes: 72, ausentes: 8 },
    { name: 'Fórum ESG', inscritos: 100, presentes: 85, ausentes: 15 },
    { name: 'Conferência Auditoria', inscritos: 200, presentes: 175, ausentes: 25 },
  ];

  const audienceDistributionData = [
    { name: 'Externo', value: 60 },
    { name: 'Interno', value: 30 },
    { name: 'Híbrido', value: 10 },
  ];

  const audienceColors = ['#0077B6', '#00B4D8', '#90E0EF'];

  const categoryDistributionData = [
    { name: 'Workshop', value: 40 },
    { name: 'Seminário', value: 25 },
    { name: 'Conferência', value: 20 },
    { name: 'Fórum', value: 15 },
  ];

  const categoryColors = ['#0077B6', '#00B4D8', '#90E0EF', '#CAF0F8'];

  const satisfactionData = [
    { name: 'Excelente', value: 45 },
    { name: 'Bom', value: 35 },
    { name: 'Regular', value: 15 },
    { name: 'Ruim', value: 5 },
  ];

  const satisfactionColors = ['#0A9396', '#94D2BD', '#E9D8A6', '#EE9B00'];

  // Key metrics
  const metrics = {
    totalEvents: 92,
    totalParticipants: 4350,
    averageAttendance: '87%',
    satisfactionRate: '92%',
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-kpmg-blue mb-2">Indicadores</h1>
            <p className="text-gray-600">
              Visualize métricas e tendências dos eventos da KPMG
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="thisMonth">Este Mês</SelectItem>
                <SelectItem value="lastMonth">Mês Passado</SelectItem>
                <SelectItem value="thisYear">Este Ano</SelectItem>
                <SelectItem value="lastYear">Ano Passado</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={eventFilter} onValueChange={setEventFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo de Evento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Eventos</SelectItem>
                <SelectItem value="workshop">Workshops</SelectItem>
                <SelectItem value="seminar">Seminários</SelectItem>
                <SelectItem value="conference">Conferências</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card className="border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total de Eventos</CardTitle>
              <Calendar className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.totalEvents}</div>
              <p className="text-xs text-green-600 mt-1">↑ 12% em relação ao período anterior</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total de Participantes</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.totalParticipants}</div>
              <p className="text-xs text-green-600 mt-1">↑ 8% em relação ao período anterior</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Comparecimento</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.averageAttendance}</div>
              <p className="text-xs text-green-600 mt-1">↑ 5% em relação ao período anterior</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Satisfação</CardTitle>
              <BarChart3 className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.satisfactionRate}</div>
              <p className="text-xs text-green-600 mt-1">↑ 3% em relação ao período anterior</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="general" className="mb-6">
          <TabsList>
            <TabsTrigger value="general">Visão Geral</TabsTrigger>
            <TabsTrigger value="attendance">Participação</TabsTrigger>
            <TabsTrigger value="satisfaction">Satisfação</TabsTrigger>
          </TabsList>
          
          {/* General Tab */}
          <TabsContent value="general">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Eventos por Mês</CardTitle>
                  <CardDescription>Quantidade de eventos realizados por mês</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                      data={eventsByMonthData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0077B6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#0077B6" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="eventos" 
                        stroke="#0077B6" 
                        fillOpacity={1} 
                        fill="url(#colorEvents)" 
                        name="Eventos"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Distribuição por Categoria</CardTitle>
                  <CardDescription>Tipos de eventos realizados</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={categoryDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={categoryColors[index % categoryColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Attendance Tab */}
          <TabsContent value="attendance">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Participação por Evento</CardTitle>
                  <CardDescription>Comparativo entre inscritos e presentes</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={attendanceByEventData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="inscritos" name="Inscritos" stackId="a" fill="#8884d8" />
                      <Bar dataKey="presentes" name="Presentes" stackId="a" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Distribuição de Público</CardTitle>
                  <CardDescription>Segmentação por tipo de público</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={audienceDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {audienceDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={audienceColors[index % audienceColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Satisfaction Tab */}
          <TabsContent value="satisfaction">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Satisfação dos Participantes</CardTitle>
                  <CardDescription>Avaliação geral dos eventos</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={satisfactionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {satisfactionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={satisfactionColors[index % satisfactionColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Tópicos mais comentados</CardTitle>
                  <CardDescription>Principais feedbacks dos participantes</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="text-sm font-medium">Qualidade do Conteúdo</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                    <span className="ml-4 text-sm font-medium">90%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="text-sm font-medium">Organização</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <span className="ml-4 text-sm font-medium">85%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="text-sm font-medium">Palestrantes</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                    <span className="ml-4 text-sm font-medium">95%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="text-sm font-medium">Infraestrutura</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                    <span className="ml-4 text-sm font-medium">80%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="text-sm font-medium">Networking</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <span className="ml-4 text-sm font-medium">75%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Eventos com maior participação</CardTitle>
            <CardDescription>Top eventos por número de participantes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Evento</th>
                    <th className="text-left p-2">Data</th>
                    <th className="text-left p-2">Local</th>
                    <th className="text-right p-2">Inscritos</th>
                    <th className="text-right p-2">Presentes</th>
                    <th className="text-right p-2">Taxa de Comparecimento</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2">Conferência de Auditoria</td>
                    <td className="p-2">15/06/2025</td>
                    <td className="p-2">São Paulo</td>
                    <td className="text-right p-2">200</td>
                    <td className="text-right p-2">175</td>
                    <td className="text-right p-2">88%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Workshop de Inovação Digital</td>
                    <td className="p-2">15/05/2025</td>
                    <td className="p-2">São Paulo</td>
                    <td className="text-right p-2">150</td>
                    <td className="text-right p-2">120</td>
                    <td className="text-right p-2">80%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Fórum ESG e Sustentabilidade</td>
                    <td className="p-2">05/06/2025</td>
                    <td className="p-2">Belo Horizonte</td>
                    <td className="text-right p-2">100</td>
                    <td className="text-right p-2">85</td>
                    <td className="text-right p-2">85%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Seminário Fiscal e Tributário</td>
                    <td className="p-2">20/05/2025</td>
                    <td className="p-2">Rio de Janeiro</td>
                    <td className="text-right p-2">80</td>
                    <td className="text-right p-2">72</td>
                    <td className="text-right p-2">90%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardIndicators;
