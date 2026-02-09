import { useState } from 'react';

const diceEmoji: Record<number,string> = {1:'⚀',2:'⚁',3:'⚂',4:'⚃',5:'⚄',6:'⚅'};

export default function DiceRoller() {
  const [sides, setSides] = useState(6);
  const [count, setCount] = useState(2);
  const [results, setResults] = useState<number[]>([]);
  const [rolling, setRolling] = useState(false);

  const roll = () => {
    setRolling(true);
    setTimeout(() => {
      setResults(Array.from({length:count}, () => Math.floor(Math.random()*sides)+1));
      setRolling(false);
    }, 300);
  };

  const total = results.reduce((a,b) => a+b, 0);

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-end flex-wrap">
        <div><label className="text-xs text-gray-500">Dice</label>
          <div className="flex gap-1">{[1,2,3,4,5,6].map(n => (
            <button key={n} onClick={() => setCount(n)} className={`w-10 h-10 rounded-lg text-sm font-bold ${count===n?'bg-orange-500 text-white':'bg-gray-100 text-gray-600'}`}>{n}</button>
          ))}</div></div>
        <div><label className="text-xs text-gray-500">Sides</label>
          <div className="flex gap-1">{[4,6,8,10,12,20].map(s => (
            <button key={s} onClick={() => setSides(s)} className={`px-3 py-2 rounded-lg text-sm font-medium ${sides===s?'bg-purple-500 text-white':'bg-gray-100 text-gray-600'}`}>d{s}</button>
          ))}</div></div>
      </div>
      <button onClick={roll} className={`w-full py-4 bg-orange-500 text-white rounded-xl font-bold text-xl hover:bg-orange-600 ${rolling?'animate-pulse':''}`}>🎲 Roll!</button>
      {results.length > 0 && (
        <div className="bg-white border border-gray-100 rounded-xl p-6 text-center">
          <div className="flex justify-center gap-4 mb-4">
            {results.map((r,i) => (
              <div key={i} className="w-16 h-16 bg-gray-900 rounded-xl flex items-center justify-center">
                {sides === 6 ? <span className="text-3xl">{diceEmoji[r]}</span> : <span className="text-2xl font-bold text-orange-400">{r}</span>}
              </div>
            ))}
          </div>
          {results.length > 1 && <div className="text-3xl font-bold text-gray-900">Total: {total}</div>}
        </div>
      )}
    </div>
  );
}
