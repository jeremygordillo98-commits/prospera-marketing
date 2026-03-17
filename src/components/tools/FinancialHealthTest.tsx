import React, { useState } from 'react';

interface FinancialHealthTestProps {
  onRegister: () => void;
}

const questions = [
  {
    q: "¿Sabes exactamente cuánto gastaste el mes pasado?",
    options: [
      { t: "Ni idea, el dinero se esfuma", p: 0 },
      { t: "Tengo una idea vaga", p: 5 },
      { t: "Sí, lo tengo todo anotado", p: 15 }
    ]
  },
  {
    q: "¿Tienes un fondo de emergencia (3-6 meses de gastos)?",
    options: [
      { t: "No tengo nada ahorrado", p: 0 },
      { t: "Tengo algo, pero menos de 1 mes", p: 5 },
      { t: "Sí, estoy totalmente cubierto", p: 20 }
    ]
  },
  {
    q: "¿Qué porcentaje de tus ingresos ahorras mensualmente?",
    options: [
      { t: "Nada, vivo al día", p: 0 },
      { t: "Menos del 10%", p: 10 },
      { t: "Más del 15%", p: 20 }
    ]
  },
  {
    q: "¿Tienes deudas de consumo (tarjetas, préstamos locales)?",
    options: [
      { t: "Estoy hasta el cuello", p: 0 },
      { t: "Tengo deudas pero las manejo", p: 10 },
      { t: "Cero deudas de consumo", p: 25 }
    ]
  },
  {
    q: "¿Haces un presupuesto antes de que empiece el mes?",
    options: [
      { t: "No, gasto según necesito", p: 0 },
      { t: "A veces, para gastos grandes", p: 10 },
      { t: "Siempre, planifico cada dólar", p: 20 }
    ]
  }
];

export default function FinancialHealthTest({ onRegister }: FinancialHealthTestProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (points: number) => {
    const newScore = score + points;
    setScore(newScore);
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const getProfile = () => {
    if (score < 30) return { label: "El Sobreviviente", color: "#EF4444", desc: "Vives al límite. Un gasto inesperado podría ser un desastre. ¡Necesitas Prospera urgente!" };
    if (score < 60) return { label: "Ahorrador Principiante", color: "#F59E0B", desc: "Tienes buena intención, pero te falta orden y constancia. Puedes mejorar mucho." };
    if (score < 85) return { label: "Piloto Financiero", color: "#3B82F6", desc: "Tienes el control de la mayoría de tus gastos. Estás a un paso de la libertad financiera." };
    return { label: "Maestro del Dinero", color: "#00D68F", desc: "¡Eres un modelo a seguir! Prospera te ayudará a llevar tu patrimonio al siguiente nivel." };
  };

  if (showResult) {
    const profile = getProfile();
    return (
      <div className="flex flex-col items-center text-center animate-in zoom-in duration-500">
        <div className="w-32 h-32 rounded-full flex items-center justify-center mb-6 border-8 border-slate-800" style={{ background: `conic-gradient(${profile.color} ${score}%, #1e293b 0)` }}>
            <span className="text-3xl font-black text-white">{score}</span>
        </div>
        <p className="text-slate-500 uppercase font-black tracking-widest text-xs mb-1">Tu perfil es:</p>
        <h3 className="text-4xl font-black mb-4" style={{ color: profile.color }}>"{profile.label}"</h3>
        <p className="text-slate-400 text-lg mb-8 max-w-sm">{profile.desc}</p>
        
        <div className="w-full bg-slate-800/50 p-6 rounded-3xl border border-slate-700">
            <h4 className="text-white font-bold mb-4">¿Quieres un plan personalizado para subir tu score?</h4>
            <button 
              onClick={onRegister}
              className="w-full bg-gradient-to-r from-[#00D68F] to-[#059669] text-[#0F172A] font-black text-lg py-4 rounded-xl shadow-xl transition-all hover:scale-105"
            >
              Crear mi cuenta gratis 🚀
            </button>
        </div>
      </div>
    );
  }

  const q = questions[currentStep];

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full bg-[#00D68F] transition-all duration-500" style={{ width: `${((currentStep) / questions.length) * 100}%` }} />
      </div>
      
      <div className="min-h-[100px] flex items-center justify-center">
        <h3 className="text-2xl md:text-3xl font-black text-white text-center leading-tight">{q.q}</h3>
      </div>

      <div className="flex flex-col gap-3">
        {q.options.map((opt, i) => (
          <button 
            key={i}
            onClick={() => handleAnswer(opt.p)}
            className="w-full p-6 text-left bg-slate-800/50 hover:bg-[#00D68F]/10 border border-slate-700 hover:border-[#00D68F]/50 rounded-2xl transition-all group active:scale-95"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-slate-200 group-hover:text-white">{opt.t}</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">➡️</span>
            </div>
          </button>
        ))}
      </div>

      <p className="text-center text-slate-500 text-xs font-bold uppercase tracking-widest">
        Pregunta {currentStep + 1} de {questions.length}
      </p>
    </div>
  );
}
