import { useState } from 'react';

export default function RandomPicker() {
  const [input, setInput] = useState('');
  const [pick, setPick] = useState(1);
  const [results, setResults] = useState<string[]>([]);

  const pickItems = () => {
    const items = input.split('\n').filter(s => s.trim());
    if (items.length === 0) return;
    const shuffled = [...items].sort(() => Math.random()-0.5);
    setResults(shuffled.slice(0, Math.min(pick, items.length)));
  };

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Enter items (one per line)..." className="w-full h-40 p-4 border border-gray-200 rounded-xl text-sm outline-none" />
      <div className="flex gap-3 items-end">
        <div><label className="text-xs text-gray-500">Pick</label><input type="number" value={pick} onChange={e => setPick(Math.max(1,+e.target.value))} min="1" className="w-20 px-3 py-2 border border-gray-200 rounded-lg" /></div>
        <button onClick={pickItems} className="flex-1 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600">🎯 Pick!</button>
      </div>
      {results.length > 0 && (
        <div className="bg-purple-50 rounded-xl p-6 text-center">
          {results.length === 1 ? (
            <div className="text-4xl font-bold text-purple-700">{results[0]}</div>
          ) : (
            <div className="space-y-2">{results.map((r,i) => (
              <div key={i} className="text-xl font-bold text-purple-700">{i+1}. {r}</div>
            ))}</div>
          )}
        </div>
      )}
    </div>
  );
}
