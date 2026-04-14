'use client';
import AntExpenses from '@/components/tools/AntExpenses';

export default function AntExpensesPage() {
  const getAppUrl = (mode: 'login' | 'register') => {
    const baseUrl = typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:5173' : 'https://app.prosperafinanzas.com';
    return `${baseUrl}/login?mode=${mode}`;
  };

  return (
    <div className="min-h-screen bg-[#0F172A] p-4 sm:p-12 flex items-center justify-center selection:bg-[#00D68F] selection:text-white">
      <div className="w-full max-w-3xl bg-[#0F172A] rounded-[3rem] border border-slate-700/50 p-8 sm:p-12 shadow-2xl overflow-hidden relative group transition-all hover:border-[#00D68F]/30">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#00D68F]/5 via-transparent to-transparent opacity-50 pointer-events-none"></div>
        <div className="relative z-10">
          <AntExpenses onRegister={() => window.location.href = getAppUrl('register')} />
        </div>
      </div>
    </div>
  );
}
