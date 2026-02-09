import { useState } from 'react';

const responses = [
  {text:'Yes!',emoji:'✅',color:'bg-green-500'},
  {text:'No!',emoji:'❌',color:'bg-red-500'},
  {text:'Definitely Yes',emoji:'🎉',color:'bg-green-600'},
  {text:'Absolutely Not',emoji:'🚫',color:'bg-red-600'},
  {text:'Maybe...',emoji:'🤔',color:'bg-yellow-500'},
  {text:'Ask Again Later',emoji:'🔮',color:'bg-purple-500'},
  {text:'Without a Doubt',emoji:'💯',color:'bg-green-500'},
  {text:'Very Doubtful',emoji:'😬',color:'bg-red-400'},
];

export default function YesOrNo() {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState<typeof responses[0]|null>(null);
  const [shaking, setShaking] = useState(false);

  const ask = () => {
    setShaking(true); setResult(null);
    setTimeout(() => {
      setResult(responses[Math.floor(Math.random()*responses.length)]);
      setShaking(false);
    }, 600);
  };

  return (
    <div className="space-y-6 text-center max-w-md mx-auto">
      <input type="text" value={question} onChange={e => setQuestion(e.target.value)} placeholder="Ask a yes/no question..." className="w-full px-4 py-3 border border-gray-200 rounded-xl text-center outline-none focus:ring-2 focus:ring-orange-500 text-lg" />
      <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center text-6xl shadow-xl ${result ? result.color : 'bg-gray-200'} ${shaking ? 'animate-bounce' : ''}`}>
        {result ? result.emoji : '🎱'}
      </div>
      {result && <div className="text-4xl font-bold text-gray-900">{result.text}</div>}
      <button onClick={ask} disabled={shaking} className="w-full py-4 bg-orange-500 text-white rounded-xl font-bold text-xl hover:bg-orange-600 disabled:opacity-50">
        {shaking ? '🔮 Thinking...' : '❓ Ask!'}
      </button>
    </div>
  );
}
