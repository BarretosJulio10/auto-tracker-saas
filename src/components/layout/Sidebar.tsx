
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Gauge, 
  Car, 
  Map, 
  Users, 
  Settings, 
  Bell, 
  MessageSquare, 
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  title: string;
  collapsed: boolean;
  exact?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ 
  to, 
  icon, 
  title, 
  collapsed,
  exact = false
}) => {
  const location = useLocation();
  const isActive = exact 
    ? location.pathname === to 
    : location.pathname.startsWith(to);

  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => cn(
        "nav-link group",
        isActive ? "nav-link-active" : "nav-link-inactive"
      )}
    >
      <span className="text-xl">{icon}</span>
      {!collapsed && (
        <motion.span
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "auto" }}
          exit={{ opacity: 0, width: 0 }}
          className="whitespace-nowrap overflow-hidden"
        >
          {title}
        </motion.span>
      )}
    </NavLink>
  );
};

interface SidebarProps {
  variant: 'admin' | 'company' | 'client';
}

const Sidebar: React.FC<SidebarProps> = ({ variant }) => {
  const [collapsed, setCollapsed] = useState(false);

  const adminLinks = [
    { to: "/admin", icon: <Gauge size={20} />, title: "Painel", exact: true },
    { to: "/admin/companies", icon: <Users size={20} />, title: "Empresas" },
    { to: "/admin/devices", icon: <Car size={20} />, title: "Dispositivos" },
    { to: "/admin/map", icon: <Map size={20} />, title: "Mapa" },
    { to: "/admin/settings", icon: <Settings size={20} />, title: "Configurações" },
  ];

  const companyLinks = [
    { to: "/company", icon: <Gauge size={20} />, title: "Painel", exact: true },
    { to: "/company/vehicles", icon: <Car size={20} />, title: "Veículos" },
    { to: "/company/clients", icon: <Users size={20} />, title: "Clientes" },
    { to: "/company/map", icon: <Map size={20} />, title: "Mapa" },
    { to: "/company/settings", icon: <Settings size={20} />, title: "Configurações" },
  ];

  const clientLinks = [
    { to: "/client", icon: <Gauge size={20} />, title: "Painel", exact: true },
    { to: "/client/vehicles", icon: <Car size={20} />, title: "Meus Veículos" },
    { to: "/client/map", icon: <Map size={20} />, title: "Mapa" },
    { to: "/client/notifications", icon: <Bell size={20} />, title: "Notificações" },
    { to: "/client/support", icon: <MessageSquare size={20} />, title: "Suporte" },
  ];

  const links = 
    variant === 'admin' ? adminLinks :
    variant === 'company' ? companyLinks :
    clientLinks;

  return (
    <motion.aside
      initial={{ width: collapsed ? 80 : 260 }}
      animate={{ width: collapsed ? 80 : 260 }}
      transition={{ type: "spring", stiffness: 400, damping: 40 }}
      className="h-screen bg-sidebar fixed left-0 top-0 z-30 flex flex-col shadow-lg border-r border-sidebar-border"
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-sidebar-primary flex items-center justify-center flex-shrink-0 text-white font-bold text-xl">
            AT
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="ml-3 whitespace-nowrap overflow-hidden"
            >
              <h1 className="text-lg font-semibold text-white">Auto Track</h1>
              <p className="text-xs text-sidebar-foreground/70">
                {variant === 'admin' ? 'Painel Admin' : 
                 variant === 'company' ? 'Painel Empresa' : 
                 'Painel Cliente'}
              </p>
            </motion.div>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-sidebar-foreground hover:bg-sidebar-primary transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="flex-1 py-6 px-3 overflow-y-auto">
        <ul className="space-y-1">
          {links.map((link) => (
            <li key={link.to}>
              <SidebarLink
                to={link.to}
                icon={link.icon}
                title={link.title}
                collapsed={collapsed}
                exact={link.exact}
              />
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-3 border-t border-sidebar-border">
        <button className={cn(
          "nav-link w-full justify-center",
          "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
        )}>
          <span className="text-xl"><LogOut size={20} /></span>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="whitespace-nowrap overflow-hidden"
            >
              Sair
            </motion.span>
          )}
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
