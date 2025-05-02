
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarRange, Download, Eye, Users, CheckCircle } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Mock data for charts
const eventsByMonth = [
  { name: 'Jan', events: 4 },
  { name: 'Fev', events: 6 },
  { name: 'Mar', events: 8 },
  { name: 'Abr', events: 12 },
  { name: 'Mai', events: 15 },
  { name: 'Jun', events: 10 },
  { name: 'Jul', events: 8 },
  { name: 'Ago', events: 9 },
  { name: 'Set', events: 11 },
  { name: 'Out', events: 14 },
  { name: 'Nov', events: 16 },
  { name: 'Dez', events: 8 },
];

const attendanceData = [
  { name: 'Presentes', value: 78 },
  { name: 'Ausentes', value: 22 },
];

const COLORS = ['#0088FE', '#FF8042'];

const eventTypeData = [
  { name: 'Workshop', value: 25 },
  { name: 'Seminário', value: 35 },
  { name: 'Conferência', value: 30 },
  { name: 'Fórum', value: 10 },
];

const TYPE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const summaryData = [
  { title: 'Total de Eventos', value: 120, icon: CalendarRange, color: 'bg-blue-100 text-blue-800' },
  { title: 'Total de Inscrições', value: 1843, icon: Users, color: 'bg-green-100 text-green-800' },
  { title: 'Taxa de Comparecimento', value: '78%', icon: CheckCircle, color: 'bg-purple-100 text-purple-800' },
  { title: 'Eventos Ativos', value: 24, icon: Eye, color: 'bg-amber-100 text-amber-800' },
];

const DashboardIndicators = () => {
  const [year, setYear] = useState('2025');
  const [period, setPeriod] = useState('year');
  
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-kpmg-blue mb-2">Indicadores</h1>
            <p className="text-gray-600">
              Visualize métricas e relatórios sobre os eventos
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Ano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2026">2026</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {summaryData.map((item, index) => (
            <Card key={index}>
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`${item.color} p-3 rounded-full`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{item.title}</p>
                  <h3 className="text-2xl font-bold">{item.value}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="h-[400px]">
            <CardHeader>
              <CardTitle>Eventos por Mês</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={period} onValueChange={setPeriod} className="mb-4">
                <TabsList>
                  <TabsTrigger value="quarter">Trimestre</TabsTrigger>
                  <TabsTrigger value="year">Ano</TabsTrigger>
                </TabsList>
              </Tabs>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={eventsByMonth}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="events" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="h-[400px]">
            <CardHeader>
              <CardTitle>Taxa de Comparecimento</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={attendanceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {attendanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex gap-6 mt-4">
                {attendanceData.map((entry, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm">{entry.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="h-[400px]">
            <CardHeader>
              <CardTitle>Tipos de Evento</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={eventTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {eventTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={TYPE_COLORS[index % TYPE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 justify-center">
                {eventTypeData.map((entry, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: TYPE_COLORS[index % TYPE_COLORS.length] }}
                    />
                    <span className="text-sm">{entry.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="h-[400px]">
            <CardHeader>
              <CardTitle>Inscrições por Evento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                <p>Dados serão carregados em versão futura.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardIndicators;
