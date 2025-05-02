
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SpaceFilterProps {
  value: string;
  onValueChange: (value: string) => void;
}

const SpaceFilter = ({ value, onValueChange }: SpaceFilterProps) => {
  // Lista de espaços da KPMG
  const spaces = [
    { id: 'all', name: 'Todos os espaços' },
    { id: 'auditorio-principal', name: 'Auditório Principal' },
    { id: 'sala-reunioes-a', name: 'Sala de Reuniões A' },
    { id: 'sala-reunioes-b', name: 'Sala de Reuniões B' },
    { id: 'espaco-colaborativo', name: 'Espaço Colaborativo' },
    { id: 'sala-treinamento', name: 'Sala de Treinamento' },
    { id: 'lounge', name: 'Lounge' },
  ];
  
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um espaço" />
      </SelectTrigger>
      <SelectContent>
        {spaces.map((space) => (
          <SelectItem key={space.id} value={space.id}>
            {space.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SpaceFilter;
