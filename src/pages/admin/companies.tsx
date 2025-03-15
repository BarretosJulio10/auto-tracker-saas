
import React from 'react';
import PageTransition from '@/components/layout/PageTransition';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { motion } from 'framer-motion';
import CompanyList from '@/components/admin/CompanyList';

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
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar variant="admin" />
      <div className="flex-1">
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
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                    Adicionar Empresa
                  </button>
                </div>
                
                <CompanyList companies={mockCompanies} />
              </motion.div>
            </div>
          </main>
        </PageTransition>
      </div>
    </div>
  );
};

export default AdminCompaniesPage;
