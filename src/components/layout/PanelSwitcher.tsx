
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { User, Users, LayoutDashboard, X } from 'lucide-react';
import { 
  TooltipProvider, 
  Tooltip,
  TooltipContent,
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

const PanelSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const switchToPanel = (panel: 'admin' | 'company' | 'client') => {
    navigate(`/${panel}`);
    setIsOpen(false);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="fixed right-6 bottom-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="flex flex-col-reverse gap-2 mb-2"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => switchToPanel('admin')}
                    className="rounded-full w-12 h-12 p-0 border-2 border-primary"
                    variant={location.pathname.startsWith('/admin') ? 'default' : 'secondary'}
                  >
                    <LayoutDashboard size={20} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Painel Admin</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => switchToPanel('company')}
                    className="rounded-full w-12 h-12 p-0 border-2 border-primary"
                    variant={location.pathname.startsWith('/company') ? 'default' : 'secondary'}
                  >
                    <Users size={20} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Painel Empresa</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => switchToPanel('client')}
                    className="rounded-full w-12 h-12 p-0 border-2 border-primary"
                    variant={location.pathname.startsWith('/client') ? 'default' : 'secondary'}
                  >
                    <User size={20} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Painel Cliente</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={toggleMenu}
        className="rounded-full w-14 h-14 p-0 shadow-lg"
        variant={isOpen ? "destructive" : "default"}
      >
        {isOpen ? <X size={24} /> : (
          <div className="flex flex-col items-center justify-center">
            <span className="text-xs font-bold">Trocar</span>
            <span className="text-xs">Painel</span>
          </div>
        )}
      </Button>
    </div>
  );
};

export default PanelSwitcher;
