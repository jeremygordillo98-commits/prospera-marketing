'use client';

// Prospera Marketing - Home Page (Next.js Version)
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { supabase } from '@/services/supabase';

// Iconos y sub-componentes se mantienen igual pero con rutas Next.js
import AntExpenses from '@/components/tools/AntExpenses';
import LoanStripper from '@/components/tools/LoanStripper';
import FinancialHealthTest from '@/components/tools/FinancialHealthTest';
import SubscriptionAuditor from '@/components/tools/SubscriptionAuditor';

// Iconos (Mantenidos de la versión original)
const IconChart = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>;
const IconShield = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00D68F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>;
const IconTrophy = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00D68F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 21h8M12 17v4M7 4h10v3A5 5 0 0 1 12 12a5 5 0 0 1-5-5V4z"></path><path d="M7 4H4a2 2 0 0 0-2 2v1a6 6 0 0 0 6 6h1"></path><path d="M17 4h3a2 2 0 0 1 2 2v1a6 6 0 0 1-6 6h-1"></path></svg>;
const IconBrain = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00D68F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path></svg>;
const IconCheck = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00D68F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const IconX = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;

function NewsSection() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<any | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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

  if (!mounted || loading) return null;
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
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
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
      {selectedNews && mounted && createPortal(
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 overflow-hidden animate-in fade-in duration-300">
          <div
            onClick={() => setSelectedNews(null)}
            className="absolute inset-0 bg-[#0b1120]/95 backdrop-blur-3xl cursor-zoom-out"
          />
          <div className="relative w-full max-w-3xl bg-[#0F172A] rounded-[3rem] border border-slate-700 shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col max-h-[90vh] overflow-hidden">
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
                  <Image src={selectedNews.image_url} alt={selectedNews.title} fill sizes="(max-width: 768px) 100vw, 100vw" className="object-cover" />
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
              <a
                href={typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:5173/login?mode=register' : 'https://app.prosperafinanzas.com/login?mode=register'}
                className="bg-gradient-to-r from-[#00D68F] to-[#059669] text-[#0F172A] font-black px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-all text-sm block"
              >
                Empezar a Prosperar 🚀
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}

export default function Home() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getAppUrl = (mode: 'login' | 'register') => {
    const baseUrl = typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:5173' : 'https://app.prosperafinanzas.com';
    return `${baseUrl}/login?mode=${mode}`;
  };

  const tools = [
    { id: 'ant', title: 'Detector de Gastos Hormiga', desc: '¿Cuánto te cuesta ese café diario en 10 años?', icon: '🐜', color: '#EF4444', badge: 'VIRAL' },
    { id: 'loan', title: 'Desnudador de Préstamos', desc: 'Descubre la tasa real tras esas "cuotas cómodas".', icon: '💸', color: '#F59E0B', badge: 'SHOCK' },
    { id: 'health', title: 'Test de Salud Financiera', desc: 'Descubre tu score y tu perfil financiero actual.', icon: '📈', color: '#3B82F6', badge: 'POPULAR' },
    { id: 'subs', title: 'Auditor de Suscripciones', desc: '¿Sabes cuánto gastas al año en streaming y apps?', icon: '🔎', color: '#7C3BED', badge: 'NUEVO' }
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 font-sans overflow-x-hidden selection:bg-[#00D68F] selection:text-white">


      {/* NAVBAR */}
      <nav className="w-full fixed top-0 z-50 glass-card px-4 sm:px-6 py-4 flex justify-between items-center border-b border-slate-800/50">
        <div className="flex items-center gap-2 text-[#00D68F]">
          <IconChart />
          <span className="text-lg sm:text-xl font-black tracking-tighter uppercase text-slate-50">Prospera</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          {/* <a 
            href="https://pymes.prosperafinanzas.com" 
            className="hidden md:block text-xs font-black uppercase tracking-widest text-[#00D68F] hover:text-white transition-colors"
          >
            Módulo Pymes 💼
          </a> */}
          <a href={getAppUrl('login')} className="block text-xs sm:text-sm font-bold text-slate-300 hover:text-white hover:bg-slate-800/50 px-2 sm:px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
            <span className="hidden sm:inline">Iniciar Sesión</span>
            <span className="sm:hidden">Ingresar</span>
          </a>
          <a href={getAppUrl('register')} className="text-xs sm:text-sm font-bold text-[#0F172A] bg-gradient-to-r from-[#00D68F] to-[#059669] hover:from-[#00F0A0] hover:to-[#05B680] px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg transition-all shadow-[0_0_15px_rgba(0,214,143,0.3)] hover:shadow-[0_0_25px_rgba(0,214,143,0.5)] transform hover:scale-105 whitespace-nowrap">
            Registrarse Gratis
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative pt-24 pb-12 lg:pt-48 lg:pb-32 px-4 sm:px-6 flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto min-h-[calc(100vh-80px)] lg:min-h-screen">
        <div className="absolute inset-0 neural-bg opacity-60 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0F172A] via-transparent to-[#7c3bed]/10 opacity-80 pointer-events-none"></div>
        <div className="relative z-10 w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left mb-8 lg:mb-0 pr-0 lg:pr-12">
          <div className="inline-block px-3 py-1 lg:px-4 lg:py-1.5 rounded-full bg-[#00D68F]/10 border border-[#00D68F]/30 text-[#00D68F] text-[10px] md:text-xs font-bold tracking-widest uppercase mb-4 md:mb-6 shadow-sm">
            La Nueva Era de tus Finanzas
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 md:mb-6 leading-[1.1]">
            Domina tu dinero.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D68F] to-[#059669]">Logra tus metas.</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base md:text-xl font-light leading-relaxed mb-6 md:mb-8 max-w-xl">
            Deja atrás las hojas de cálculo aburridas y el estrés de no saber en qué gastas. Prospera es el asistente financiero inteligente que convierte el ahorro en un juego donde tú siempre ganas.
          </p>
          <div className="flex flex-col gap-2 md:gap-3 mb-8 md:mb-10 text-slate-300 text-xs sm:text-sm md:text-base text-left">
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <span className="scale-75 md:scale-100 transform flex-shrink-0"><IconCheck /></span>
              <span>Alertas de gastos para no salirte del presupuesto.</span>
            </div>
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <span className="scale-75 md:scale-100 transform flex-shrink-0"><IconCheck /></span>
              <span>Consejos personalizados con Inteligencia Artificial.</span>
            </div>
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <span className="scale-75 md:scale-100 transform flex-shrink-0"><IconCheck /></span>
              <span>Gamificación: Gana medallas al cumplir tus metas.</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <a href={getAppUrl('register')} className="text-center bg-gradient-to-r from-[#00D68F] to-[#059669] text-[#0F172A] font-black text-base sm:text-lg md:text-xl px-6 py-3.5 md:px-10 md:py-4 rounded-xl shadow-[0_0_20px_rgba(0,214,143,0.4)] hover:shadow-[0_0_35px_rgba(0,214,143,0.7)] hover:-translate-y-1 hover:scale-105 transition-all w-full sm:w-auto border border-[#00F0A0]/50">
              Comenzar Gratis Hoy
            </a>
            <a href={getAppUrl('login')} className="text-center bg-[#1E293B] text-white font-bold text-base sm:text-lg px-6 py-3.5 md:px-8 md:py-4 rounded-xl border border-slate-600 hover:bg-slate-700 hover:border-slate-500 hover:-translate-y-1 transition-all w-full sm:w-auto">
              Ya tengo cuenta
            </a>
          </div>
          {/* <p className="mt-8 text-slate-500 text-sm font-medium">
            💼 ¿Dueño de Negocio? Prueba <a href="https://pymes.prosperafinanzas.com" className="text-[#00D68F] font-black hover:underline">Prospera Pymes</a>
          </p> */}
        </div>
        <div className="relative z-10 w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[280px] md:max-w-md aspect-[9/16] bg-[#1E293B] rounded-[3rem] border-[10px] border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden floating-img">
            <Image src="/ChatBotIACel.jpeg" alt="ChatBot con IA de Prospera" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>
          </div>
          <div className="absolute -bottom-10 -left-6 md:-left-12 z-20 glass-card p-4 rounded-2xl border border-[#00D68F]/30 shadow-2xl animate-bounce duration-[3000ms]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#00D68F] rounded-lg flex items-center justify-center text-xl">🤖</div>
              <div>
                <p className="text-[10px] font-black uppercase text-[#00D68F] tracking-tighter">Asistente IA</p>
                <p className="text-xs font-bold text-white">"¡Ahorraste $20 hoy! 🚀"</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* SHOWCASE */}
      <section className="relative py-24 bg-[#0F172A] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-3/5 relative">
              <div className="relative rounded-2xl border border-slate-700 shadow-2xl overflow-hidden bg-slate-900 aspect-video group">
                <Image src="/Dashboard.png" alt="Prospera Desktop Dashboard" fill sizes="(max-width: 768px) 100vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="absolute -bottom-12 -right-6 md:-right-10 w-48 md:w-64 aspect-[9/19] bg-slate-800 rounded-[2.5rem] border-[6px] border-slate-900 shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden hidden md:block group">
                <Image src="/ReporteCel.jpeg" alt="Prospera Mobile View" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover transition-all duration-500 group-hover:brightness-110" />
              </div>
            </div>
            <div className="w-full lg:w-2/5 flex flex-col gap-6">
              <h2 className="text-4xl font-black text-white leading-tight">Una interfaz diseñada para el <span className="text-[#00D68F]">éxito.</span></h2>
              <p className="text-slate-400 text-lg leading-relaxed">Ya sea que prefieras la profundidad de los reportes en tu computadora o la rapidez de registrar gastos desde tu celular, Prospera se adapta a ti.</p>
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

      {/* COMUNIDAD */}
      <section className="relative py-20 bg-[#0F172A] border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-12">Únete a nuestra Comunidad</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="https://www.youtube.com/channel/UCmgiCjzAr-DEEl-dCWT6CMA" target="_blank" className="glass-card p-6 rounded-2xl flex flex-col hover:border-red-500/50 transition-all group">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400">YouTube</h3>
              <p className="text-slate-400 text-sm">Tutoriales paso a paso para dominar tu cuenta.</p>
            </a>
            <a href="https://instagram.com/prosperafinanzas.ec" target="_blank" className="glass-card p-6 rounded-2xl flex flex-col hover:border-[#E1306C]/50 transition-all group">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#E1306C]">Instagram</h3>
              <p className="text-slate-400 text-sm">Tips diarios y hacks de ahorro rápido.</p>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61587202734480" target="_blank" className="glass-card p-6 rounded-2xl flex flex-col hover:border-blue-500/50 transition-all group">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400">Facebook</h3>
              <p className="text-slate-400 text-sm">Comunidad y últimas noticias del ecosistema.</p>
            </a>
          </div>
        </div>
      </section>

      {/* LAB SECTION */}
      <section id="herramientas" className="relative py-24 bg-[#0F172A] border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-16">Laboratorio Prospera 🧪</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool) => (
              <div key={tool.id} onClick={() => setActiveTool(tool.id)} className="glass-card p-8 rounded-[2.5rem] border border-slate-700/50 hover:border-[#00D68F]/40 transition-all cursor-pointer group">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">{tool.icon}</div>
                <h3 className="text-lg font-black text-white mb-2">{tool.title}</h3>
                <p className="text-slate-500 text-sm">Probar ahora →</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {activeTool && mounted && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden animate-in fade-in">
          <div onClick={() => setActiveTool(null)} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
          <div className="relative w-full max-w-3xl bg-[#0F172A] rounded-[3rem] border border-slate-700 p-8 sm:p-12 overflow-y-auto max-h-[90vh]">
            <button onClick={() => setActiveTool(null)} className="absolute top-6 right-6 text-white"><IconX /></button>
            {activeTool === 'ant' && <AntExpenses onRegister={() => window.location.href = getAppUrl('register')} />}
            {activeTool === 'loan' && <LoanStripper onRegister={() => window.location.href = getAppUrl('register')} />}
            {activeTool === 'health' && <FinancialHealthTest onRegister={() => window.location.href = getAppUrl('register')} />}
            {activeTool === 'subs' && <SubscriptionAuditor onRegister={() => window.location.href = getAppUrl('register')} />}
          </div>
        </div>,
        document.body
      )}

      <NewsSection />

      <footer className="bg-[#0F172A] border-t border-slate-800 py-10 text-center">
        <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Prospera. Todos los derechos reservados.</p>
      </footer>

    </div>
  );
}
