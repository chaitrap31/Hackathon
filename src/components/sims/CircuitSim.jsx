import { useState } from 'react';
import { Zap, RotateCcw, AlertTriangle, Lightbulb } from 'lucide-react';

export default function CircuitSim() {
  const [circuitType, setCircuitType] = useState('series');
  const [bulb1, setBulb1] = useState(true);
  const [bulb2, setBulb2] = useState(true);
  const [batteryOn, setBatteryOn] = useState(true);

  const isSeries = circuitType === 'series';

  // Series: if any bulb is broken or battery off, none light up
  // Parallel: each bulb works independently if battery is on
  const bulb1Lit = batteryOn && bulb1 && (isSeries ? bulb2 : true);
  const bulb2Lit = batteryOn && bulb2 && (isSeries ? bulb1 : true);

  // In series, voltage divides (bulbs dimmer)
  const brightness1 = bulb1Lit ? (isSeries ? 0.55 : 1) : 0;
  const brightness2 = bulb2Lit ? (isSeries ? 0.55 : 1) : 0;

  const reset = () => {
    setBulb1(true);
    setBulb2(true);
    setBatteryOn(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
          <div>
            <h3 className="font-semibold text-stone-900 text-sm">Emergency Grid Circuit Sandbox</h3>
            <p className="text-xs text-stone-500">Test Series vs Parallel redundancy for municipal infrastructure</p>
          </div>
          <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-stone-100 text-stone-800 border border-stone-200">
            {isSeries ? 'Series (Single Loop)' : 'Parallel (Dual Branch)'}
          </span>
        </div>

        <div className="p-6 space-y-6">
          {/* Circuit Canvas Visualizer */}
          <div className="relative w-full h-72 bg-stone-900 rounded-xl border border-stone-800 flex items-center justify-center p-4 overflow-hidden">
            <svg viewBox="0 0 460 260" className="w-full h-full max-w-lg select-none">
              <defs>
                <filter id="glow-gold" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Grid backdrop */}
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Battery Source */}
              <g transform="translate(30, 95)">
                <rect x="0" y="0" width="45" height="70" rx="6" fill={batteryOn ? '#1e293b' : '#334155'} stroke="#475569" strokeWidth="2" />
                <rect x="14" y="-8" width="17" height="9" rx="2" fill={batteryOn ? '#ef4444' : '#64748b'} />
                <text x="22" y="32" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">9V</text>
                <text x="22" y="52" textAnchor="middle" fill={batteryOn ? '#22c55e' : '#e2e8f0'} fontSize="14" fontWeight="bold">
                  {batteryOn ? '+' : 'OFF'}
                </text>
              </g>

              {isSeries ? (
                <>
                  {/* Series Wiring */}
                  <path
                    d="M 75 110 L 160 110"
                    stroke={bulb1Lit ? '#f59e0b' : '#475569'}
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 220 110 L 280 110"
                    stroke={bulb1Lit && bulb2Lit ? '#f59e0b' : '#475569'}
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 340 110 L 410 110 L 410 200 L 52 200 L 52 165"
                    stroke={bulb1Lit && bulb2Lit ? '#f59e0b' : '#475569'}
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* Node 1 - Hospital Bulb */}
                  <g transform="translate(190, 110)">
                    <circle cx="0" cy="0" r="30" fill={bulb1Lit ? `rgba(245, 158, 11, ${brightness1 * 0.25})` : '#1e293b'} stroke={bulb1 ? '#cbd5e1' : '#ef4444'} strokeWidth="2" filter={bulb1Lit ? "url(#glow-gold)" : undefined} />
                    <circle cx="0" cy="0" r="14" fill={bulb1Lit ? '#fbbf24' : bulb1 ? '#475569' : '#1e1e24'} />
                    <text x="0" y="44" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="600">Hospital ICU</text>
                    <text x="0" y="57" textAnchor="middle" fill="#94a3b8" fontSize="9">{bulb1 ? (bulb1Lit ? `${Math.round(brightness1*100)}% Glow` : 'No Current') : 'BURNT OUT'}</text>
                  </g>

                  {/* Node 2 - School Bulb */}
                  <g transform="translate(310, 110)">
                    <circle cx="0" cy="0" r="30" fill={bulb2Lit ? `rgba(245, 158, 11, ${brightness2 * 0.25})` : '#1e293b'} stroke={bulb2 ? '#cbd5e1' : '#ef4444'} strokeWidth="2" filter={bulb2Lit ? "url(#glow-gold)" : undefined} />
                    <circle cx="0" cy="0" r="14" fill={bulb2Lit ? '#fbbf24' : bulb2 ? '#475569' : '#1e1e24'} />
                    <text x="0" y="44" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="600">School Shelter</text>
                    <text x="0" y="57" textAnchor="middle" fill="#94a3b8" fontSize="9">{bulb2 ? (bulb2Lit ? `${Math.round(brightness2*100)}% Glow` : 'No Current') : 'BURNT OUT'}</text>
                  </g>
                </>
              ) : (
                <>
                  {/* Parallel Wiring */}
                  <path d="M 75 110 L 130 110" stroke={batteryOn ? '#f59e0b' : '#475569'} strokeWidth="4" />
                  <path d="M 130 110 L 130 65 L 200 65" stroke={bulb1Lit ? '#f59e0b' : '#475569'} strokeWidth="4" fill="none" />
                  <path d="M 260 65 L 360 65 L 360 110" stroke={bulb1Lit ? '#f59e0b' : '#475569'} strokeWidth="4" fill="none" />

                  <path d="M 130 110 L 130 155 L 200 155" stroke={bulb2Lit ? '#f59e0b' : '#475569'} strokeWidth="4" fill="none" />
                  <path d="M 260 155 L 360 155 L 360 110" stroke={bulb2Lit ? '#f59e0b' : '#475569'} strokeWidth="4" fill="none" />

                  <path d="M 360 110 L 410 110 L 410 215 L 52 215 L 52 165" stroke={batteryOn && (bulb1Lit || bulb2Lit) ? '#f59e0b' : '#475569'} strokeWidth="4" fill="none" />

                  {/* Node 1 Top - Hospital */}
                  <g transform="translate(230, 65)">
                    <circle cx="0" cy="0" r="28" fill={bulb1Lit ? `rgba(245, 158, 11, ${brightness1 * 0.35})` : '#1e293b'} stroke={bulb1 ? '#cbd5e1' : '#ef4444'} strokeWidth="2" filter={bulb1Lit ? "url(#glow-gold)" : undefined} />
                    <circle cx="0" cy="0" r="14" fill={bulb1Lit ? '#fbbf24' : bulb1 ? '#475569' : '#1e1e24'} />
                    <text x="50" y="4" fill="#e2e8f0" fontSize="11" fontWeight="600">Hospital ICU</text>
                    <text x="50" y="18" fill="#94a3b8" fontSize="9">{bulb1Lit ? '100% Brightness' : 'Offline'}</text>
                  </g>

                  {/* Node 2 Bottom - School */}
                  <g transform="translate(230, 155)">
                    <circle cx="0" cy="0" r="28" fill={bulb2Lit ? `rgba(245, 158, 11, ${brightness2 * 0.35})` : '#1e293b'} stroke={bulb2 ? '#cbd5e1' : '#ef4444'} strokeWidth="2" filter={bulb2Lit ? "url(#glow-gold)" : undefined} />
                    <circle cx="0" cy="0" r="14" fill={bulb2Lit ? '#fbbf24' : bulb2 ? '#475569' : '#1e1e24'} />
                    <text x="50" y="4" fill="#e2e8f0" fontSize="11" fontWeight="600">School Shelter</text>
                    <text x="50" y="18" fill="#94a3b8" fontSize="9">{bulb2Lit ? '100% Brightness' : 'Offline'}</text>
                  </g>
                </>
              )}
            </svg>
          </div>

          {/* Interactive Circuit Switchers */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => { setCircuitType('series'); reset(); }}
              className={`p-3.5 rounded-xl border-2 text-left transition-all ${
                isSeries
                  ? 'border-stone-900 bg-stone-50 shadow-sm'
                  : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              <div className="font-semibold text-stone-900 text-sm">Series Wiring</div>
              <div className="text-xs text-stone-500 mt-0.5">Sequential path: single break disables entire circuit.</div>
            </button>
            <button
              onClick={() => { setCircuitType('parallel'); reset(); }}
              className={`p-3.5 rounded-xl border-2 text-left transition-all ${
                !isSeries
                  ? 'border-stone-900 bg-stone-50 shadow-sm'
                  : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              <div className="font-semibold text-stone-900 text-sm">Parallel Wiring</div>
              <div className="text-xs text-stone-500 mt-0.5">Dual branching: components operate autonomously.</div>
            </button>
          </div>

          {/* Fault Simulation Toggles */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setBatteryOn(!batteryOn)}
              className={`p-3 rounded-lg border text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                batteryOn
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-stone-100 border-stone-300 text-stone-600'
              }`}
            >
              <Zap className="w-4 h-4 text-emerald-600" />
              Generator: {batteryOn ? 'Online' : 'Cut'}
            </button>
            <button
              onClick={() => setBulb1(!bulb1)}
              className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                bulb1
                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                  : 'bg-rose-50 border-rose-300 text-rose-800 line-through'
              }`}
            >
              Hospital Bulb: {bulb1 ? 'Intact' : 'Broken'}
            </button>
            <button
              onClick={() => setBulb2(!bulb2)}
              className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                bulb2
                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                  : 'bg-rose-50 border-rose-300 text-rose-800 line-through'
              }`}
            >
              School Bulb: {bulb2 ? 'Intact' : 'Broken'}
            </button>
          </div>
        </div>
      </div>

      {/* Engineering Diagnostic */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm flex flex-col">
        <div className="px-6 py-4 border-b border-stone-100 bg-stone-50/50">
          <h3 className="font-semibold text-stone-900 text-sm">Real-World Analysis</h3>
          <p className="text-xs text-stone-500">How theory connects to civic architecture</p>
        </div>

        <div className="p-4 space-y-4 flex-1 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wide block mb-1">
                Hospital Ward Power Status
              </span>
              <span className={`text-sm font-bold ${bulb1Lit ? 'text-emerald-700' : 'text-rose-600'}`}>
                {bulb1Lit ? '● Operational (Powered)' : '○ Power Failure'}
              </span>
            </div>

            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wide block mb-1">
                School Shelter Power Status
              </span>
              <span className={`text-sm font-bold ${bulb2Lit ? 'text-emerald-700' : 'text-rose-600'}`}>
                {bulb2Lit ? '● Operational (Powered)' : '○ Power Failure'}
              </span>
            </div>

            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-600 space-y-1">
              <div className="font-semibold text-stone-800 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                Engineering Takeaway:
              </div>
              <p>
                {isSeries
                  ? 'In a series circuit, each load increases resistance and drops shared voltage. If one fuse trips or wire snaps, the whole municipal sector goes dark.'
                  : 'In a parallel circuit, both municipal zones receive dedicated potential difference. Failure at the school does NOT compromise critical ICU operations.'}
              </p>
            </div>
          </div>

          <button
            onClick={reset}
            className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 py-2.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2 border border-stone-200"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Grid Defaults
          </button>
        </div>
      </div>
    </div>
  );
}
