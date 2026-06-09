import React, { useState } from 'react';

interface LoanStripperProps {
  onRegister: () => void;
}

export default function LoanStripper({ onRegister }: LoanStripperProps) {
  const [cashPriceInput, setCashPriceInput] = useState<string>("350");
  const [monthlyPaymentInput, setMonthlyPaymentInput] = useState<string>("25");
  const [months, setMonths] = useState<number>(24);

  // Normalización para cálculos
  const cashPrice = parseFloat(cashPriceInput.replace(',', '.')) || 0;
  const monthlyPayment = parseFloat(monthlyPaymentInput.replace(',', '.')) || 0;

  const totalPaid = monthlyPayment * months;
  const totalInterest = totalPaid - cashPrice;
  const extraPercentage = cashPrice > 0 ? (totalInterest / cashPrice) * 100 : 0;

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('es-EC', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center">
        <h3 className="font-headline-lg text-headline-lg text-text-primary mb-2">💸 Desnudador de Préstamos</h3>
        <p className="text-text-secondary font-body-md">¿De verdad es "cómodo"? Descubre la trampa de las cuotas pequeñas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-surface-container-low/50 p-5 rounded-2xl border border-glass">
          <label className="block text-xs font-bold text-text-secondary mb-2 uppercase tracking-wider">Precio de contado</label>
          <input 
            type="text" 
            inputMode="decimal"
            value={cashPriceInput}
            onChange={(e) => setCashPriceInput(e.target.value.replace(/[^0-9.,]/g, ''))}
            className="w-full bg-surface-container-lowest/80 border border-glass rounded-xl py-3 px-4 text-xl font-bold text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
        <div className="bg-surface-container-low/50 p-5 rounded-2xl border border-glass">
          <label className="block text-xs font-bold text-text-secondary mb-2 uppercase tracking-wider">Cuota mensual</label>
          <input 
            type="text" 
            inputMode="decimal"
            value={monthlyPaymentInput}
            onChange={(e) => setMonthlyPaymentInput(e.target.value.replace(/[^0-9.,]/g, ''))}
            className="w-full bg-surface-container-lowest/80 border border-glass rounded-xl py-3 px-4 text-xl font-bold text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
        <div className="bg-surface-container-low/50 p-5 rounded-2xl border border-glass md:col-span-2">
          <label className="block text-xs font-bold text-text-secondary mb-2 uppercase tracking-wider">Meses a pagar ({months})</label>
          <input 
            type="range" 
            min="3" 
            max="72" 
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full h-2 bg-surface-container-lowest rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>
      </div>

      <div className="bg-surface-container-lowest/80 p-8 rounded-3xl border border-error/20 relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center">
          <p className="text-text-secondary font-bold uppercase tracking-widest text-[10px] mb-2">Resultado Final</p>
          <h4 className="text-5xl font-black text-text-primary mb-2 font-display-lg">{formatCurrency(totalPaid)}</h4>
          <p className="text-error font-black text-xl mb-6">
            Pagas un {extraPercentage.toFixed(0)}% EXTRA {extraPercentage > 50 ? '🤯' : '⚠️'}
          </p>

          <div className="grid grid-cols-2 gap-8 w-full border-t border-glass pt-6">
            <div className="text-center">
              <p className="text-[10px] text-text-secondary font-black uppercase tracking-widest mb-1">Interés Total</p>
              <p className="text-xl font-black text-text-primary">{formatCurrency(totalInterest)}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-text-secondary font-black uppercase tracking-widest mb-1">Costo Real</p>
              <p className="text-xl font-black text-text-primary">{(totalPaid / cashPrice).toFixed(1)}x el original</p>
            </div>
          </div>
        </div>
        {/* Decoración de fondo */}
        <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </div>
      </div>

      <div className="text-center space-y-4">
        <p className="text-text-secondary text-sm italic font-body-md">
          "Las cuotas pequeñas son el veneno de tu ahorro."
        </p>
        <button 
          onClick={onRegister}
          className="w-full bg-primary-container text-on-primary-container font-black text-lg py-4 rounded-xl shadow-xl hover:shadow-[0_0_20px_rgba(124,59,237,0.4)] transition-all hover:scale-[1.02]"
        >
          Aprender a comprar sin deudas 💎
        </button>
      </div>
    </div>
  );
}
