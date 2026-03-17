import React, { useState } from 'react';

interface LoanStripperProps {
  onRegister: () => void;
}

export default function LoanStripper({ onRegister }: LoanStripperProps) {
  const [cashPrice, setCashPrice] = useState<number>(350);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(25);
  const [months, setMonths] = useState<number>(24);

  const totalPaid = monthlyPayment * months;
  const totalInterest = totalPaid - cashPrice;
  const extraPercentage = (totalInterest / cashPrice) * 100;

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('es-EC', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center">
        <h3 className="text-3xl font-black text-white mb-2">💸 Desnudador de Préstamos</h3>
        <p className="text-slate-400">¿De verdad es "cómodo"? Descubre la trampa de las cuotas pequeñas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700">
          <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Precio de contado</label>
          <input 
            type="number" 
            value={cashPrice}
            onChange={(e) => setCashPrice(Number(e.target.value))}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-xl font-bold text-white outline-none focus:border-[#00D68F]"
          />
        </div>
        <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700">
          <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Cuota mensual</label>
          <input 
            type="number" 
            value={monthlyPayment}
            onChange={(e) => setMonthlyPayment(Number(e.target.value))}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-xl font-bold text-white outline-none focus:border-[#00D68F]"
          />
        </div>
        <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700 md:col-span-2">
          <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Meses a pagar ({months})</label>
          <input 
            type="range" 
            min="3" 
            max="72" 
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#00D68F]"
          />
        </div>
      </div>

      <div className="bg-slate-900 p-8 rounded-3xl border-2 border-[#EF4444]/30 relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center">
          <p className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-2">Resultado Final</p>
          <h4 className="text-5xl font-black text-white mb-2">{formatCurrency(totalPaid)}</h4>
          <p className="text-[#EF4444] font-black text-xl mb-6">
            Pagas un {extraPercentage.toFixed(0)}% EXTRA {extraPercentage > 50 ? '🤯' : '⚠️'}
          </p>

          <div className="grid grid-cols-2 gap-8 w-full border-t border-slate-700/50 pt-6">
            <div className="text-center">
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Interés Total</p>
              <p className="text-xl font-black text-white">{formatCurrency(totalInterest)}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Costo Real</p>
              <p className="text-xl font-black text-white">{(totalPaid / cashPrice).toFixed(1)}x el original</p>
            </div>
          </div>
        </div>
        {/* Decoración de fondo */}
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </div>
      </div>

      <div className="text-center space-y-4">
        <p className="text-slate-400 text-sm italic">
          "Las cuotas pequeñas son el veneno de tu ahorro."
        </p>
        <button 
          onClick={onRegister}
          className="w-full bg-white text-[#0F172A] font-black text-lg py-4 rounded-xl shadow-xl hover:bg-slate-100 transition-all transform hover:-translate-y-1"
        >
          Aprender a comprar sin deudas 💎
        </button>
      </div>
    </div>
  );
}
