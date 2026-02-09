import { useState } from 'react';

export default function RandomNumber() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [unique, setUnique] = useState(false);
  const [results, setResults] = useState<number[]>([]);

  const generate = () => {
    if (unique && count > max - min + 1) { alert('Not enough unique numbers in range'); return; }
    const nums: number[] = [];
    if (unique) {
      const pool = Array.from({length: max-min+1}, (_,i) => min+i);
      for (let i = pool.length-1; i > 0; i--) { const j = Math.floor(Math.random()*(i+1)); [pool[i],pool[j]]=[pool[j],pool[i]]; }
      nums.push(...pool.slice(0, count));
    } else {
      for (let i = 0; i < count; i++) nums.push(Math.floor(Math.random()*(max-min+1))+min);
    }
    setResults(nums);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div><label className="text-xs text-gray-500">Min</label><input type="number" value={min} onChange={e => setMin(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" /></div>
        <div><label className="text-xs text-gray-500">Max</label><input type="number" value={max} onChange={e => setMax(+e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" /></div>
        <div><label className="text-xs text-gray-500">Count</label><input type="number" value={count} onChange={e => setCount(Math.max(1,+e.target.value))} min="1" max="1000" className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" /></div>
      </div>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={unique} onChange={e => setUnique(e.target.checked)} className="accent-orange-500" />No duplicates</label>
      <button onClick={generate} className="w-full py-3 bg-orange-500 text-white rounded-xl font-bold text-lg hover:bg-orange-600">🎲 Generate</button>
      {results.length > 0 && (
        <div className="bg-white border border-gray-100 rounded-xl p-6 text-center">
          {results.length === 1 ? (
            <div className="text-6xl font-bold text-orange-500">{results[0]}</div>
          ) : (
            <div className="flex flex-wrap gap-2 justify-center">{results.map((n,i) => (
              <span key={i} className="px-3 py-2 bg-orange-50 text-orange-700 rounded-lg font-mono font-bold">{n}</span>
            ))}</div>
          )}
          <button onClick={() => navigator.clipboard.writeText(results.join(', '))} className="mt-3 text-sm text-gray-400 hover:text-gray-600">Copy all</button>
        </div>
      )}
    </div>
  );
}
