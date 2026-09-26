import React from 'react';
import { X, Calculator, ShieldCheck } from 'lucide-react';

export default function DsiCalculatorModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-100 p-1"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center space-x-2 text-emerald-400">
          <Calculator className="h-5 w-5" />
          <h3 className="font-bold text-base text-slate-100">Disease Severity Index (DSI) Mathematics</h3>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          AgriShield-AI calculates foliar loss percentages dynamically at the edge using pixel segmentation maps extracted from visual feature tensors.
        </p>

        {/* Formatted Formula Display */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center font-mono text-slate-100 text-xs py-4 my-2 leading-relaxed">
          <div className="text-emerald-400 font-bold mb-2">DSI (%) Calculation Formula</div>
          <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-slate-200 font-semibold space-y-1">
            <div>DSI (%) = [ Diseased / Damaged Pixel Area ] ÷ [ Total Leaf Surface Pixel Area ] × 100</div>
          </div>
        </div>

        <div className="space-y-2 text-xs text-slate-300">
          <div className="flex items-start space-x-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <p><strong>Economic Threshold Level (ETL):</strong> Triggered when DSI &gt; 15% for early foliar blights.</p>
          </div>
          <div className="flex items-start space-x-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <p><strong>PMFBY Validity:</strong> Geotagged DSI logs provide non-repudiable claim evidence.</p>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-2 rounded-xl text-xs"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
}