import React, { useState } from 'react';

interface SubscriptionAuditorProps {
  onRegister: () => void;
}

const commonSubs = [
  { name: 'Netflix', price: 10.99, icon: '🍿' },
  { name: 'Spotify', price: 6.99, icon: '🎵' },
  { name: 'iCloud / Drive', price: 1.99, icon: '☁️' },
  { name: 'Disney+ / HBO', price: 7.99, icon: '🎬' },
  { name: 'Gym / Club', price: 35.00, icon: '💪' },
  { name: 'Amazon Prime', price: 7.99, icon: '📦' },
  { name: 'Internet / TV', price: 40.00, icon: '🌐' },
  { name: 'ChatGPT / AI', price: 20.00, icon: '🤖' },
];

export default function SubscriptionAuditor({ onRegister }: SubscriptionAuditorProps) {
  const [selected, setSelected] = useState<string[]>([]);
  
  const toggleSub = (name: string) => {
    setSelected(prev => prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]);
  };

  const monthlyTotal = commonSubs
    .filter(s => selected.includes(s.name))
    .reduce((acc, curr) => acc + curr.price, 0);
  
  const yearlyTotal = monthlyTotal * 12;

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('es-EC', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center">
        <h3 className="text-3xl font-black text-white mb-2">🔎 Auditor de Suscripciones</h3>
        <p className="text-slate-400">¿Sabes cuánto dinero se escapa en débitos automáticos cada mes?</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {commonSubs.map((sub) => (
          <button 
            key={sub.name}
            onClick={() => toggleSub(sub.name)}
            className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 group ${selected.includes(sub.name) ? 'bg-[#00D68F]/20 border-[#00D68F] scale-105' : 'bg-slate-800/50 border-slate-700 hover:border-slate-500'}`}
          >
            <span className="text-3xl">{sub.icon}</span>
            <span className="text-xs font-bold text-white text-center leading-tight">{sub.name}</span>
            <span className="text-[10px] text-slate-500 font-bold">{formatCurrency(sub.price)}</span>
          </button>
        ))}
      </div>

      <div className="bg-slate-900 overflow-hidden rounded-3xl border border-slate-700 shadow-2xl">
        <div className="p-8 text-center bg-gradient-to-b from-white/5 to-transparent">
          <p className="text-slate-500 font-black uppercase tracking-widest text-[10px] mb-2">Tu gasto anual en suscripciones</p>
          <h4 className="text-5xl font-black text-[#00D68F] mb-1">{formatCurrency(yearlyTotal)}</h4>
          <p className="text-slate-400 font-medium italic">Eso son {formatCurrency(monthlyTotal)} cada mes</p>
        </div>
        
        <div className="p-6 bg-[#00D68F]/5 border-t border-slate-700">
            <p className="text-sm text-slate-400 text-center mb-6">
               "Las suscripciones son el nuevo gasto hormiga digital. Lo que no se mide, no se puede controlar."
            </p>
            <button 
              onClick={onRegister}
              className="w-full bg-gradient-to-r from-[#00D68F] to-[#059669] text-[#0F172A] font-black text-lg py-4 rounded-xl shadow-lg transition-all hover:translate-x-2"
            >
              Organizar mis gastos automáticamente ⚡
            </button>
        </div>
      </div>
    </div>
  );
}
