import { useState } from 'react';

const words = 'apple banana cherry dragon elephant forest guitar harmony island jungle kingdom lantern mountain notebook ocean penguin quantum rainbow satellite thunder umbrella volcano waterfall xylophone yesterday zenith adventure bicycle calendar diamond emerald fountain galaxy helicopter imagine journey knowledge library magazine navigate orchestra panorama question restaurant symphony telescope universe velocity wonderful examine yourself zigzag'.split(' ');

export default function RandomWord() {
  const [count, setCount] = useState(5);
  const [result, setResult] = useState<string[]>([]);

  const generate = () => setResult(Array.from({length:count}, () => words[Math.floor(Math.random()*words.length)]));

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-end">
        <div><label className="text-xs text-gray-500">Words</label>
          <div className="flex gap-1">{[1,3,5,10,20].map(n => (
            <button key={n} onClick={() => setCount(n)} className={`px-3 py-2 rounded-lg text-sm ${count===n?'bg-orange-500 text-white':'bg-gray-100 text-gray-600'}`}>{n}</button>
          ))}</div></div>
      </div>
      <button onClick={generate} className="w-full py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600">📖 Generate</button>
      {result.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {result.map((w,i) => (
            <span key={i} className="px-4 py-2 bg-purple-50 text-purple-700 rounded-xl font-medium cursor-pointer hover:bg-purple-100" onClick={() => navigator.clipboard.writeText(w)}>{w}</span>
          ))}
        </div>
      )}
    </div>
  );
}
