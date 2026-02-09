import { useState } from 'react';

export default function RandomColor() {
  const [colors, setColors] = useState<{hex:string;r:number;g:number;b:number}[]>([]);
  const [count, setCount] = useState(6);

  const generate = () => {
    setColors(Array.from({length:count}, () => {
      const r = Math.floor(Math.random()*256), g = Math.floor(Math.random()*256), b = Math.floor(Math.random()*256);
      return { hex: '#' + [r,g,b].map(v => v.toString(16).padStart(2,'0')).join(''), r, g, b };
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-end">
        {[1,3,6,9,12].map(n => (
          <button key={n} onClick={() => setCount(n)} className={`px-3 py-2 rounded-lg text-sm ${count===n?'bg-orange-500 text-white':'bg-gray-100 text-gray-600'}`}>{n}</button>
        ))}
      </div>
      <button onClick={generate} className="w-full py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600">🎨 Generate Colors</button>
      {colors.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {colors.map((c,i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl overflow-hidden cursor-pointer" onClick={() => navigator.clipboard.writeText(c.hex)}>
              <div className="h-24 rounded-t-xl" style={{backgroundColor:c.hex}} />
              <div className="p-3 text-center">
                <div className="font-mono font-bold text-sm">{c.hex}</div>
                <div className="text-xs text-gray-400">rgb({c.r}, {c.g}, {c.b})</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
