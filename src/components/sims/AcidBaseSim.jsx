import { useState } from 'react';
import { RotateCcw, Sparkles, TestTube } from 'lucide-react';

const samples = [
  { id: 'lemon', name: 'Lemon Juice', type: 'Acidic', ph: 2.2, baseColor: '#fef08a', reactedColor: '#fde047', desc: 'Citric acid. Turmeric maintains bright yellow carotenoid tone.' },
  { id: 'vinegar', name: 'Cider Vinegar', type: 'Acidic', ph: 2.9, baseColor: '#fef9c3', reactedColor: '#fde047', desc: 'Acetic acid. No alkaline reaction occurs.' },
  { id: 'water', name: 'Tap Water', type: 'Neutral', ph: 7.0, baseColor: '#e0f2fe', reactedColor: '#fef08a', desc: 'Neutral equilibrium. Natural turmeric suspension.' },
  { id: 'baking', name: 'Baking Soda Solution', type: 'Basic (Alkaline)', ph: 8.8, baseColor: '#f1f5f9', reactedColor: '#ef4444', desc: 'Sodium bicarbonate deprotonates curcumin molecules, shifting spectrum to dark red!' },
  { id: 'soap', name: 'Detergent Water', type: 'Basic (Alkaline)', ph: 10.5, baseColor: '#e2e8f0', reactedColor: '#b91c1c', desc: 'Alkaline surfactants trigger deep reddish-brown color change instantaneously.' },
];

export default function AcidBaseSim() {
  const [activeSample, setActiveSample] = useState(samples[0]);
  const [turmericAdded, setTurmericAdded] = useState(false);
  const [history, setHistory] = useState({ lemon: true });

  const selectSample = (s) => {
    setActiveSample(s);
    setTurmericAdded(false);
  };

  const addIndicator = () => {
    setTurmericAdded(true);
    setHistory((prev) => ({ ...prev, [activeSample.id]: true }));
  };

  const reset = () => {
    setTurmericAdded(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
          <div>
            <h3 className="font-semibold text-stone-900 text-sm">Natural Turmeric (Curcumin) Indicator Lab</h3>
            <p className="text-xs text-stone-500">Zero-cost kitchen chemistry substituting expensive chemical litmus</p>
          </div>
          <span className="text-xs font-mono bg-amber-50 text-amber-900 border border-amber-200 px-2.5 py-1 rounded-md">
            Indicator: Golden Turmeric
          </span>
        </div>

        <div className="p-6 space-y-6">
          {/* Reaction Vessel Visualizer */}
          <div className="relative w-full h-72 bg-gradient-to-b from-stone-50 to-stone-100 rounded-xl border border-stone-200 flex items-center justify-center p-6">
            <div className="flex items-center gap-12">
              {/* Turmeric Dropper / Spoon */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-20 bg-amber-400 rounded-lg shadow-md border-2 border-amber-500 flex flex-col items-center justify-between p-2">
                  <div className="w-4 h-3 bg-amber-700 rounded-sm" />
                  <span className="text-[9px] font-bold text-amber-950 font-mono">TURMERIC</span>
                  <div className="w-2 h-4 bg-amber-600 rounded-full" />
                </div>
                <span className="text-xs font-medium text-stone-600 mt-2">Organic Indicator</span>
              </div>

              {/* Mixing Arrow */}
              <div className="text-stone-300 font-mono text-2xl font-bold">➔</div>

              {/* Beaker / Test Cup */}
              <div className="flex flex-col items-center">
                <div className="relative w-28 h-40 border-4 border-stone-300/80 rounded-b-2xl border-t-0 bg-white/60 backdrop-blur-sm shadow-inner flex flex-col justify-end p-2 overflow-hidden">
                  {/* Grad marks */}
                  <div className="absolute left-2 top-8 w-3 h-0.5 bg-stone-300" />
                  <div className="absolute left-2 top-16 w-4 h-0.5 bg-stone-300" />
                  <div className="absolute left-2 top-24 w-3 h-0.5 bg-stone-300" />

                  {/* Liquid inside */}
                  <div
                    className="w-full rounded-b-xl transition-all duration-700 shadow-sm flex items-center justify-center"
                    style={{
                      height: '65%',
                      backgroundColor: turmericAdded ? activeSample.reactedColor : activeSample.baseColor,
                    }}
                  >
                    {turmericAdded && (
                      <span className="text-[10px] font-bold text-stone-900 bg-white/80 px-2 py-0.5 rounded-full border border-stone-300">
                        {activeSample.type.toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-xs font-semibold text-stone-900 mt-3">{activeSample.name}</span>
                <span className="text-[11px] text-stone-500 font-mono">Nominal pH: {activeSample.ph}</span>
              </div>
            </div>
          </div>

          {/* Sample Selector Buttons */}
          <div className="grid grid-cols-5 gap-2">
            {samples.map((s) => (
              <button
                key={s.id}
                onClick={() => selectSample(s)}
                className={`p-3 rounded-xl border-2 text-center transition-all ${
                  activeSample.id === s.id
                    ? 'border-stone-900 bg-stone-50 shadow-sm'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div
                  className="w-5 h-5 rounded-full mx-auto mb-1.5 border border-stone-300 shadow-xs"
                  style={{ backgroundColor: s.reactedColor }}
                />
                <div className="text-xs font-semibold text-stone-900 truncate">{s.name}</div>
                <div className="text-[10px] text-stone-500 font-mono">pH {s.ph}</div>
              </button>
            ))}
          </div>

          {/* Action trigger */}
          <div className="flex gap-3">
            <button
              onClick={addIndicator}
              disabled={turmericAdded}
              className="flex-1 bg-stone-900 text-white py-3 rounded-lg text-sm font-semibold hover:bg-stone-800 disabled:bg-stone-200 disabled:text-stone-400 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              {turmericAdded ? 'Indicator Reacted' : 'Add 3 Drops of Turmeric Solution'}
            </button>
            <button
              onClick={reset}
              className="bg-stone-100 text-stone-700 py-3 px-4 rounded-lg hover:bg-stone-200 transition-colors border border-stone-200"
              title="Reset Cup"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Chemical Explanation & Diagnostic */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm flex flex-col">
        <div className="px-6 py-4 border-b border-stone-100 bg-stone-50/50">
          <h3 className="font-semibold text-stone-900 text-sm">Chemical Mechanism</h3>
          <p className="text-xs text-stone-500">Molecular basis for color shift</p>
        </div>

        <div className="p-4 space-y-4 flex-1 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs">
              <span className="font-semibold text-stone-900 block mb-1">{activeSample.name} Analysis</span>
              <p className="text-stone-600">{activeSample.desc}</p>
            </div>

            <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200 text-xs text-amber-900">
              <span className="font-semibold block mb-1">Color Rule for Curcumin:</span>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong className="text-amber-800">Acidic (pH 0-6):</strong> Retains golden yellow</li>
                <li><strong className="text-stone-700">Neutral (pH 7):</strong> Golden yellow</li>
                <li><strong className="text-red-700">Basic (pH 8-14):</strong> Turns intense crimson/red</li>
              </ul>
            </div>

            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-600">
              <span className="font-semibold text-stone-900 block mb-1">Stain Removal Hackathon Challenge:</span>
              <span>
                Why does washing a turmeric curry stain on a white shirt with laundry detergent turn the stain bright red before turning clean?
              </span>
            </div>
          </div>

          <div className="text-[11px] text-stone-400 font-mono text-center">
            Tested: {Object.keys(history).length} of {samples.length} household solutions
          </div>
        </div>
      </div>
    </div>
  );
}
