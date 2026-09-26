import React from 'react';
import { ShieldCheck, Wifi, WifiOff, Globe, Sparkles, Database } from 'lucide-react';

export default function Header({ isOnline, setIsOnline, selectedLang, setSelectedLang, pendingSyncCount }) {
  return (
    <header className="bg-slate-900/90 border-b border-slate-800 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Title & Tagline */}
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-bold text-lg sm:text-xl tracking-tight text-slate-100">
                AgriShield<span className="text-emerald-400">-AI</span>
              </h1>
              <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded-full font-mono font-medium">
                SIH26131
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Dual-Engine Microclimate Forewarning & Edge Multimodal IPM Framework
            </p>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-3">
          
          {/* Vernacular Language Selector */}
          <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-xs">
            <Globe className="h-3.5 w-3.5 text-slate-400 mr-1.5" />
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="bg-transparent text-slate-200 outline-none cursor-pointer font-medium"
            >
              <option value="marathi" className="bg-slate-900">मराठी (Marathi)</option>
              <option value="hindi" className="bg-slate-900">हिंदी (Hindi)</option>
              <option value="english" className="bg-slate-900">English</option>
            </select>
          </div>

          {/* Network Simulator Toggle */}
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              isOnline
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
            }`}
            title="Click to toggle Network Simulation (Online / Store-and-Forward)"
          >
            {isOnline ? (
              <>
                <Wifi className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Online DPG Sync</span>
              </>
            ) : (
              <>
                <WifiOff className="h-3.5 w-3.5" />
                <span>Offline Edge Mode</span>
              </>
            )}
          </button>

          {/* Pending Sync Badge */}
          {pendingSyncCount > 0 && (
            <div className="flex items-center bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs px-2.5 py-1 rounded-lg font-mono">
              <Database className="h-3.5 w-3.5 mr-1 animate-pulse" />
              <span>{pendingSyncCount} Logs Queued</span>
            </div>
          )}

        </div>
      </div>
    </header>
  );
}