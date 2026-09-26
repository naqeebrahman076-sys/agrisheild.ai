import React, { useState } from 'react';
import { speakAdvisoryText, stopSpeech } from '../utils/tts';
import { Lock, AlertOctagon, Volume2, VolumeX, CheckCircle, Shield, Droplets, Wind, Sparkles } from 'lucide-react';

export default function WeatherGatedAdvisory({ advisoryData, selectedLang }) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const data = advisoryData || {
    crop: 'Tomato',
    disease: 'Late Blight (Phytophthora infestans)',
    dsi: 32.5,
    riskScore: 82,
    next48hRain: 8.5, // >5mm triggers lock!
    max48hWind: 18.2, // >15km/h triggers lock!
    vernacular: {
      marathi: 'टॉमेटोवरील उशिरा येणारा करपा रोगाची लागण ३२.५% आहे. पुढील ४८ तासांत पावसाची शक्यता असल्यामुळे रासायनिक फवारणी थांबवावी. केवळ जैविक औषधे किंवा निंबोळी अर्क वापरावा.',
      hindi: 'टमाटर में पछेती झुलसा का प्रभाव 32.5% पाया गया है। अगले 48 घंटों में बारिश के कारण रासायनिक छिड़काव बंद कर दिया गया है। जैविक नियंत्रण अपनाएं।',
      english: 'Tomato Late Blight detected with 32.5% severity. SPRAY SAFETY LOCK ACTIVE due to 8.5mm predicted rainfall in next 48 hours. Avoid chemical sprays to prevent wash-off.'
    },
    ipmBioControl: 'Apply Trichoderma viride bio-fungicide (5g/L) or 5% Neem Seed Kernel Extract (NSKE). Use yellow sticky traps.',
    chemicalControl: 'Mancozeb 75% WP @ 2g/L (LOCKED UNTIL RAIN PASSES)'
  };

  const isRainLockActive = data.next48hRain >= 5.0;
  const isWindLockActive = data.max48hWind >= 15.0;
  const isLockActive = isRainLockActive || isWindLockActive;

  const handleAudioToggle = () => {
    if (isPlayingAudio) {
      stopSpeech();
      setIsPlayingAudio(false);
    } else {
      const textToSpeak = data.vernacular[selectedLang] || data.vernacular.english;
      setIsPlayingAudio(true);
      speakAdvisoryText(textToSpeak, selectedLang, () => setIsPlayingAudio(false));
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-semibold border border-emerald-500/30">
                Tier 4: Actionable Weather-Gated Management
              </span>
              <span className="text-slate-400 text-xs font-mono">Integrated Pest Management (IPM)</span>
            </div>
            <h2 className="text-xl font-bold text-slate-100 mt-2">
              Weather-Gated Spray Safety Lock & Vernacular Advisory
            </h2>
            <p className="text-slate-400 text-xs mt-1 max-w-3xl">
              Prevents pesticide expenditure waste and groundwater contamination by automatically locking chemical spray advisories when rainfall (&gt;5 mm) or high winds (&gt;15 km/h) are predicted within 24–48 hours.
            </p>
          </div>
        </div>
      </div>

      {/* Safety Lock Status Header */}
      <div className={`p-6 rounded-2xl border ${isLockActive ? 'bg-red-500/10 border-red-500/40 text-red-300' : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'} shadow-xl transition-all`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className={`p-3 rounded-2xl ${isLockActive ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
              {isLockActive ? <Lock className="h-8 w-8 animate-pulse" /> : <Shield className="h-8 w-8" />}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-black tracking-wide">
                  {isLockActive ? 'SPRAY SAFETY LOCK ACTIVE' : 'CHEMICAL SPRAY PERMITTED (WEATHER SAFE)'}
                </h3>
              </div>
              <p className="text-xs opacity-90 mt-1 max-w-2xl leading-relaxed">
                {isLockActive
                  ? 'Chemical spraying is automatically locked by AgriShield-AI to prevent pesticide wash-off into local groundwater and save inputs.'
                  : 'Weather conditions are optimal for application. Ensure personal protective equipment (PPE) during chemical handling.'}
              </p>
            </div>
          </div>

          {/* Environmental Trigger Badges */}
          <div className="flex flex-wrap gap-2">
            <div className={`px-3 py-2 rounded-xl border text-xs font-mono flex items-center space-x-1.5 ${isRainLockActive ? 'bg-red-950/80 border-red-500/50 text-red-300' : 'bg-slate-900 border-slate-700 text-slate-300'}`}>
              <Droplets className="h-4 w-4 text-sky-400" />
              <span>Rain: {data.next48hRain} mm {isRainLockActive ? '(>5mm Limit)' : ''}</span>
            </div>
            <div className={`px-3 py-2 rounded-xl border text-xs font-mono flex items-center space-x-1.5 ${isWindLockActive ? 'bg-red-950/80 border-red-500/50 text-red-300' : 'bg-slate-900 border-slate-700 text-slate-300'}`}>
              <Wind className="h-4 w-4 text-amber-400" />
              <span>Wind: {data.max48hWind} km/h {isWindLockActive ? '(>15km/h Limit)' : ''}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Vernacular Audio Advisory Player */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Low-Literacy Vernacular Voice Advisory (TTS)
            </span>
            <h3 className="text-base font-bold text-slate-100 mt-0.5">
              Target Language: <span className="text-emerald-400 capitalize">{selectedLang}</span>
            </h3>
          </div>

          <button
            onClick={handleAudioToggle}
            className={`px-5 py-3 rounded-xl font-bold text-xs flex items-center space-x-2 transition shadow-lg ${
              isPlayingAudio
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-emerald-500/20'
            }`}
          >
            {isPlayingAudio ? (
              <>
                <VolumeX className="h-4 w-4 animate-bounce" />
                <span>Stop Audio Voice</span>
              </>
            ) : (
              <>
                <Volume2 className="h-4 w-4" />
                <span>Listen to Vernacular Audio ({selectedLang.toUpperCase()})</span>
              </>
            )}
          </button>
        </div>

        {/* Advisory Speech Text Box */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-sm text-slate-200 font-serif leading-relaxed italic">
          "{data.vernacular[selectedLang] || data.vernacular.english}"
        </div>
      </div>

      {/* Actionable IPM Recommendation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Non-Chemical Biological Control (Always Active) */}
        <div className="bg-slate-800/60 border border-emerald-500/30 p-5 rounded-2xl space-y-3 shadow-xl">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-emerald-400" />
            <h3 className="font-bold text-slate-100 text-sm">Recommended Non-Chemical IPM Interventions</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            {data.ipmBioControl}
          </p>
          <ul className="text-xs text-slate-400 space-y-1.5 pt-1">
            <li className="flex items-center"><CheckCircle className="h-3.5 w-3.5 text-emerald-400 mr-2" /> Safe during rain/wind lock conditions</li>
            <li className="flex items-center"><CheckCircle className="h-3.5 w-3.5 text-emerald-400 mr-2" /> Preserves beneficial insect predators & soil microbiome</li>
            <li className="flex items-center"><CheckCircle className="h-3.5 w-3.5 text-emerald-400 mr-2" /> Zero chemical residue risk for agricultural market sale</li>
          </ul>
        </div>

        {/* Chemical Advisory (Weather Gated) */}
        <div className={`p-5 rounded-2xl border space-y-3 shadow-xl ${isLockActive ? 'bg-slate-900/80 border-slate-800 opacity-75' : 'bg-slate-800/60 border-slate-700'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Lock className={`h-5 w-5 ${isLockActive ? 'text-red-400' : 'text-slate-400'}`} />
              <h3 className="font-bold text-slate-100 text-sm">Chemical Fungicide / Insecticide Spray</h3>
            </div>
            {isLockActive && (
              <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] px-2 py-0.5 rounded font-mono font-bold">
                LOCKED
              </span>
            )}
          </div>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
            {isLockActive
              ? 'Chemical spray recommendation is currently locked due to rain/wind forecast. Re-evaluate after 48 hours.'
              : data.chemicalControl}
          </p>
          <p className="text-[11px] text-slate-400">
            Economic Threshold Level (ETL) gating prevents over-application and maintains chemical effectiveness against pathogen resistance.
          </p>
        </div>

      </div>

    </div>
  );
}