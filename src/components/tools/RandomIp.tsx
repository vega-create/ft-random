import { useState } from 'react';

export default function RandomIp() {
  const [type, setType] = useState<'v4'|'v6'>('v4');
  const [count, setCount] = useState(5);
  const [ips, setIps] = useState<string[]>([]);

  const genV4 = () => Array.from({length:4}, () => Math.floor(Math.random()*256)).join('.');
  const genV6 = () => Array.from({length:8}, () => Math.floor(Math.random()*65536).toString(16).padStart(4,'0')).join(':');

  const generate = () => setIps(Array.from({length:count}, () => type === 'v4' ? genV4() : genV6()));

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-end">
        {(['v4','v6'] as const).map(t => (
          <button key={t} onClick={() => setType(t)} className={`px-4 py-2 rounded-lg text-sm font-medium ${type===t?'bg-orange-500 text-white':'bg-gray-100 text-gray-600'}`}>IP{t}</button>
        ))}
        <div><label className="text-xs text-gray-500">Count</label><input type="number" value={count} onChange={e => setCount(Math.max(1,+e.target.value))} min="1" max="50" className="w-20 px-3 py-2 border border-gray-200 rounded-lg" /></div>
      </div>
      <button onClick={generate} className="w-full py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600">Generate</button>
      {ips.length > 0 && (
        <div className="space-y-1">
          {ips.map((ip,i) => (
            <div key={i} className="flex items-center gap-2 bg-gray-900 rounded-lg p-3">
              <code className="flex-1 text-green-400 text-sm font-mono">{ip}</code>
              <button onClick={() => navigator.clipboard.writeText(ip)} className="px-2 py-1 bg-orange-500 text-white rounded text-xs">Copy</button>
            </div>
          ))}
          <button onClick={() => navigator.clipboard.writeText(ips.join('\n'))} className="text-sm text-gray-400">Copy all</button>
        </div>
      )}
    </div>
  );
}
