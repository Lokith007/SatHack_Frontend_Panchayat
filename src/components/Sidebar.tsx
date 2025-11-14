import { Home, Map, FileText, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageToggle } from './LanguageToggle';

type View = 'dashboard' | 'map' | 'reports' | 'alerts';

interface SidebarProps {
  activeView: View;
  onViewChange: (view: View) => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const { t } = useLanguage();
  
  const menuItems = [
    { id: 'dashboard' as View, label: t('nav.dashboard'), icon: Home },
    { id: 'map' as View, label: t('nav.map'), icon: Map },
    { id: 'reports' as View, label: t('nav.reports'), icon: FileText },
    { id: 'alerts' as View, label: t('nav.alerts'), icon: AlertTriangle },
  ];

  return (
    <aside className="w-20 lg:w-72 bg-white shadow-lg flex flex-col">
      {/* Header */}
      <div className="p-6 border-b-2 border-[#E8DFD8]">
        <div className="hidden lg:flex items-center gap-3">
          <div className="w-12 h-12 bg-[#00C896] rounded-xl flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
          </div>
          <div>
            <h1 className="text-[#2D1B12]">{t('nav.title')}</h1>
            <p className="text-sm text-gray-600">{t('nav.subtitle')}</p>
          </div>
        </div>
        <div className="lg:hidden flex justify-center">
          <div className="w-12 h-12 bg-[#00C896] rounded-xl flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-[#FF6B35] text-white shadow-lg'
                  : 'text-gray-700 hover:bg-[#F5EBE6] hover:text-[#FF6B35]'
              }`}
            >
              <Icon className="w-6 h-6 flex-shrink-0" />
              <span className="hidden lg:block">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t-2 border-[#E8DFD8] space-y-3">
        <div className="hidden lg:block">
          <LanguageToggle />
        </div>
        <div className="hidden lg:block bg-[#F5EBE6] rounded-lg p-4">
          <p className="text-sm text-gray-700 mb-1">{t('nav.help')}</p>
          <p className="text-xs text-gray-600">{t('nav.support')}</p>
        </div>
      </div>
    </aside>
  );
}