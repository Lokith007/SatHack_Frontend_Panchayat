import { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { MapView } from './components/MapView';
import { Reports } from './components/Reports';
import { Alerts } from './components/Alerts';
import { Toaster } from './components/ui/sonner';

type View = 'dashboard' | 'map' | 'reports' | 'alerts';

export default function App() {
  const [activeView, setActiveView] = useState<View>('dashboard');

  return (
    <LanguageProvider>
      <div className="flex min-h-screen bg-[#FBF7F4]">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        
        <main className="flex-1 p-6 lg:p-8">
          {activeView === 'dashboard' && <Dashboard />}
          {activeView === 'map' && <MapView />}
          {activeView === 'reports' && <Reports />}
          {activeView === 'alerts' && <Alerts />}
        </main>

        <Toaster />
      </div>
    </LanguageProvider>
  );
}
