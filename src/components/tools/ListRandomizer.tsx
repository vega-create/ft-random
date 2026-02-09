import { useState } from 'react';

export default function ListRandomizer() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string[]>([]);

  const shuffle = () => {
    const items = input.split('\n').filter(s => s.trim());
    for (let i = items.length-1; i > 0; i--) { const j = Math.floor(Math.random()*(i+1)); [items[i],items[j]]=[items[j],items[i]]; }
    setResult([...items]);
  };

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Item 1\nItem 2\nItem 3\n..." className="w-full h-40 p-4 border border-gray-200 rounded-xl text-sm outline-none" />
      <button onClick={shuffle} className="w-full py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600">📋 Shuffle!</button>
      {result.length > 0 && (
        <div className="space-y-1">
          {result.map((item, i) => (
            <div key={i} className="flex items-center gap-3 bg-white border border-gray-100 rounded-lg p-3">
              <span className="w-8 h-8 bg-orange-100 text-orange-700 rounded-lg flex items-center justify-center font-bold text-sm">{i+1}</span>
              <span className="text-gray-900">{item}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
