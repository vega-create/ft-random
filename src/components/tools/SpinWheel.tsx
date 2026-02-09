import { useState, useRef } from 'react';

export default function SpinWheel() {
  const [items, setItems] = useState('Pizza\nBurger\nSushi\nTacos\nPasta\nSalad');
  const [result, setResult] = useState('');
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const colors = ['#F97316','#8B5CF6','#EC4899','#06B6D4','#10B981','#EAB308','#EF4444','#3B82F6'];

  const draw = (entries: string[], rot: number) => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext('2d')!;
    const cx = c.width/2, cy = c.height/2, r = cx - 10;
    ctx.clearRect(0,0,c.width,c.height);
    const arc = Math.PI*2/entries.length;
    entries.forEach((e,i) => {
      ctx.beginPath(); ctx.moveTo(cx,cy);
      ctx.arc(cx,cy,r,rot+i*arc,rot+(i+1)*arc);
      ctx.fillStyle = colors[i%colors.length]; ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
      ctx.save(); ctx.translate(cx,cy); ctx.rotate(rot+i*arc+arc/2);
      ctx.fillStyle = '#fff'; ctx.font = 'bold 14px Arial'; ctx.textAlign = 'right';
      ctx.fillText(e.slice(0,15), r-20, 5); ctx.restore();
    });
    // pointer
    ctx.beginPath(); ctx.moveTo(cx+r+5,cy); ctx.lineTo(cx+r-15,cy-10); ctx.lineTo(cx+r-15,cy+10);
    ctx.fillStyle = '#1F2937'; ctx.fill();
  };

  const spin = () => {
    const entries = items.split('\n').filter(s => s.trim());
    if (entries.length < 2) return;
    setSpinning(true); setResult('');
    const extra = 1440 + Math.random()*1440;
    const target = rotation + extra;
    let start: number;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts-start)/3000);
      const ease = 1 - Math.pow(1-p, 3);
      const cur = rotation + extra * ease;
      draw(entries, cur * Math.PI/180);
      if (p < 1) requestAnimationFrame(animate);
      else {
        setRotation(target % 360);
        const norm = (360 - target % 360) % 360;
        const idx = Math.floor(norm / (360/entries.length));
        setResult(entries[idx % entries.length]);
        setSpinning(false);
      }
    };
    requestAnimationFrame(animate);
  };

  const entries = items.split('\n').filter(s => s.trim());
  if (canvasRef.current && !spinning) draw(entries, rotation * Math.PI/180);

  return (
    <div className="space-y-4">
      <textarea value={items} onChange={e => setItems(e.target.value)} placeholder="One item per line..." className="w-full h-32 p-4 border border-gray-200 rounded-xl text-sm outline-none" />
      <div className="flex justify-center"><canvas ref={canvasRef} width={320} height={320} className="rounded-full shadow-lg" /></div>
      <button onClick={spin} disabled={spinning || entries.length < 2} className="w-full py-4 bg-orange-500 text-white rounded-xl font-bold text-xl hover:bg-orange-600 disabled:opacity-50">🎡 Spin!</button>
      {result && <div className="text-center bg-purple-50 rounded-xl p-6"><p className="text-sm text-purple-600 mb-1">Winner:</p><p className="text-3xl font-bold text-purple-700">{result}</p></div>}
    </div>
  );
}
