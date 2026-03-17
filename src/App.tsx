import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { supabase } from './services/supabase';

// Reutilizamos tu icono de logo
const IconChart = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>;

// Iconos para los beneficios
const IconShield = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00D68F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;
const IconTrophy = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00D68F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 21h8M12 17v4M7 4h10v3A5 5 0 0 1 12 12a5 5 0 0 1-5-5V4z"></path><path d="M7 4H4a2 2 0 0 0-2 2v1a6 6 0 0 0 6 6h1"></path><path d="M17 4h3a2 2 0 0 1 2 2v1a6 6 0 0 1-6 6h-1"></path></svg>;
const IconBrain = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00D68F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path></svg>;
const IconCheck = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00D68F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const IconX = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;

// Importación de Herramientas
import AntExpenses from './components/tools/AntExpenses';
import LoanStripper from './components/tools/LoanStripper';
import FinancialHealthTest from './components/tools/FinancialHealthTest';
import SubscriptionAuditor from './components/tools/SubscriptionAuditor';

function NewsSection() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<any | null>(null);
  const { isDark } = { isDark: true }; // Simulado para consistencia

  useEffect(() => {
    const fetchNews = async () => {
      const { data } = await supabase
        .from('public_news')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });
      if (data) setNews(data);
      setLoading(false);
    };
    fetchNews();
  }, []);

  if (loading) return null;
  if (news.length === 0) return null;

  return (
    <section id="noticias" className="relative py-24 bg-[#0F172A] border-t border-slate-800/50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Lo más reciente de Prospera</h2>
          <p className="text-slate-400 text-lg">Entérate de nuestras actualizaciones, nuevos tutoriales y tips de ahorro.</p>
        </div>
        <div className="flex flex-col gap-10">
          {news.map((item) => (
            <div 
              key={item.id} 
              className="glass-card overflow-hidden rounded-[2.5rem] border border-slate-700/50 hover:border-[#00D68F]/30 transition-all group flex flex-col md:flex-row shadow-2xl"
            >
              {item.image_url && (
                <div className="md:w-2/5 h-64 md:h-auto relative overflow-hidden">
                    <img 
                      src={item.image_url} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent md:hidden"></div>
                </div>
              )}
              <div className={`p-8 md:p-12 flex flex-col justify-center ${item.image_url ? 'md:w-3/5' : 'w-full'}`}>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[#00D68F] text-[10px] font-black uppercase tracking-[0.2em] bg-[#00D68F]/10 px-4 py-1.5 rounded-full border border-[#00D68F]/20">
                    {item.category}
                  </span>
                  <span className="text-slate-500 text-xs font-medium">
                    {new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(item.published_at))}
                  </span>
                </div>
                
                <h3 className="text-3xl font-black text-white mb-4 group-hover:text-[#00D68F] transition-colors leading-tight">
                  {item.title}
                </h3>
                
                <p className="text-slate-400 text-lg leading-relaxed mb-8 line-clamp-3">
                  {item.summary}
                </p>

                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => setSelectedNews(item)}
                    className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-2xl font-black text-sm transition-all border border-slate-700 active:scale-95 shadow-lg"
                  >
                    Leer noticia completa
                  </button>
                  <span className="text-slate-600 text-[10px] font-black italic tracking-widest uppercase">PROSPERA NEWS • 2 MIN READ</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL DE NOTICIA COMPLETA */}
      {selectedNews && createPortal(
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 overflow-hidden animate-in fade-in duration-300">
            <div 
              onClick={() => setSelectedNews(null)}
              className="absolute inset-0 bg-[#0b1120]/95 backdrop-blur-3xl cursor-zoom-out"
            />
            <div className="relative w-full max-w-3xl bg-[#0F172A] rounded-[3rem] border border-slate-700 shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col max-h-[90vh] overflow-hidden">
                {/* Cabecera pegajosa */}
                <div className="sticky top-0 z-20 bg-[#0F172A]/80 backdrop-blur-md p-6 border-b border-slate-800 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <span className="text-[#00D68F] text-[10px] font-black uppercase tracking-widest bg-[#00D68F]/10 px-3 py-1 rounded-full border border-[#00D68F]/20">
                            {selectedNews.category}
                        </span>
                        <span className="text-slate-500 text-xs font-bold">
                            {new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(selectedNews.published_at))}
                        </span>
                    </div>
                    <button 
                      onClick={() => setSelectedNews(null)}
                      className="bg-slate-800 hover:bg-slate-700 text-white p-2.5 rounded-full transition-all active:scale-95"
                    >
                      <IconX />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {selectedNews.image_url && (
                        <div className="w-full h-64 sm:h-96 overflow-hidden">
                            <img src={selectedNews.image_url} alt={selectedNews.title} className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div className="p-8 sm:p-16 max-w-4xl mx-auto">
                        <h2 className="text-4xl sm:text-6xl font-black text-white mb-8 leading-[1.1] tracking-tight">
                            {selectedNews.title}
                        </h2>
                        
                        <div className="bg-[#00D68F]/5 p-8 rounded-3xl border-l-4 border-[#00D68F] mb-12 text-slate-300 text-xl md:text-2xl leading-relaxed italic font-medium">
                            {selectedNews.summary}
                        </div>

                        <div className="prose prose-invert max-w-none text-slate-400 text-lg md:text-xl leading-loose space-y-8 font-light">
                            {selectedNews.content?.split('\n').filter((p: string) => p.trim() !== '').map((para: string, i: number) => (
                                <p key={i} className="mb-6">{para}</p>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-8 bg-slate-900/50 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Prospera Editorial • Todos los derechos reservados</p>
                    <button 
                        onClick={() => {
                            setSelectedNews(null);
                            const baseUrl = window.location.hostname === 'localhost' ? 'http://localhost:5173' : 'https://app.prosperafinanzas.com';
                            window.location.href = `${baseUrl}/login?mode=register`;
                        }}
                        className="bg-gradient-to-r from-[#00D68F] to-[#059669] text-[#0F172A] font-black px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-all text-sm"
                    >
                       Empezar a Prosperar 🚀
                    </button>
                </div>
            </div>
        </div>,
        document.body
      )}
    </section>
  );
}

export default function App() {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const goToView = (mode: 'login' | 'register') => {
    const baseUrl = window.location.hostname === 'localhost' ? 'http://localhost:5173' : 'https://app.prosperafinanzas.com';
    window.location.href = `${baseUrl}/login?mode=${mode}`;
  };

  const tools = [
    { 
      id: 'ant', 
      title: 'Detector de Gastos Hormiga', 
      desc: '¿Cuánto te cuesta ese café diario en 10 años?', 
      icon: '🐜', 
      color: '#EF4444',
      badge: 'VIRAL'
    },
    { 
      id: 'loan', 
      title: 'Desnudador de Préstamos', 
      desc: 'Descubre la tasa real tras esas "cuotas cómodas".', 
      icon: '💸', 
      color: '#F59E0B',
      badge: 'SHOCK'
    },
    { 
      id: 'health', 
      title: 'Test de Salud Financiera', 
      desc: 'Descubre tu score y tu perfil financiero actual.', 
      icon: '📈', 
      color: '#3B82F6',
      badge: 'POPULAR'
    },
    { 
      id: 'subs', 
      title: 'Auditor de Suscripciones', 
      desc: '¿Sabes cuánto gastas al año en streaming y apps?', 
      icon: '🔎', 
      color: '#7C3BED',
      badge: 'NUEVO'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 font-sans overflow-x-hidden selection:bg-[#00D68F] selection:text-white">
      
      <style>
        {`
          .neural-bg {
              background-image: radial-gradient(circle at 2px 2px, rgba(124, 61, 237, 0.15) 1px, transparent 0);
              background-size: 40px 40px;
          }
          .glass-card {
              background: rgba(30, 41, 59, 0.7);
              backdrop-filter: blur(10px);
              border: 1px solid rgba(255, 255, 255, 0.05);
          }
          .floating-img {
              animation: float 6s ease-in-out infinite;
          }
          @keyframes float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-15px); }
              100% { transform: translateY(0px); }
          }
          @keyframes slideUp {
              from { transform: translateY(20px); opacity: 0; }
              to { transform: translateY(0px); opacity: 1; }
          }
          @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
          }
          @keyframes zoomIn {
              from { transform: scale(0.9); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
          }
          .animate-in {
              animation-duration: 0.6s;
              animation-fill-mode: both;
          }
          .fade-in { animation-name: fadeIn; }
          .slide-in-from-bottom-4 { animation-name: slideUp; }
          .zoom-in { animation-name: zoomIn; }
        `}
      </style>

      {/* NAVBAR */}
      <nav className="w-full fixed top-0 z-50 glass-card px-6 py-4 flex justify-between items-center border-b border-slate-800/50">
        <div className="flex items-center gap-2 text-[#00D68F]">
          <IconChart />
          <span className="text-xl font-black tracking-tighter uppercase text-slate-50">Prospera</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => goToView('login')}
            className="hidden sm:block text-sm font-bold text-slate-300 hover:text-white hover:bg-slate-800/50 px-4 py-2 rounded-lg transition-colors"
          >
            Iniciar Sesión
          </button>
          <button 
            onClick={() => goToView('register')}
            className="text-sm font-bold text-[#0F172A] bg-gradient-to-r from-[#00D68F] to-[#059669] hover:from-[#00F0A0] hover:to-[#05B680] px-5 py-2.5 rounded-lg transition-all shadow-[0_0_15px_rgba(0,214,143,0.3)] hover:shadow-[0_0_25px_rgba(0,214,143,0.5)] transform hover:scale-105"
          >
            Registrarse Gratis
          </button>
        </div>
      </nav>

      {/* CABECERA (HERO SECTION) */}
      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto min-h-screen">
        <div className="absolute inset-0 neural-bg opacity-60 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0F172A] via-transparent to-[#7c3bed]/10 opacity-80 pointer-events-none"></div>
        
        {/* Textos - Izquierda */}
        <div className="relative z-10 w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left mb-16 lg:mb-0 pr-0 lg:pr-12">
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#00D68F]/10 border border-[#00D68F]/30 text-[#00D68F] text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
            La Nueva Era de tus Finanzas
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-[1.1]">
            Domina tu dinero.<br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D68F] to-[#059669]">Logra tus metas.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed mb-8 max-w-xl">
            Deja atrás las hojas de cálculo aburridas y el estrés de no saber en qué gastas. Prospera es el asistente financiero inteligente que convierte el ahorro en un juego donde tú siempre ganas.
          </p>
          
          {/* Bullet points para generar valor rápido */}
          <div className="flex flex-col gap-3 mb-10 text-slate-300 text-sm md:text-base text-left">
            <div className="flex items-center gap-3 justify-center lg:justify-start"><IconCheck /> <span>Alertas de gastos para no salirte del presupuesto.</span></div>
            <div className="flex items-center gap-3 justify-center lg:justify-start"><IconCheck /> <span>Consejos personalizados con Inteligencia Artificial.</span></div>
            <div className="flex items-center gap-3 justify-center lg:justify-start"><IconCheck /> <span>Gamificación: Gana medallas al cumplir tus metas.</span></div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <button 
              onClick={() => goToView('register')}
              className="bg-gradient-to-r from-[#00D68F] to-[#059669] text-[#0F172A] font-black text-xl px-10 py-4 rounded-xl shadow-[0_0_20px_rgba(0,214,143,0.4)] hover:shadow-[0_0_35px_rgba(0,214,143,0.7)] hover:-translate-y-1 hover:scale-105 transition-all w-full sm:w-auto border border-[#00F0A0]/50"
            >
              Comenzar Gratis Hoy
            </button>
            <button 
              onClick={() => goToView('login')}
              className="bg-[#1E293B] text-white font-bold text-lg px-8 py-4 rounded-xl border border-slate-600 hover:bg-slate-700 hover:border-slate-500 hover:-translate-y-1 transition-all w-full sm:w-auto"
            >
              Ya tengo cuenta
            </button>
          </div>
          <p className="text-slate-500 text-sm mt-4 flex items-center justify-center lg:justify-start gap-1 font-medium">
             ⚡ No requiere tarjeta de crédito • Configuración en 1 minuto
          </p>
        </div>

        {/* Imagen Principal App - Derecha */}
        <div className="relative z-10 w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[280px] md:max-w-md aspect-[9/16] bg-[#1E293B] rounded-[3rem] border-[10px] border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden floating-img">
              
              <img 
                src="/ChatBotIACel.jpeg" 
                alt="ChatBot con Inteligencia Artificial de Prospera" 
                className="w-full h-full object-cover"
              />

              {/* Reflejo estilo cristal sobre la pantalla */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>
          </div>
          
          {/* Tarjeta Flotante IA */}
          <div className="absolute -bottom-10 -left-6 md:-left-12 z-20 glass-card p-4 rounded-2xl border border-[#00D68F]/30 shadow-2xl animate-bounce duration-[3000ms]">
              <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#00D68F] rounded-lg flex items-center justify-center text-xl">🤖</div>
                  <div>
                      <p className="text-[10px] font-black uppercase text-[#00D68F] tracking-tighter">Asistente IA</p>
                      <p className="text-xs font-bold text-white">"¡Ahorraste $20 hoy! 🚀"</p>
                  </div>
              </div>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#7c3bed] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
          <div className="absolute top-1/4 right-10 w-32 h-32 bg-[#00D68F] rounded-full blur-[80px] opacity-30 pointer-events-none"></div>
        </div>
      </header>

      {/* SECCIÓN SHOWCASE - ESCRITORIO + MÓVIL */}
      <section className="relative py-24 bg-[#0F172A] overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col lg:flex-row items-center gap-16">
                  {/* Visuales a la izquierda */}
                  <div className="w-full lg:w-3/5 relative">
                      {/* Vista de Escritorio */}
                      <div className="relative rounded-2xl border border-slate-700 shadow-2xl overflow-hidden bg-slate-900 aspect-video group">
                          <img 
                            src="/Dashboard.png" 
                            alt="Prospera Desktop Dashboard" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>

                      {/* Vista de Celular Superpuesta */}
                      <div className="absolute -bottom-12 -right-6 md:-right-10 w-48 md:w-64 aspect-[9/19] bg-slate-800 rounded-[2.5rem] border-[6px] border-slate-900 shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden hidden md:block group">
                          <img 
                            src="/ReporteCel.jpeg" 
                            alt="Prospera Mobile View" 
                            className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110"
                          />
                      </div>
                  </div>

                  {/* Texto a la derecha */}
                  <div className="w-full lg:w-2/5 flex flex-col gap-6">
                      <h2 className="text-4xl font-black text-white leading-tight">
                          Una interfaz diseñada para el <span className="text-[#00D68F]">éxito.</span>
                      </h2>
                      <p className="text-slate-400 text-lg leading-relaxed">
                          Ya sea que prefieras la profundidad de los reportes en tu computadora o la rapidez de registrar gastos desde tu celular, Prospera se adapta a ti.
                      </p>
                      
                      <div className="grid grid-cols-1 gap-4 mt-4">
                          {[
                              { t: 'Multiplataforma', d: 'Sincronización instantánea entre todos tus dispositivos.', i: '🔄' },
                              { t: 'Modo Oscuro & Claro', d: 'Personaliza tu experiencia visual según el momento del día.', i: '🌓' },
                              { t: 'Análisis Visual', d: 'Gráficos avanzados que cualquier persona puede entender.', i: '📊' }
                          ].map((item, idx) => (
                              <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-[#00D68F]/30 transition-colors">
                                  <div className="text-2xl">{item.i}</div>
                                  <div>
                                      <h4 className="font-bold text-white mb-1">{item.t}</h4>
                                      <p className="text-slate-500 text-sm">{item.d}</p>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* SECCIÓN DE COMUNIDAD Y REDES SOCIALES */}
      <section className="relative py-20 bg-[#0F172A] border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-2">Únete a nuestra Comunidad</h2>
              <p className="text-slate-400">Aprende a dominar tu dinero con nuestros tutoriales y consejos.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Tarjeta YouTube */}
            <a 
              href="https://www.youtube.com/channel/UCmgiCjzAr-DEEl-dCWT6CMA" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="glass-card p-6 rounded-2xl flex flex-col hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-red-500 text-[10px] font-bold uppercase tracking-wider bg-red-500/10 px-3 py-1 rounded-full">🎥 Tutoriales paso a paso</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">YouTube</h3>
                  <span className="text-sm font-normal text-slate-400 block">Prospera Finanzas</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">Aprende a sacarle el máximo provecho a tu cuenta. Guías detalladas, configuración de la Inteligencia Artificial y mucho más.</p>
              <span className="text-red-400 text-sm font-bold flex items-center gap-1">Ver canal <span className="group-hover:translate-x-1 transition-transform">→</span></span>
            </a>

            {/* Tarjeta Instagram */}
            <a 
              href="https://instagram.com/prosperafinanzas.ec" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="glass-card p-6 rounded-2xl flex flex-col hover:border-[#E1306C]/50 hover:shadow-[0_0_20px_rgba(225,48,108,0.15)] transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[#E1306C] text-[10px] font-bold uppercase tracking-wider bg-[#E1306C]/10 px-3 py-1 rounded-full">✨ Tips Diarios</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E1306C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#E1306C] transition-colors">Instagram</h3>
                  <span className="text-sm font-normal text-slate-400 block">@prosperafinanzas.ec</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">Consejos rápidos para ahorrar, trucos para evitar gastos hormiga y Shorts de la app.</p>
              <span className="text-[#E1306C] text-sm font-bold flex items-center gap-1">Seguirnos <span className="group-hover:translate-x-1 transition-transform">→</span></span>
            </a>

            {/* Tarjeta Facebook */}
            <a 
              href="https://www.facebook.com/profile.php?id=61587202734480" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="glass-card p-6 rounded-2xl flex flex-col hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-blue-400 text-[10px] font-bold uppercase tracking-wider bg-blue-400/10 px-3 py-1 rounded-full">🌐 Noticias</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">Facebook</h3>
                  <span className="text-sm font-normal text-slate-400 block">Prospera Finanzas</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">Entérate primero de las últimas actualizaciones, interactúa con nosotros y únete a la conversación financiera.</p>
              <span className="text-blue-400 text-sm font-bold flex items-center gap-1">Ir a la página <span className="group-hover:translate-x-1 transition-transform">→</span></span>
            </a>

          </div>
        </div>
      </section>

      {/* SECCIÓN DE CONSEJOS FINANCIEROS */}
      <section className="relative py-24 bg-[#171121] border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Aprende a jugar el juego del dinero</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">No necesitas ser un experto en economía. Aplica estos 5 principios básicos y deja que Prospera haga el trabajo pesado por ti.</p>
          </div>

          {/* Grid de Consejos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Consejo 1: Gasto Hormiga */}
            <div className="glass-card p-8 rounded-2xl border-t-4 border-t-[#EF4444] hover:-translate-y-2 transition-transform duration-300">
              <div className="w-12 h-12 bg-[#EF4444]/10 rounded-xl flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">1. Caza los Gastos Fantasma</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Ese café o snack diario de $4 dólares suma más de $1,400 al año. El primer paso para la riqueza es registrar cada centavo. 
                <span className="block mt-2 text-[#EF4444] font-semibold">💡 En Prospera: Registra gastos en 2 segundos y descubre en el gráfico de pastel a dónde se fuga tu dinero.</span>
              </p>
            </div>

            {/* Consejo 2: Presupuestos */}
            <div className="glass-card p-8 rounded-2xl border-t-4 border-t-[#F59E0B] hover:-translate-y-2 transition-transform duration-300">
              <div className="w-12 h-12 bg-[#F59E0B]/10 rounded-xl flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">2. Pon Límites Visuales</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                No gastes primero y ahorres lo que sobra. Define presupuestos claros para el mes. Si no ves tu límite de forma gráfica, es muy fácil pasarse.
                <span className="block mt-2 text-[#F59E0B] font-semibold">💡 En Prospera: Usa nuestro Monitor con alertas de zonas "Ideal" y "Crítica" para frenar a tiempo.</span>
              </p>
            </div>

            {/* Consejo 3: Recordatorios */}
            <div className="glass-card p-8 rounded-2xl border-t-4 border-t-[#3B82F6] hover:-translate-y-2 transition-transform duration-300">
              <div className="w-12 h-12 bg-[#3B82F6]/10 rounded-xl flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"></path><path d="M16 18h.01"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">3. Evita Regalar Dinero</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Las multas por pagos atrasados de tarjetas o servicios son el enemigo silencioso de tus finanzas. Tu cerebro olvidará las fechas, un sistema no.
                <span className="block mt-2 text-[#3B82F6] font-semibold">💡 En Prospera: Configura recordatorios y recibe notificaciones días antes de tus vencimientos.</span>
              </p>
            </div>

            {/* Consejo 4: Gamificación */}
            <div className="glass-card p-8 rounded-2xl border-t-4 border-t-[#00D68F] hover:-translate-y-2 transition-transform duration-300 lg:col-start-1 lg:col-end-2 lg:translate-x-1/2">
              <div className="w-12 h-12 bg-[#00D68F]/10 rounded-xl flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00D68F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">4. Engaña a tu Cerebro</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Ahorrar solo por ahorrar es aburrido y suele fracasar. Ponle nombre a tus metas (ej. "Mi Auto Nuevo") y celebra tus victorias para generar dopamina.
                <span className="block mt-2 text-[#00D68F] font-semibold">💡 En Prospera: Sube de nivel, gana medallas y convierte tus finanzas en un juego que siempre ganas.</span>
              </p>
            </div>

            {/* Consejo 5: Inteligencia Artificial */}
            <div className="glass-card p-8 rounded-2xl border-t-4 border-t-[#7C3BED] hover:-translate-y-2 transition-transform duration-300 lg:col-start-2 lg:col-end-3 lg:translate-x-1/2">
              <div className="w-12 h-12 bg-[#7C3BED]/10 rounded-xl flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7C3BED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M12 12l8.66-5"></path><path d="M12 12L3.34 7"></path><path d="M12 12V22"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">5. Analiza como un Experto</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Tus patrones de gasto tienen la clave para multiplicar tu dinero. Analizar tus datos a fin de mes te permite corregir errores rápidamente.
                <span className="block mt-2 text-[#7C3BED] font-semibold">💡 En Prospera: Tu Asistente IA analiza tus movimientos y te da un resumen inteligente con pasos a seguir.</span>
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECCIÓN LABORATERIO FINANCIERO (THE LAB) */}
      <section id="herramientas" className="relative py-24 bg-[#0F172A] border-t border-slate-800/50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[#00D68F]/5 blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              Herramientas Gratuitas
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Laboratorio Prospera 🧪</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto italic">
              "La claridad financiera comienza con un simple dato. Usa nuestras herramientas y descubre la verdad sobre tu dinero."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool) => (
              <div 
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className="glass-card p-8 rounded-[2.5rem] border border-slate-700/50 hover:border-[#00D68F]/40 transition-all cursor-pointer group flex flex-col items-center text-center relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 bg-slate-900 border border-slate-700 px-3 py-1 rounded-full text-[8px] font-black text-slate-400 group-hover:text-[#00D68F] transition-colors">
                  {tool.badge}
                </div>
                
                <div 
                  className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-6 shadow-2xl transition-transform group-hover:scale-110 duration-500"
                  style={{ background: `linear-gradient(135deg, ${tool.color}20 0%, ${tool.color}40 100%)`, border: `1px solid ${tool.color}40` }}
                >
                  {tool.icon}
                </div>

                <h3 className="text-xl font-black text-white mb-3 group-hover:text-[#00D68F] transition-colors leading-tight">{tool.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">{tool.desc}</p>
                
                <span className="text-[#00D68F] text-xs font-black uppercase tracking-widest flex items-center gap-2">
                  Probar ahora <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL DE HERRAMIENTAS */}
      {activeTool && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden animate-in fade-in duration-300">
          <div 
            onClick={() => setActiveTool(null)}
            className="absolute inset-0 bg-[#0b1120]/95 backdrop-blur-xl cursor-zoom-out"
          />
          <div className="relative w-full max-w-3xl bg-[#0F172A] rounded-[3rem] border border-slate-700 shadow-[0_0_80px_rgba(0,0,0,0.8)] flex flex-col max-h-[90vh] overflow-hidden">
            {/* Botón Cerrar */}
            <button 
              onClick={() => setActiveTool(null)}
              className="absolute top-6 right-6 z-20 bg-slate-800/80 hover:bg-slate-700 text-white p-3 rounded-full transition-all active:scale-95"
            >
              <IconX />
            </button>

            <div className="flex-1 overflow-y-auto p-8 sm:p-12">
               {activeTool === 'ant' && <AntExpenses onRegister={() => goToView('register')} />}
               {activeTool === 'loan' && <LoanStripper onRegister={() => goToView('register')} />}
               {activeTool === 'health' && <FinancialHealthTest onRegister={() => goToView('register')} />}
               {activeTool === 'subs' && <SubscriptionAuditor onRegister={() => goToView('register')} />}
            </div>

            {/* Footer del Modal */}
            <div className="p-6 bg-slate-900/50 border-t border-slate-800 text-center">
               <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em]">Potenciado por Prospera Lab</p>
            </div>
          </div>
        </div>
      )}

      <NewsSection />

      {/* SECCIÓN DE BENEFICIOS - RESUMEN */}
      <section className="relative py-24 bg-[#171121] border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">¿Por qué usar Prospera?</h2>
            <p className="text-slate-400 text-lg">Dejamos lo complicado atrás. Finanzas diseñadas para personas reales.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-[#00D68F]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#00D68F]/20">
                <IconShield />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Control Total</h3>
              <p className="text-slate-400 leading-relaxed">Conoce exactamente cuánto dinero tienes y hacia dónde va.</p>
            </div>
            <div className="glass-card p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-[#00D68F]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#00D68F]/20">
                <IconTrophy />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Ahorro Gamificado</h3>
              <p className="text-slate-400 leading-relaxed">Ahorrar ya no es un castigo. Define tus metas y celebra el progreso.</p>
            </div>
            <div className="glass-card p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-[#7c3bed]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#7c3bed]/20">
                <IconBrain />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Tu Asesor IA</h3>
              <p className="text-slate-400 leading-relaxed">Nuestra IA analiza tus patrones y te ayuda a optimizar tus finanzas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0F172A] border-t border-slate-800 py-10 px-6 text-center text-slate-500 text-sm flex flex-col items-center">
        <div className="flex items-center gap-2 text-slate-400 mb-6 opacity-50">
          <IconChart />
          <span className="text-lg font-black tracking-tighter uppercase">Prospera</span>
        </div>
        <p>© {new Date().getFullYear()} Prospera. Todos los derechos reservados.</p>
      </footer>

    </div>
  );
}
