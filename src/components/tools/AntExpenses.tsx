import React, { useState } from 'react';

interface AntExpensesProps {
  onRegister: () => void;
}

export default function AntExpenses({ onRegister }: AntExpensesProps) {
  const [dailyInput, setDailyInput] = useState<string>("5");
  
  // Convertir string a número (manejando puntos y comas)
  const dailyAmount = parseFloat(dailyInput.replace(',', '.')) || 0;
  
  const weekly = dailyAmount * 7;
  const monthly = dailyAmount * 30;
  const yearly = dailyAmount * 365;
  const tenYears = yearly * 10;

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('es-EC', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center">
        <h3 className="font-headline-lg text-headline-lg text-text-primary mb-2">🐜 Detector de Gastos Hormiga</h3>
        <p className="text-text-secondary font-body-md">Descubre cuánto te están robando esos "pequeños gustitos" diarios.</p>
      </div>

      <div className="bg-surface-container-low/50 p-6 rounded-2xl border border-glass">
        <label className="block text-xs font-bold text-text-secondary mb-4 uppercase tracking-wider">
          ¿Cuánto gastas al día en café, snacks o cigarrillos?
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-primary font-black">$</span>
          <input 
            type="text" 
            inputMode="decimal"
            value={dailyInput}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9.,]/g, '');
              setDailyInput(val);
            }}
            className="w-full bg-surface-container-lowest/80 border border-glass rounded-xl py-4 pl-12 pr-4 text-3xl font-black text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            placeholder="0.00"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: 'En una semana', value: weekly, sub: 'Un almuerzo extra' },
          { label: 'En un mes', value: monthly, sub: 'Una factura de servicios' },
          { label: 'En un año', value: yearly, sub: 'Un nuevo smartphone' },
          { label: 'En 10 años', value: tenYears, sub: 'La entrada de un auto o casa', highlight: true },
        ].map((item, i) => (
          <div 
            key={i}
            className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02] ${item.highlight ? 'bg-primary/10 border-primary/30' : 'bg-surface-container-lowest/40 border-glass'}`}
          >
            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">{item.label}</p>
            <p className={`text-2xl font-black ${item.highlight ? 'text-primary' : 'text-text-primary'}`}>
              {formatCurrency(item.value)}
            </p>
            <p className="text-xs text-text-secondary mt-1 italic">{item.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-error/10 p-6 rounded-2xl border border-error/20 text-center">
        <p className="text-error font-bold text-lg mb-4">
           ⚠️ Estás perdiendo una pequeña fortuna sin darte cuenta.
        </p>
        <button 
          onClick={onRegister}
          className="w-full bg-primary-container text-on-primary-container font-black text-lg py-4 rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(124,59,237,0.4)] transition-all hover:scale-[1.02]"
        >
          Empezar a controlar mis gastos 🚀
        </button>
      </div>
    </div>
  );
}
