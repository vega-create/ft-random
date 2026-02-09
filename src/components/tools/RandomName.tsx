import { useState } from 'react';

const first = ['James','Mary','John','Patricia','Robert','Jennifer','Michael','Linda','David','Elizabeth','William','Barbara','Richard','Susan','Joseph','Jessica','Thomas','Sarah','Charles','Karen','Emma','Olivia','Ava','Sophia','Isabella','Mia','Charlotte','Amelia','Harper','Evelyn','Liam','Noah','Oliver','Elijah','Lucas','Mason','Logan','Alexander','Ethan','Jacob'];
const last = ['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Rodriguez','Martinez','Anderson','Taylor','Thomas','Moore','Jackson','Martin','Lee','Thompson','White','Harris','Clark','Lewis','Robinson','Walker','Young','Allen','King','Wright','Scott','Hill','Green','Baker','Adams','Nelson','Campbell','Mitchell','Roberts','Carter','Phillips','Evans'];

export default function RandomName() {
  const [count, setCount] = useState(5);
  const [type, setType] = useState<'full'|'first'|'last'>('full');
  const [names, setNames] = useState<string[]>([]);

  const generate = () => {
    setNames(Array.from({length:count}, () => {
      const f = first[Math.floor(Math.random()*first.length)];
      const l = last[Math.floor(Math.random()*last.length)];
      return type === 'first' ? f : type === 'last' ? l : `${f} ${l}`;
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-end flex-wrap">
        {(['full','first','last'] as const).map(t => (
          <button key={t} onClick={() => setType(t)} className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${type===t?'bg-orange-500 text-white':'bg-gray-100 text-gray-600'}`}>{t} name</button>
        ))}
        <div><label className="text-xs text-gray-500">Count</label><input type="number" value={count} onChange={e => setCount(Math.max(1,+e.target.value))} min="1" max="50" className="w-20 px-3 py-2 border border-gray-200 rounded-lg" /></div>
      </div>
      <button onClick={generate} className="w-full py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600">👤 Generate</button>
      {names.length > 0 && (
        <div className="space-y-2">
          {names.map((n,i) => (
            <div key={i} className="flex items-center justify-between bg-white border border-gray-100 rounded-lg p-3">
              <span className="font-medium text-gray-900">{n}</span>
              <button onClick={() => navigator.clipboard.writeText(n)} className="text-xs text-gray-400 hover:text-orange-500">Copy</button>
            </div>
          ))}
          <button onClick={() => navigator.clipboard.writeText(names.join('\n'))} className="text-sm text-gray-400">Copy all</button>
        </div>
      )}
    </div>
  );
}
