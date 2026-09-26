import React from 'react';
import { Activity, Camera, ShieldAlert, Map, Database } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'engine1', label: 'Engine 1: Forewarning', sub: 'Pre-Symptomatic Zero-Image', icon: Activity },
    { id: 'engine2', label: 'Engine 2: Edge Vision', sub: 'Post-Symptomatic DSI Triage', icon: Camera },
    { id: 'advisory', label: 'Weather-Gated Advisory', sub: 'Spray Lock & Vernacular TTS', icon: ShieldAlert },
    { id: 'dashboard', label: 'State Outbreak Map', sub: 'DBSCAN Clusters & PMFBY', icon: Map },
    { id: 'offline', label: 'Store & Forward', sub: 'SQLite / Edge Sync Queue', icon: Database },
  ];

  return (
    <nav className="bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-2 overflow-x-auto py-2 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2.5 px-4 py-2.5 rounded-xl text-left transition-all whitespace-nowrap min-w-[200px] ${
                  isActive
                    ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 shadow-md shadow-emerald-950/50'
                    : 'bg-slate-800/40 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <div className={`p-2 rounded-lg ${isActive ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold">{tab.label}</div>
                  <div className="text-[10px] text-slate-400">{tab.sub}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}