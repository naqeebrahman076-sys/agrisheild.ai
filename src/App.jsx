cat << 'EOF' > src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Engine1Forewarning from './components/Engine1Forewarning';
import Engine2EdgeVision from './components/Engine2EdgeVision';
import WeatherGatedAdvisory from './components/WeatherGatedAdvisory';
import StateHeatmapDashboard from './components/StateHeatmapDashboard';
import OfflineSyncManager from './components/OfflineSyncManager';
import DsiCalculatorModal from './components/DsiCalculatorModal';
import { getOfflineLogs } from './utils/offlineStorage';

export default function App() {
  const [activeTab, setActiveTab] = useState('engine1');
  const [isOnline, setIsOnline] = useState(true);
  const [selectedLang, setSelectedLang] = useState('marathi');
  const [isDsiModalOpen, setIsDsiModalOpen] = useState(false);
  const [pendingSyncCount, setPendingSyncCount] = useState(0);

  const [currentAdvisoryData, setCurrentAdvisoryData] = useState(null);

  useEffect(() => {
    updatePendingCount();
  }, []);

  const updatePendingCount = () => {
    const logs = getOfflineLogs();
    const pending = logs.filter(l => l.status === 'Pending Sync').length;
    setPendingSyncCount(pending);
  };

  const handleSendEngine1ToAdvisory = (data) => {
    setCurrentAdvisoryData((prev) => ({
      ...prev,
      crop: data.crop,
      riskScore: data.riskScore,
      next48hRain: data.next48hRain,
      max48hWind: data.max48hWind
    }));
    setActiveTab('advisory');
  };

  const handleAnalysisComplete = (data) => {
    setCurrentAdvisoryData((prev) => ({
      ...prev,
      ...data
    }));
    setActiveTab('advisory');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-between">
      <div>
        <Header
          isOnline={isOnline}
          setIsOnline={setIsOnline}
          selectedLang={selectedLang}
          setSelectedLang={setSelectedLang}
          pendingSyncCount={pendingSyncCount}
        />

        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {activeTab === 'engine1' && (
            <Engine1Forewarning onSendToAdvisory={handleSendEngine1ToAdvisory} />
          )}

          {activeTab === 'engine2' && (
            <Engine2EdgeVision
              onAnalysisComplete={handleAnalysisComplete}
              onOpenDsiModal={() => setIsDsiModalOpen(true)}
            />
          )}

          {activeTab === 'advisory' && (
            <WeatherGatedAdvisory
              advisoryData={currentAdvisoryData}
              selectedLang={selectedLang}
            />
          )}

          {activeTab === 'dashboard' && (
            <StateHeatmapDashboard />
          )}

          {activeTab === 'offline' && (
            <OfflineSyncManager
              isOnline={isOnline}
              onSyncComplete={updatePendingCount}
            />
          )}
        </main>
      </div>

      <DsiCalculatorModal
        isOpen={isDsiModalOpen}
        onClose={() => setIsDsiModalOpen(false)}
      />

      <footer className="border-t border-slate-800/80 bg-slate-900/60 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            AgriShield-AI • SIH26131 Digital Public Good Framework
          </span>
          <span className="font-mono text-[11px] text-slate-400">
            Engine 1 (Microclimate) + Engine 2 (Mob-Res Vision INT8)
          </span>
        </div>
      </footer>
    </div>
  );
}
EOF