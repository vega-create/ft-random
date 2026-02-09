import { useState } from 'react';

export default function CoinFlipper() {
  const [result, setResult] = useState<'heads'|'tails'|null>(null);
  const [flipping, setFlipping] = useState(false);
  const [stats, setStats] = useState({heads:0,tails:0});

  const flip = () => {
    setFlipping(true);
    setTimeout(() => {
      const r = Math.random() < 0.5 ? 'heads' : 'tails';
      setResult(r);
      setStats(prev => ({...prev, [r]: prev[r]+1}));
      setFlipping(false);
    }, 500);
  };

  const total = stats.heads + stats.tails;

  return (
    <div className="space-y-6 text-center">
      <div className={`w-40 h-40 mx-auto rounded-full flex items-center justify-center text-6xl shadow-lg ${flipping ? 'animate-spin' : ''} ${result === 'heads' ? 'bg-yellow-400' : result === 'tails' ? 'bg-gray-300' : 'bg-gray-200'}`}>
        {result === 'heads' ? '👑' : result === 'tails' ? '🦅' : '🪙'}
      </div>
      {result && <div className="text-3xl font-bold text-gray-900 uppercase">{result}!</div>}
      <button onClick={flip} disabled={flipping} className="w-full max-w-xs mx-auto py-4 bg-orange-500 text-white rounded-xl font-bold text-xl hover:bg-orange-600 disabled:opacity-50">🪙 Flip!</button>
      {total > 0 && (
        <div className="flex justify-center gap-8">
          <div className="text-center"><div className="text-2xl font-bold text-yellow-500">{stats.heads}</div><div className="text-sm text-gray-500">Heads ({total?(stats.heads/total*100).toFixed(0):0}%)</div></div>
          <div className="text-center"><div className="text-2xl font-bold text-gray-500">{stats.tails}</div><div className="text-sm text-gray-500">Tails ({total?(stats.tails/total*100).toFixed(0):0}%)</div></div>
        </div>
      )}
      {total > 0 && <button onClick={() => {setStats({heads:0,tails:0});setResult(null);}} className="text-sm text-gray-400 hover:text-gray-600">Reset stats</button>}
    </div>
  );
}
