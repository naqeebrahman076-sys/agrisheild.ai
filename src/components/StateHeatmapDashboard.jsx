import React, { useState } from 'react';
import { MAHARASHTRA_HEATMAP_DATA } from '../data/mockData';
import { MapPin, ShieldAlert, Award, FileCheck, CheckCircle, ExternalLink, Download } from 'lucide-react';

export default function StateHeatmapDashboard() {
  const [selectedDistrict, setSelectedDistrict] = useState(MAHARASHTRA_HEATMAP_DATA[0]);
  const [escalated, setEscalated] = useState(false);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-semibold border border-emerald-500/30">
                Digital Public Good (DPG) Microservice
              </span>
              <span className="text-slate-400 text-xs font-mono">DBSCAN Spatial Clustering</span>
            </div>
            <h2 className="text-xl font-bold text-slate-100 mt-2">
              State Agricultural Policy & Outbreak Heatmap
            </h2>
            <p className="text-slate-400 text-xs mt-1 max-w-3xl">
              Plugs into state portals (MahaVISTAAR-AI, AgriStack, Kisan e-Mitra). Provides district-wise outbreak heatmaps for state intervention and geotagged DSI proof for PMFBY insurance claims.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* District Risk Table / Heatmap list */}
        <div className="lg:col-span-7 bg-slate-800/60 border border-slate-700 p-5 rounded-2xl shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-emerald-400" />
              Maharashtra District Outbreak Surveillance
            </h3>
            <span className="text-xs text-slate-400 font-mono">Real-time DBSCAN Clusters</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-700 uppercase text-[10px]">
                <tr>
                  <th className="p-3">District</th>
                  <th className="p-3">Active Pathogen / Pest</th>
                  <th className="p-3">Risk Level</th>
                  <th className="p-3">Outbreak Score</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {MAHARASHTRA_HEATMAP_DATA.map((d) => (
                  <tr
                    key={d.id}
                    onClick={() => setSelectedDistrict(d)}
                    className={`cursor-pointer transition ${selectedDistrict.id === d.id ? 'bg-emerald-500/10' : 'hover:bg-slate-800/40'}`}
                  >
                    <td className="p-3 font-bold text-slate-200">{d.district}</td>
                    <td className="p-3 text-slate-300">{d.activeDisease}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        d.riskLevel === 'Critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                        d.riskLevel === 'High' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {d.riskLevel}
                      </span>
                    </td>
                    <td className="p-3 font-mono font-bold text-slate-200">{d.score}%</td>
                    <td className="p-3">
                      <button className="text-emerald-400 hover:underline text-[11px] font-semibold">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected District Deep Dive & PMFBY Verification */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-slate-800/60 border border-slate-700 p-5 rounded-2xl space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-100 text-sm">{selectedDistrict.district} Outbreak Metrics</h3>
              <span className="text-xs text-slate-400 font-mono">DBSCAN Density Cluster</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Est. Affected Area</span>
                <span className="font-bold text-amber-400 text-base">{selectedDistrict.affectedAreaHa} Ha</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Reported Farmer Cases</span>
                <span className="font-bold text-emerald-400 text-base">{selectedDistrict.cases} Reports</span>
              </div>
            </div>

            {/* KVK Escalation Workflow */}
            <div className="pt-2">
              <button
                onClick={() => setEscalated(true)}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 ${
                  escalated
                    ? 'bg-slate-700 text-slate-300 cursor-default'
                    : 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-lg shadow-amber-500/20'
                }`}
              >
                {escalated ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                    <span>Escalated to District KVK Agronomists</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="h-4 w-4" />
                    <span>Escalate Case to KVK Extension Officers</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* PMFBY Insurance Claim verification */}
          <div className="bg-slate-800/60 border border-slate-700 p-5 rounded-2xl space-y-3 shadow-xl">
            <div className="flex items-center space-x-2">
              <FileCheck className="h-5 w-5 text-emerald-400" />
              <h3 className="font-bold text-slate-100 text-sm">PMFBY Insurance Verification Engine</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generates immutable, geotagged crop loss reports with Disease Severity Index (DSI %) for Pradhan Mantri Fasal Bima Yojana claims.
            </p>

            <button
              onClick={() => alert(`Generated PMFBY Verification Certificate for ${selectedDistrict.district} District!\n\nGeotagged DSI Loss: 32.5%\nTimestamp: ${new Date().toLocaleString()}\nHash: 0x8f2a...9b1c`)}
              className="w-full bg-slate-900 hover:bg-slate-950 text-emerald-400 border border-emerald-500/30 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 transition"
            >
              <Download className="h-4 w-4" />
              <span>Download PMFBY Verification Report</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}