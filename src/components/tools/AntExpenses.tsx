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
        <h3 className="text-3xl font-black text-white mb-2">🐜 Detector de Gastos Hormiga</h3>
        <p className="text-slate-400">Descubre cuánto te están robando esos "pequeños gustitos" diarios.</p>
      </div>

      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
        <label className="block text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">
          ¿Cuánto gastas al día en café, snacks o cigarrillos?
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-[#00D68F] font-black">$</span>
          <input 
            type="text" 
            inputMode="decimal"
            value={dailyInput}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9.,]/g, '');
              setDailyInput(val);
            }}
            className="w-full bg-slate-900 border-2 border-slate-700 rounded-xl py-4 pl-12 pr-4 text-3xl font-black text-white outline-none focus:border-[#00D68F] transition-all"
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
            className={`p-6 rounded-2xl border ${item.highlight ? 'bg-[#00D68F]/10 border-[#00D68F]/30' : 'bg-slate-800/30 border-slate-700/50'}`}
          >
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{item.label}</p>
            <p className={`text-2xl font-black ${item.highlight ? 'text-[#00D68F]' : 'text-white'}`}>
              {formatCurrency(item.value)}
            </p>
            <p className="text-xs text-slate-400 mt-1 italic">{item.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#EF4444]/10 p-6 rounded-2xl border border-[#EF4444]/30 text-center">
        <p className="text-[#EF4444] font-bold text-lg mb-4">
           ⚠️ Estás perdiendo una pequeña fortuna sin darte cuenta.
        </p>
        <button 
          onClick={onRegister}
          className="w-full bg-gradient-to-r from-[#00D68F] to-[#059669] text-[#0F172A] font-black text-lg py-4 rounded-xl shadow-lg hover:shadow-[0_0_25px_rgba(0,214,143,0.4)] transition-all transform hover:-translate-y-1"
        >
          Empezar a controlar mis gastos 🚀
        </button>
      </div>
    </div>
  );
}
