
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import PageTransition from '@/components/layout/PageTransition';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { motion } from 'framer-motion';
import CompanyList from '@/components/admin/CompanyList';
import CompanyForm from '@/components/admin/CompanyForm';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock company data
const mockCompanies = [
  {
    id: 1,
    name: "Transportes Brasil",
    devices: 120,
    activeDevices: 98,
    logo: "TB"
  },
  {
    id: 2,
    name: "Logística Expressa",
    devices: 85,
    activeDevices: 79,
    logo: "LE"
  },
  {
    id: 3,
    name: "Cargas Rápidas",
    devices: 62,
    activeDevices: 45,
    logo: "CR"
  },
  {
    id: 4,
    name: "Transporte Seguro",
    devices: 45,
    activeDevices: 40,
    logo: "TS"
  },
  {
    id: 5,
    name: "Entregas Urbanas",
    devices: 30,
    activeDevices: 22,
    logo: "EU"
  }
];

const AdminCompaniesPage = () => {
  const { toast } = useToast();
  const [companies, setCompanies] = useState(mockCompanies);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddCompany = (data: any) => {
    // Create a new company object with the form data
    const newCompany = {
      id: companies.length + 1,
      name: data.name,
      devices: data.devices,
      activeDevices: 0,
      logo: data.logo || data.name.substr(0, 2).toUpperCase(),
    };
    
    // Add the new company to the list
    setCompanies([...companies, newCompany]);
    
    // Close the dialog
    setIsDialogOpen(false);
    
    // Show success message
    toast({
      title: "Empresa adicionada",
      description: `${data.name} foi adicionada com sucesso.`,
    });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar variant="admin" />
      <div className="flex-1 ml-[260px]"> {/* Added margin to prevent sidebar overlap */}
        <Header title="Empresas" subtitle="Gerenciamento de empresas cadastradas" />
        
        <PageTransition>
          <main className="container mx-auto px-4 py-6">
            <div className="grid gap-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Lista de Empresas</h2>
                  
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2">
                        <Plus size={18} />
                        Adicionar Empresa
                      </button>
                    </DialogTrigger>
                    
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Adicionar Nova Empresa</DialogTitle>
                        <DialogDescription>
                          Preencha os campos abaixo para cadastrar uma nova empresa no sistema.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <CompanyForm 
                        onSubmit={handleAddCompany}
                        onCancel={() => setIsDialogOpen(false)}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
                
                <CompanyList companies={companies} />
              </motion.div>
            </div>
          </main>
        </PageTransition>
      </div>
    </div>
  );
};

export default AdminCompaniesPage;
