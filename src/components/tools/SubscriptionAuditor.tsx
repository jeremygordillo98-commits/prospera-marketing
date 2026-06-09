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
        <h3 className="font-headline-lg text-headline-lg text-text-primary mb-2">🔎 Auditor de Suscripciones</h3>
        <p className="text-text-secondary font-body-md">¿Sabes cuánto dinero se escapa en débitos automáticos cada mes?</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {commonSubs.map((sub) => (
          <button 
            key={sub.name}
            onClick={() => toggleSub(sub.name)}
            className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 group cursor-pointer ${selected.includes(sub.name) ? 'bg-primary/25 border-primary scale-[1.05] shadow-[0_0_15px_rgba(124,59,237,0.15)]' : 'bg-surface-container-low/50 border-glass hover:border-glass-color/80'}`}
          >
            <span className="text-3xl group-hover:scale-110 transition-transform">{sub.icon}</span>
            <span className="text-xs font-bold text-text-primary text-center leading-tight">{sub.name}</span>
            <span className="text-[10px] text-text-secondary font-bold">{formatCurrency(sub.price)}</span>
          </button>
        ))}
      </div>

      <div className="bg-surface-container-lowest/80 overflow-hidden rounded-3xl border border-glass shadow-2xl">
        <div className="p-8 text-center bg-gradient-to-b from-white/[0.02] to-transparent">
          <p className="text-text-secondary font-black uppercase tracking-widest text-[10px] mb-2">Tu gasto anual en suscripciones</p>
          <h4 className="text-5xl font-black text-primary mb-1 font-display-lg">{formatCurrency(yearlyTotal)}</h4>
          <p className="text-text-secondary font-medium italic">Eso son {formatCurrency(monthlyTotal)} cada mes</p>
        </div>
        
        <div className="p-6 bg-primary/5 border-t border-glass">
            <p className="text-sm text-text-secondary text-center mb-6 leading-relaxed">
               "Las suscripciones son el nuevo gasto hormiga digital. Lo que no se mide, no se puede controlar."
            </p>
            <button 
              onClick={onRegister}
              className="w-full bg-primary-container text-on-primary-container font-black text-lg py-4 rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(124,59,237,0.4)] transition-all hover:scale-[1.02]"
            >
              Organizar mis gastos automáticamente ⚡
            </button>
        </div>
      </div>
    </div>
  );
}
