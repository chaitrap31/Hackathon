import { useState, useEffect, useRef } from 'react';
import { PlayCircle, RotateCcw, Target } from 'lucide-react';

const surfaces = {
  glossy: { name: 'Glossy Cover', friction: 0.035, color: '#bfdbfe', text: 'Low Friction', pattern: 'none' },
  rough: { name: 'Rough Paper', friction: 0.062, color: '#fed7aa', text: 'Medium Friction', pattern: 'dots' },
  cloth: { name: 'Cloth Mask', friction: 0.15, color: '#d6d3d1', text: 'High Friction', pattern: 'crosshatch' },
};

export default function FrictionSim() {
  const canvasRef = useRef(null);
  const [surface, setSurface] = useState('rough');
  const [isPlaying, setIsPlaying] = useState(false);
  const [result, setResult] = useState(null);
  const [trials, setTrials] = useState([]);
  const animRef = useRef(null);
  const stateRef = useRef({ pos: 0, vel: 0 });

  const targetMin = 45;
  const targetMax = 65;
  const v0 = 2.5;

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Sky
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.5);
    skyGrad.addColorStop(0, '#f0f9ff');
    skyGrad.addColorStop(1, '#ffffff');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h * 0.5);

    // Surface
    const surf = surfaces[surface];
    ctx.fillStyle = surf.color;
    ctx.fillRect(0, h * 0.5, w, h * 0.5);

    // Surface line
    ctx.strokeStyle = '#a8a29e';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, h * 0.5);
    ctx.lineTo(w, h * 0.5);
    ctx.stroke();

    // Pattern overlay
    if (surf.pattern === 'dots') {
      ctx.fillStyle = 'rgba(0,0,0,0.06)';
      for (let x = 5; x < w; x += 12) {
        for (let y = h * 0.5 + 5; y < h; y += 12) {
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else if (surf.pattern === 'crosshatch') {
      ctx.strokeStyle = 'rgba(0,0,0,0.08)';
      ctx.lineWidth = 1;
      for (let i = -h; i < w + h; i += 16) {
        ctx.beginPath();
        ctx.moveTo(i, h * 0.5);
        ctx.lineTo(i + h * 0.5, h);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(i + h * 0.5, h * 0.5);
        ctx.lineTo(i, h);
        ctx.stroke();
      }
    }

    // Ramp
    ctx.fillStyle = '#78716c';
    ctx.beginPath();
    ctx.moveTo(0, h * 0.2);
    ctx.lineTo(80, h * 0.5);
    ctx.lineTo(0, h * 0.5);
    ctx.closePath();
    ctx.fill();

    // Ramp highlight
    ctx.fillStyle = '#a8a29e';
    ctx.beginPath();
    ctx.moveTo(0, h * 0.2);
    ctx.lineTo(80, h * 0.5);
    ctx.lineTo(0, h * 0.23);
    ctx.closePath();
    ctx.fill();

    // Target zone
    const tx1 = 80 + (targetMin / 100) * (w - 80);
    const tx2 = 80 + (targetMax / 100) * (w - 80);
    ctx.fillStyle = 'rgba(34, 197, 94, 0.15)';
    ctx.fillRect(tx1, h * 0.25, tx2 - tx1, h * 0.25);
    ctx.strokeStyle = 'rgba(34, 197, 94, 0.4)';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(tx1, h * 0.25, tx2 - tx1, h * 0.25);
    ctx.setLineDash([]);

    // Target label
    ctx.fillStyle = 'rgba(22, 101, 52, 0.6)';
    ctx.font = '10px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('TARGET ZONE', (tx1 + tx2) / 2, h * 0.48);

    // Target icon
    const tcx = (tx1 + tx2) / 2;
    ctx.strokeStyle = 'rgba(22, 101, 52, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(tcx, h * 0.38, 8, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(tcx, h * 0.38, 4, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = 'rgba(22, 101, 52, 0.4)';
    ctx.beginPath();
    ctx.arc(tcx, h * 0.38, 2, 0, Math.PI * 2);
    ctx.fill();

    // Eraser/Package
    const blockX = 80 + (stateRef.current.pos / 100) * (w - 80) * 0.85;
    const blockW = 44;
    const blockH = 28;
    const blockY = h * 0.5 - blockH;

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(blockX - blockW / 2 + 3, blockY + 3, blockW, blockH);

    // Block
    const grad = ctx.createLinearGradient(blockX - blockW / 2, blockY, blockX - blockW / 2, blockY + blockH);
    grad.addColorStop(0, '#ec4899');
    grad.addColorStop(1, '#be185d');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(blockX - blockW / 2, blockY, blockW, blockH, 4);
    ctx.fill();

    // Block label
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.font = 'bold 9px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('PKG', blockX, blockY + blockH / 2 + 3);

    // Distance marker
    if (stateRef.current.pos > 0) {
      ctx.fillStyle = '#78716c';
      ctx.font = '11px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(`${Math.round(stateRef.current.pos)}%`, blockX, blockY - 8);
    }
  };

  const animate = () => {
    const s = stateRef.current;
    if (s.vel > 0) {
      s.vel -= surfaces[surface].friction;
      if (s.vel < 0) s.vel = 0;
      s.pos += s.vel;
      draw();
      animRef.current = requestAnimationFrame(animate);
    } else {
      setIsPlaying(false);
      // Determine outcome
      let res;
      if (s.pos < targetMin) res = { msg: 'Stopped early — too much friction', type: 'slow' };
      else if (s.pos > targetMax) res = { msg: 'Flew past target — too little friction', type: 'fast' };
      else res = { msg: 'Perfect landing!', type: 'perfect' };
      setResult(res);
      setTrials((prev) => [
        ...prev,
        { surface: surfaces[surface].name, distance: Math.round(s.pos), result: res.type },
      ]);
      draw();
    }
  };

  const start = () => {
    cancelAnimationFrame(animRef.current);
    stateRef.current = { pos: 0, vel: v0 };
    setResult(null);
    setIsPlaying(true);
    animRef.current = requestAnimationFrame(animate);
  };

  const reset = () => {
    cancelAnimationFrame(animRef.current);
    stateRef.current = { pos: 0, vel: 0 };
    setResult(null);
    setIsPlaying(false);
    draw();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.getContext('2d').scale(dpr, dpr);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      draw();
    }
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  useEffect(() => { draw(); }, [surface]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Simulation */}
      <div className="lg:col-span-2 bg-white rounded-xl border border-stone-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
          <h3 className="font-semibold text-stone-900 text-sm">Friction Simulation</h3>
          <span className="text-xs text-stone-400">Interactive Physics</span>
        </div>
        <div className="p-6 space-y-5">
          <canvas
            ref={canvasRef}
            className="w-full h-48 rounded-lg border border-stone-200"
            style={{ imageRendering: 'auto' }}
          />

          {/* Result */}
          <div className="h-8 flex items-center justify-center">
            {result ? (
              <p
                className={`text-sm font-semibold ${
                  result.type === 'perfect'
                    ? 'text-emerald-600'
                    : result.type === 'fast'
                    ? 'text-blue-600'
                    : 'text-stone-500'
                }`}
              >
                {result.type === 'perfect' && '✓ '}
                {result.msg}
              </p>
            ) : (
              <p className="text-xs text-stone-400">Select a surface and release the package</p>
            )}
          </div>

          {/* Surface selector */}
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(surfaces).map(([key, data]) => (
              <button
                key={key}
                disabled={isPlaying}
                onClick={() => { setSurface(key); reset(); }}
                className={`p-3 rounded-lg border-2 text-center transition-all ${
                  surface === key
                    ? 'border-stone-900 bg-stone-50'
                    : 'border-stone-200 hover:border-stone-300'
                } ${isPlaying ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="text-sm font-medium text-stone-900">{data.name}</div>
                <div className="text-xs text-stone-400 mt-0.5">{data.text}</div>
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex gap-3">
            <button
              onClick={start}
              disabled={isPlaying}
              className="flex-1 bg-stone-900 text-white py-3 rounded-lg text-sm font-semibold hover:bg-stone-800 disabled:bg-stone-300 transition-colors flex items-center justify-center gap-2"
            >
              <PlayCircle className="w-4 h-4" /> Release Package
            </button>
            <button
              onClick={reset}
              className="bg-stone-100 text-stone-700 py-3 px-4 rounded-lg hover:bg-stone-200 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Trial Log */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-100">
          <h3 className="font-semibold text-stone-900 text-sm">Trial Log</h3>
          <p className="text-xs text-stone-400 mt-0.5">Test all surfaces to compare</p>
        </div>
        <div className="p-4">
          {trials.length === 0 ? (
            <div className="text-center py-8 text-xs text-stone-400">
              No trials yet — start testing!
            </div>
          ) : (
            <div className="space-y-2">
              {trials.map((trial, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-stone-50 rounded-lg px-3 py-2.5"
                >
                  <div>
                    <div className="text-xs font-medium text-stone-700">{trial.surface}</div>
                    <div className="text-xs text-stone-400">Distance: {trial.distance}%</div>
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      trial.result === 'perfect'
                        ? 'bg-emerald-100 text-emerald-700'
                        : trial.result === 'fast'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-stone-200 text-stone-600'
                    }`}
                  >
                    {trial.result === 'perfect' ? '✓ Hit' : trial.result === 'fast' ? 'Overshot' : 'Short'}
                  </span>
                </div>
              ))}
            </div>
          )}

          {trials.length >= 3 && (
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-xs font-semibold text-amber-800 mb-1">💡 Discussion Prompt</p>
              <p className="text-xs text-amber-700 leading-relaxed">
                Which surface worked best? Why does roughness affect how far the package slides?
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
