
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CompanyList from '@/components/admin/CompanyList';
import { useToast } from '@/hooks/use-toast';

interface CompaniesOverviewProps {
  companies: Array<{
    id: number;
    name: string;
    devices: number;
    activeDevices: number;
    logo: string;
  }>;
}

const CompaniesOverview: React.FC<CompaniesOverviewProps> = ({ companies }) => {
  const { toast } = useToast();

  const handleAddCompany = () => {
    toast({
      title: "Funcionalidade em breve",
      description: "O registro de empresas estará disponível na próxima atualização.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Gerenciamento de Empresas</h3>
          <Button 
            onClick={handleAddCompany} 
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            <span>Adicionar Empresa</span>
          </Button>
        </div>
        
        <CompanyList companies={companies} />
      </div>
    </div>
  );
};

export default CompaniesOverview;
