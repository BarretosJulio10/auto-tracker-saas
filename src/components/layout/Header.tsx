
import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex justify-between items-center py-4 px-6 border-b border-border bg-background sticky top-0 z-10"
    >
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {subtitle && <p className="text-muted-foreground text-sm">{subtitle}</p>}
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Pesquisar..."
            className="h-10 w-64 pl-10 pr-4 bg-background rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
        </div>

        <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-muted/80 transition-colors relative">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
        </button>

        <button className="flex items-center space-x-2 bg-muted rounded-full pl-2 pr-4 py-2 hover:bg-muted/80 transition-colors">
          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            <User size={14} />
          </div>
          <span className="text-sm font-medium">Perfil</span>
        </button>
      </div>
    </motion.header>
  );
};

export default Header;
