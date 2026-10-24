import { useState, useEffect, useRef } from 'react';
import { Sun, Thermometer, PlayCircle, RotateCcw, CloudRain, Droplet } from 'lucide-react';

export default function WaterCycleSim() {
  const [temperature, setTemperature] = useState(32);
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [stage, setStage] = useState('idle');
  const intervalRef = useRef(null);

  const evapRate = Math.max(0.1, (temperature - 10) / 40);
  const waterLevel = Math.max(18, 55 - time * evapRate * 1.4);
  const condensationLevel = Math.min(100, Math.max(0, (time - 5) * 8 * evapRate));
  const precipitationLevel = condensationLevel > 65 ? (condensationLevel - 65) / 35 : 0;

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime((t) => {
          const next = t + 1;
          if (next <= 8) setStage('evaporation');
          else if (next <= 18) setStage('condensation');
          else if (next <= 26) setStage('precipitation');
          else {
            setRunning(false);
            clearInterval(intervalRef.current);
            setStage('complete');
          }
          return next;
        });
      }, 650);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const reset = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setTime(0);
    setStage('idle');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
          <div>
            <h3 className="font-semibold text-stone-900 text-sm">Miniature Biosphere in a Ziplock</h3>
            <p className="text-xs text-stone-500">Zero-cost baggie taped to a window observing thermodynamic phases</p>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-md font-mono border ${
            stage === 'evaporation' ? 'bg-amber-50 text-amber-800 border-amber-200' :
            stage === 'condensation' ? 'bg-blue-50 text-blue-800 border-blue-200' :
            stage === 'precipitation' ? 'bg-indigo-50 text-indigo-800 border-indigo-200' :
            stage === 'complete' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
            'bg-stone-100 text-stone-600 border-stone-200'
          }`}>
            Phase: {stage.toUpperCase()}
          </span>
        </div>

        <div className="p-6 space-y-6">
          {/* Chamber Visualization */}
          <div className="relative w-full h-72 bg-gradient-to-b from-sky-100 via-sky-50 to-amber-50/40 rounded-xl border border-sky-200 overflow-hidden flex items-center justify-center p-4">
            {/* Sun Rays */}
            <div className="absolute top-3 right-6 pointer-events-none transition-all duration-700" style={{ opacity: 0.3 + (temperature / 50) * 0.7 }}>
              <div className="w-14 h-14 bg-amber-400 rounded-full shadow-xl shadow-amber-300/40 flex items-center justify-center text-amber-900 font-bold text-xs">
                {temperature}°C
              </div>
            </div>

            {/* Window Pane Lines */}
            <div className="absolute inset-x-0 top-1/2 h-0.5 bg-sky-200/50 pointer-events-none" />
            <div className="absolute inset-y-0 left-1/2 w-0.5 bg-sky-200/50 pointer-events-none" />

            {/* Ziplock Bag Representation */}
            <div className="relative w-64 h-56 rounded-2xl bg-white/40 backdrop-blur-sm border-2 border-sky-300/80 shadow-lg overflow-hidden flex flex-col justify-between">
              {/* Bag Seal */}
              <div className="h-4 bg-sky-300/40 border-b border-sky-300 flex items-center justify-center">
                <div className="w-40 h-1 bg-sky-500/60 rounded-full" />
              </div>

              {/* Condensation Droplets clinging to top inside wall */}
              {condensationLevel > 10 && (
                <div className="px-4 py-2 flex flex-wrap gap-2 justify-center transition-opacity duration-500" style={{ opacity: Math.min(1, condensationLevel / 70) }}>
                  {Array.from({ length: 14 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-full bg-sky-400 shadow-sm"
                      style={{
                        width: `${4 + (i % 3) * 3}px`,
                        height: `${4 + (i % 3) * 3}px`,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Precipitation Streams falling down */}
              {precipitationLevel > 0 && (
                <div className="absolute inset-0 flex justify-around pointer-events-none pt-12 pb-16">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-0.5 bg-sky-500 rounded-full animate-bounce"
                      style={{
                        height: `${12 + (i % 3) * 10}px`,
                        animationDuration: `${0.8 + i * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Rising Vapor Particles */}
              {(stage === 'evaporation' || stage === 'condensation') && (
                <div className="absolute bottom-16 inset-x-0 flex justify-around opacity-60">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className="text-sky-500 font-bold text-xs animate-pulse"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    >
                      ↑
                    </span>
                  ))}
                </div>
              )}

              {/* Liquid Water Pool at Base */}
              <div
                className="w-full bg-sky-400/50 border-t border-sky-400 transition-all duration-700 relative overflow-hidden flex items-center justify-center"
                style={{ height: `${waterLevel}%` }}
              >
                <span className="text-[10px] font-mono text-sky-900 font-semibold tracking-wider">
                  COLLECTION RESERVOIR
                </span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4 bg-stone-50/70 p-4 rounded-xl border border-stone-200/70">
            <div className="flex items-center gap-3">
              <Thermometer className="w-4 h-4 text-rose-500" />
              <span className="text-xs font-medium text-stone-700 w-32">Window Solar Exposure</span>
              <input
                type="range"
                min="15"
                max="45"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                disabled={running}
                className="flex-1 h-2 rounded-full appearance-none cursor-pointer bg-stone-200 accent-stone-900 disabled:opacity-40"
              />
              <span className="text-xs font-mono text-stone-700 w-12 text-right">{temperature}°C</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => { setRunning(true); setTime(0); setStage('evaporation'); }}
              disabled={running}
              className="flex-1 bg-stone-900 text-white py-3 rounded-lg text-sm font-semibold hover:bg-stone-800 disabled:bg-stone-300 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <PlayCircle className="w-4 h-4 text-sky-400" />
              {running ? 'Observing Phase Changes...' : 'Initiate Sunlight Cycle'}
            </button>
            <button
              onClick={reset}
              className="bg-stone-100 text-stone-700 py-3 px-4 rounded-lg hover:bg-stone-200 transition-colors border border-stone-200"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Classroom Guide Column */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm flex flex-col">
        <div className="px-6 py-4 border-b border-stone-100 bg-stone-50/50">
          <h3 className="font-semibold text-stone-900 text-sm">Phenomenon Sequence</h3>
          <p className="text-xs text-stone-500">Connecting tactile plastic bag to planet Earth</p>
        </div>

        <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            {[
              {
                id: 'evaporation',
                name: '1. Evaporation',
                desc: 'Solar thermal energy turns liquid into invisible vapor gas molecules.',
                active: stage === 'evaporation',
              },
              {
                id: 'condensation',
                name: '2. Condensation',
                desc: 'Vapor contacts the cooler plastic surface, forming visible beads/cloud droplets.',
                active: stage === 'condensation',
              },
              {
                id: 'precipitation',
                name: '3. Precipitation',
                desc: 'Beads aggregate until gravitational mass overcomes surface tension, trickling down.',
                active: stage === 'precipitation' || stage === 'complete',
              },
            ].map((step) => (
              <div
                key={step.id}
                className={`p-3 rounded-lg border text-xs transition-all ${
                  step.active
                    ? 'bg-sky-50 border-sky-300 text-sky-900 font-medium'
                    : 'bg-stone-50 border-stone-200 text-stone-600'
                }`}
              >
                <div className="font-semibold text-stone-900 mb-0.5">{step.name}</div>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-xs text-stone-600">
            <span className="font-semibold text-stone-800 block mb-1">Drought Discussion Question:</span>
            <span>
              If a city builds a reservoir in direct extreme heat without tree coverage, what percentage of freshwater is lost to evaporation every dry season?
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
