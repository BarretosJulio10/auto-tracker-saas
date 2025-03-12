
import React from 'react';
import { MoreHorizontal, ExternalLink, Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Company {
  id: number;
  name: string;
  devices: number;
  activeDevices: number;
  logo: string;
}

interface CompanyListProps {
  companies: Company[];
}

const CompanyList: React.FC<CompanyListProps> = ({ companies }) => {
  const { toast } = useToast();
  
  const handleViewCompany = (companyId: number) => {
    toast({
      title: "Company details",
      description: "Opening company details page",
    });
  };
  
  const handleEditCompany = (companyId: number) => {
    toast({
      title: "Edit company",
      description: "Feature coming soon",
    });
  };
  
  const handleDeleteCompany = (companyId: number) => {
    toast({
      title: "Delete company",
      description: "Feature coming soon",
      variant: "destructive",
    });
  };
  
  return (
    <div className="overflow-hidden">
      <div className="rounded-md border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Company</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Devices</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company, index) => (
              <motion.tr 
                key={company.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-t hover:bg-muted/50"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl">
                      {company.logo}
                    </div>
                    <div>
                      <p className="font-medium">{company.name}</p>
                      <p className="text-xs text-muted-foreground">ID: #{company.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium">{company.activeDevices}/{company.devices}</p>
                    <div className="w-20 h-1.5 bg-gray-100 rounded-full mt-1">
                      <div 
                        className="h-full bg-primary rounded-full" 
                        style={{ width: `${(company.activeDevices / company.devices) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm">Active</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewCompany(company.id)}>
                        <ExternalLink size={14} className="mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditCompany(company.id)}>
                        <Edit size={14} className="mr-2" />
                        Edit Company
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteCompany(company.id)}>
                        <Trash2 size={14} className="mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {companies.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No companies found</p>
        </div>
      )}
    </div>
  );
};

export default CompanyList;
