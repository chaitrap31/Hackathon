import { useState, useEffect, useRef } from 'react';
import { Sun, Droplets, Wind, Leaf, RotateCcw } from 'lucide-react';

export default function PhotosynthesisSim() {
  const [light, setLight] = useState(50);
  const [water, setWater] = useState(50);
  const [co2, setCo2] = useState(50);
  const [days, setDays] = useState(0);
  const [growing, setGrowing] = useState(false);
  const [log, setLog] = useState([]);
  const intervalRef = useRef(null);

  const growthRate = Math.min(light, water, co2) / 100;
  const healthColor = growthRate > 0.6 ? '#10b981' : growthRate > 0.3 ? '#f59e0b' : '#ef4444';

  const plantHeight = Math.min(100, days * growthRate * 10);
  const leafCount = Math.min(8, Math.floor(plantHeight / 14));
  const oxygenBubbles = Math.floor(growthRate * days * 2.5);

  const startGrowing = () => {
    setGrowing(true);
    setDays(0);
    setLog([]);
  };

  useEffect(() => {
    if (growing) {
      intervalRef.current = setInterval(() => {
        setDays((d) => {
          const newDay = d + 1;
          if (newDay >= 10) {
            setGrowing(false);
            clearInterval(intervalRef.current);
          }
          return newDay;
        });
      }, 700);
    }
    return () => clearInterval(intervalRef.current);
  }, [growing, light, water, co2]);

  useEffect(() => {
    if (days > 0) {
      setLog((prev) => [
        ...prev,
        {
          day: days,
          height: Math.round(Math.min(100, days * growthRate * 10)),
          health: growthRate > 0.6 ? 'Optimal' : growthRate > 0.3 ? 'Stunted' : 'Wilting',
        },
      ]);
    }
  }, [days]);

  const reset = () => {
    clearInterval(intervalRef.current);
    setGrowing(false);
    setDays(0);
    setLog([]);
    setLight(50);
    setWater(50);
    setCo2(50);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
          <div>
            <h3 className="font-semibold text-stone-900 text-sm">Photosynthesis Digital Twin</h3>
            <p className="text-xs text-stone-500">Test how light, hydration, and CO₂ dictate plant vitality</p>
          </div>
          <span className="text-xs font-mono bg-stone-100 text-stone-600 px-2.5 py-1 rounded-md border border-stone-200">
            Day {days} / 10
          </span>
        </div>
        <div className="p-6 space-y-5">
          {/* Visualization Chamber */}
          <div className="relative w-full h-64 bg-gradient-to-b from-sky-50 via-stone-50 to-amber-50/30 rounded-xl border border-stone-200 overflow-hidden">
            {/* Sun / Lamp */}
            <div
              className="absolute top-4 right-6 transition-all duration-500 pointer-events-none"
              style={{ opacity: 0.2 + (light / 100) * 0.8 }}
            >
              <div className="w-12 h-12 bg-amber-400 rounded-full shadow-lg shadow-amber-200/50 flex items-center justify-center text-amber-900 font-bold text-xs">
                {light}%
              </div>
              <div className="absolute inset-0 w-12 h-12 bg-amber-300 rounded-full animate-ping opacity-25" />
            </div>

            {/* Raindrops / Sprinkler */}
            {water > 30 && (
              <div className="absolute top-2 left-10 flex gap-6 opacity-60">
                {Array.from({ length: Math.min(6, Math.floor(water / 15)) }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-3 bg-blue-400 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            )}

            {/* Ground / Soil */}
            <div className="absolute bottom-0 w-full h-16 bg-amber-950/20 border-t border-amber-900/10 flex items-center justify-center">
              <span className="text-[11px] font-mono text-stone-600 tracking-wider">MARS GREENHOUSE SOIL BED</span>
            </div>

            {/* Plant */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center">
              {/* Leaves */}
              <div className="relative flex flex-col items-center">
                {Array.from({ length: leafCount }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute transition-all duration-500"
                    style={{
                      bottom: `${14 + i * 16}px`,
                      left: i % 2 === 0 ? '-22px' : '6px',
                      transform: `rotate(${i % 2 === 0 ? '-35' : '35'}deg)`,
                    }}
                  >
                    <div
                      className="w-5 h-2.5 rounded-full shadow-sm"
                      style={{ backgroundColor: healthColor }}
                    />
                  </div>
                ))}

                {/* Stem */}
                <div
                  className="w-2.5 rounded-t-full transition-all duration-700 shadow-sm"
                  style={{
                    height: `${Math.max(16, plantHeight * 1.3)}px`,
                    backgroundColor: healthColor,
                  }}
                />
              </div>

              {/* Pot */}
              <div className="w-12 h-8 bg-amber-800 rounded-b-lg shadow-md relative -mt-0.5 border-t-2 border-amber-900">
                <div className="w-14 h-2 bg-amber-900 rounded -ml-1 -mt-2" />
              </div>
            </div>

            {/* Oxygen O2 release */}
            {oxygenBubbles > 0 && (
              <div className="absolute bottom-28 left-1/2 ml-8 flex flex-col gap-2">
                {Array.from({ length: Math.min(oxygenBubbles, 5) }).map((_, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-bold text-emerald-600 bg-emerald-100/80 px-1.5 py-0.5 rounded-full border border-emerald-200 animate-bounce"
                    style={{ animationDuration: `${1.2 + i * 0.2}s` }}
                  >
                    +O₂
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Environmental Controls */}
          <div className="space-y-3 bg-stone-50/70 p-4 rounded-xl border border-stone-200/70">
            <SliderControl
              icon={<Sun className="w-4 h-4 text-amber-500" />}
              label="Sunlight"
              value={light}
              onChange={setLight}
              disabled={growing}
              color="#f59e0b"
            />
            <SliderControl
              icon={<Droplets className="w-4 h-4 text-blue-500" />}
              label="Moisture"
              value={water}
              onChange={setWater}
              disabled={growing}
              color="#3b82f6"
            />
            <SliderControl
              icon={<Wind className="w-4 h-4 text-stone-500" />}
              label="CO₂ Chamber"
              value={co2}
              onChange={setCo2}
              disabled={growing}
              color="#78716c"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={startGrowing}
              disabled={growing}
              className="flex-1 bg-stone-900 text-white py-3 rounded-lg text-sm font-semibold hover:bg-stone-800 disabled:bg-stone-300 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Leaf className="w-4 h-4 text-emerald-400" />
              {growing ? 'Simulating 10 Days...' : 'Start 10-Day Growth Cycle'}
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

      {/* Observation Log */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm flex flex-col">
        <div className="px-6 py-4 border-b border-stone-100 bg-stone-50/50">
          <h3 className="font-semibold text-stone-900 text-sm">Empirical Log</h3>
          <p className="text-xs text-stone-500">Student recorded growth increments</p>
        </div>
        <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
          {log.length === 0 ? (
            <div className="text-center py-12 text-xs text-stone-400">
              Set variables and trigger the 10-day cycle to observe growth dynamics.
            </div>
          ) : (
            <div className="space-y-1.5 overflow-y-auto max-h-60 pr-1">
              {log.map((entry) => (
                <div
                  key={entry.day}
                  className="flex items-center justify-between bg-stone-50 rounded-lg px-3 py-2 border border-stone-100 text-xs"
                >
                  <span className="font-mono text-stone-700">Day {entry.day}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-stone-500 font-mono">{entry.height} mm</span>
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                        entry.health === 'Optimal'
                          ? 'bg-emerald-100 text-emerald-800'
                          : entry.health === 'Stunted'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {entry.health}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="bg-stone-50 rounded-lg p-3 border border-stone-200 text-xs text-stone-600 space-y-1">
            <span className="font-semibold text-stone-800 block">Critical Thinking Prompt:</span>
            <span>
              Which factor acted as the limiting agent when one value was set below 30%? How does this map to real crop drought?
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SliderControl({ icon, label, value, onChange, disabled, color }) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-xs font-medium text-stone-700 w-24">{label}</span>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        className="flex-1 h-2 rounded-full appearance-none cursor-pointer bg-stone-200 accent-stone-900 disabled:opacity-40"
      />
      <span className="text-xs font-mono text-stone-600 w-10 text-right">{value}%</span>
    </div>
  );
}
