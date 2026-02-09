import { useState } from 'react';

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = crypto.getRandomValues(new Uint8Array(1))[0] & (c==='x'?15:3) | (c==='x'?0:8);
    return r.toString(16);
  });
}

export default function RandomUuid() {
  const [count, setCount] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [noDash, setNoDash] = useState(false);
  const [uuids, setUuids] = useState<string[]>([]);

  const generate = () => {
    setUuids(Array.from({length:count}, () => {
      let u = uuidv4();
      if (noDash) u = u.replace(/-/g, '');
      if (uppercase) u = u.toUpperCase();
      return u;
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-end flex-wrap">
        <div><label className="text-xs text-gray-500">Count</label><input type="number" value={count} onChange={e => setCount(Math.max(1,Math.min(50,+e.target.value)))} min="1" max="50" className="w-20 px-3 py-2 border border-gray-200 rounded-lg" /></div>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={uppercase} onChange={e => setUppercase(e.target.checked)} className="accent-orange-500" />Uppercase</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={noDash} onChange={e => setNoDash(e.target.checked)} className="accent-orange-500" />No dashes</label>
      </div>
      <button onClick={generate} className="w-full py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600">Generate UUID</button>
      {uuids.length > 0 && (
        <div className="space-y-2">
          {uuids.map((u,i) => (
            <div key={i} className="flex items-center gap-2 bg-gray-900 rounded-lg p-3">
              <code className="flex-1 text-green-400 text-sm font-mono">{u}</code>
              <button onClick={() => navigator.clipboard.writeText(u)} className="px-2 py-1 bg-orange-500 text-white rounded text-xs">Copy</button>
            </div>
          ))}
          {uuids.length > 1 && <button onClick={() => navigator.clipboard.writeText(uuids.join('\n'))} className="text-sm text-gray-400">Copy all</button>}
        </div>
      )}
    </div>
  );
}
