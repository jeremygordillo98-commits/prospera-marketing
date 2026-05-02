'use client';

// Prospera Marketing - Home Page (Next.js Version)
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { supabase } from '@/services/supabase';

// ICONOS
const IconChart = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>;
const IconCheck = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00D68F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const IconX = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const IconChevronDown = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>;
const IconInstagram = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const IconYouTube = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>;
const IconFacebook = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
const IconTikTok = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>;

function NewsSection() {
  const [news, setNews] = useState<any[]>([]);
  const [selectedNews, setSelectedNews] = useState<any | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchNews = async () => {
      const { data } = await supabase.from('public_news').select('*').eq('is_published', true).order('published_at', { ascending: false });
      if (data) setNews(data);
    };
    fetchNews();
  }, []);

  if (!mounted || news.length === 0) return null;

  return (
    <section id="noticias" className="relative py-20 bg-[#0F172A] border-t border-white/5 w-full">
      <div className="w-full px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase">Prospera News</h2>
          <p className="text-slate-400">Tutoriales y actualidad financiera.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item) => {
            const borderColors: Record<string, string> = {
              'Actualización': 'hover:border-slate-500/50 border-white/5',
              'Tip Financiero': 'hover:border-[#00D68F]/50 border-white/5',
              'Aviso Importante': 'hover:border-orange-500/50 border-white/5',
              'Nueva Funcionalidad': 'hover:border-violet-500/50 border-white/5'
            };
            const borderColor = borderColors[item.category] || 'hover:border-[#00D68F]/30 border-white/5';

            return (
              <div key={item.id} className={`glass-card rounded-3xl border ${borderColor} overflow-hidden group transition-all flex flex-col cursor-pointer shadow-xl`} onClick={() => setSelectedNews(item)}>
                {item.image_url && <div className="w-full aspect-video relative overflow-hidden"><Image src={item.image_url} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" /></div>}
                <div className="p-6 overflow-hidden">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-white/5 ${item.category === 'Tip Financiero' ? 'text-[#00D68F]' : item.category === 'Aviso Importante' ? 'text-orange-400' : item.category === 'Nueva Funcionalidad' ? 'text-violet-400' : 'text-slate-400'}`}>{item.category}</span>
                  </div>
                  <h3 className="text-xl font-black text-white mb-2 leading-tight line-clamp-2">{item.title}</h3>
                  <p className="text-slate-500 text-xs line-clamp-2">{item.summary}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {selectedNews && mounted && createPortal(
        <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
          <div onClick={() => setSelectedNews(null)} className="absolute inset-0 bg-black/95 backdrop-blur-3xl" />
          <div className="relative w-full max-w-2xl bg-[#0F172A] rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <span className="text-[#00D68F] text-[10px] font-black uppercase tracking-widest">{selectedNews.category}</span>
              <button onClick={() => setSelectedNews(null)} className="text-white p-2 hover:bg-white/5 rounded-full transition-all"><IconX /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 md:p-12">
              <h2 className="text-3xl font-black text-white mb-6 leading-tight">{selectedNews.title}</h2>
              <div className="prose prose-invert max-w-none text-slate-400 text-base leading-relaxed space-y-4">
                {selectedNews.content?.split('\n').filter((p: string) => p.trim() !== '').map((para: string, i: number) => <p key={i}>{para}</p>)}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}

export default function MarketingHome() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const getAppUrl = (mode: 'login' | 'register') => {
    const baseUrl = typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:5173' : 'https://app.prosperafinanzas.com';
    return `${baseUrl}/login?mode=${mode}`;
  };

  const getPymesUrl = (mode: 'login' | 'register') => {
    const baseUrl = typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:5174' : 'https://pymes.prosperafinanzas.com';
    return `${baseUrl}/login?mode=${mode}`;
  };

  const tools = [
    { title: 'Detector de Gastos Hormiga', icon: '🐜', path: '/lab/ant' },
    { title: 'Desnudador de Préstamos', icon: '💸', path: '/lab/loan' },
    { title: 'Test de Salud Financiera', icon: '📈', path: '/lab/health' },
    { title: 'Auditor de Suscripciones', icon: '🔎', path: '/lab/subs' }
  ];

  const collageImages = [
    'Pymes1.png', 'Pymes2.png', 'Pymes3.png', 'Dashboard.png', 'Reportes.png',
    'ChatBotIACel.jpeg', 'InicioCel.jpeg', 'ReporteCel.jpeg', 'MovimientosIA.png',
    'Presupuestos.png', 'ReporteCalorCel.jpeg', 'IngresoCelIA.jpeg'
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 font-sans overflow-x-hidden selection:bg-[#00D68F] selection:text-white">

      {/* NAVBAR REDISEÑADO - ALTURA DECENTE Y COMPONENTES EN FILA */}
      <nav className="w-full fixed top-0 z-[1000] glass-card border-b border-white/5 backdrop-blur-xl h-20 flex items-center">
        {/* Backdrop para cerrar menús al hacer clic fuera */}
        {activeMenu && (
          <div
            className="fixed inset-0 bg-transparent z-[1005]"
            onClick={() => setActiveMenu(null)}
          />
        )}

        <div className="w-full px-4 md:px-8 flex justify-between items-center max-w-7xl mx-auto relative z-[1010]">
          <div className="flex items-center gap-2 text-[#00D68F] flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <IconChart />
            <span className="text-xl font-black tracking-tighter uppercase text-white">Prospera</span>
          </div>

          <div className="flex items-center gap-4 md:gap-14 h-full">
            {[
              { label: 'App', items: [{ l: 'Login', p: getAppUrl('login') }, { l: 'Registro', p: getAppUrl('register') }] },
              { label: 'Precios', items: [{ l: 'Planes y Precios', p: '#precios' }, { l: 'Comparativa', p: '#comparativa' }] },
              { label: 'Pymes', items: [{ l: 'Login', p: getPymesUrl('login') }, { l: 'Registro', p: getPymesUrl('register') }] },
              { label: 'Lab', items: tools.map(t => ({ l: t.title, p: t.path, i: t.icon })) }
            ].map(menu => (
              <div key={menu.label} className="relative flex items-center h-full">
                <div
                  onClick={() => setActiveMenu(activeMenu === menu.label ? null : menu.label)}
                  className={`flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.2em] transition-colors whitespace-nowrap py-10 md:py-8 cursor-pointer ${activeMenu === menu.label ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  {menu.label} <IconChevronDown />
                </div>
                <div className={`absolute top-full left-1/2 -translate-x-1/2 min-w-[200px] bg-[#0b1120] border border-white/10 rounded-b-2xl shadow-2xl transition-all overflow-hidden z-[1020] ${activeMenu === menu.label ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                  {menu.items.map((sub: any) => (
                    <a key={sub.l} href={sub.p} target={menu.label === 'Lab' ? '_blank' : '_self'} className="block px-7 py-4 text-xs font-bold text-slate-300 hover:bg-white/5 flex items-center gap-4 transition-colors border-b border-white/5 last:border-0 cursor-pointer">
                      {sub.i && <span>{sub.i}</span>}
                      {sub.l}
                    </a>
                  ))}
                </div>
              </div>
            ))}

            <a href={getAppUrl('register')} className="hidden lg:block bg-[#00D68F] text-[#0F172A] font-black px-6 py-2.5 rounded-xl text-xs uppercase hover:scale-105 transition-all shadow-lg active:scale-95 cursor-pointer">Empezar Ahora</a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative pt-40 pb-20 px-6 w-full flex flex-col items-center justify-center min-h-[80vh] text-center max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-9xl font-black text-white mb-8 leading-[1] tracking-tighter max-w-5xl mx-auto text-balance">
          Tu mundo financiero en <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D68F] to-[#059669]">alta definición.</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-2xl font-light mb-12 max-w-3xl mx-auto leading-relaxed">Fusionamos inteligencia artificial y control absoluto para potenciar la vida financiera de personas y empresas.</p>
      </header>

      {/* SECCIÓN: FINANZAS PERSONALES */}
      <section className="py-24 bg-[#0F172A] border-t border-white/5 overflow-hidden">
        <div className="w-full px-6 flex flex-col lg:flex-row items-center gap-24 max-w-7xl mx-auto">
          <div className="lg:w-1/2">
            <h4 className="text-[#00D68F] text-2xl md:text-4xl font-black uppercase tracking-[0.3em] mb-6 leading-none">Prospera App</h4>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-10 leading-[1.1]">Control total de tus <br /> <span className="text-[#00D68F]">finanzas personales.</span></h2>
            <div className="space-y-8 text-left">
              {[
                { t: 'Inteligencia Predictiva', d: 'Analizamos tus patrones históricos para anticipar gastos futuros y optimizar tu flujo de caja mensual con precisión milimétrica.', i: '🔮' },
                { t: 'Metas Gamificadas', d: 'Transformamos el ahorro en una experiencia gratificante. Gana medallas y desbloquea beneficios exclusivos a medida que alcanzas tus hitos.', i: '🎮' },
                { t: 'Seguridad Bancaria', d: 'Tus datos están protegidos con encriptación de nivel militar (AES-256) y autenticación multifactor, garantizando privacidad absoluta.', i: '🛡️' }
              ].map((f, i) => (
                <div key={i} className="flex gap-6 items-start animate-fade-in group">
                  <span className="text-4xl flex-shrink-0 mt-1 transition-transform group-hover:scale-110">{f.i}</span>
                  <div>
                    <h4 className="font-bold text-white text-xl md:text-2xl mb-2">{f.t}</h4>
                    <p className="text-slate-400 text-base leading-relaxed">{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 relative group">
            <div className="relative w-full aspect-[16/10] rounded-[3rem] border-[12px] border-slate-900 shadow-2xl overflow-hidden bg-slate-900 cursor-zoom-in">
              <Image src="/Dashboard.png" alt="Dashboard App" fill className="object-contain" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-1/2 aspect-[9/19] rounded-[2.5rem] border-[8px] border-slate-900 shadow-2xl overflow-hidden hidden lg:block translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
              <Image src="/InicioCel.jpeg" alt="Mobile View" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN: PYMES */}
      <section className="py-24 bg-[#0F172A] border-y border-white/5 overflow-hidden">
        <div className="w-full px-6 flex flex-col lg:flex-row-reverse items-center gap-24 max-w-7xl mx-auto">
          <div className="lg:w-1/2">
            <h4 className="text-[#7c3bed] text-2xl md:text-4xl font-black uppercase tracking-[0.3em] mb-6 leading-none">Prospera Pymes</h4>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-10 leading-[1.1]">Potencia el motor de <br /> <span className="text-[#7c3bed]">tu negocio.</span></h2>
            <div className="space-y-8 text-left">
              {[
                { t: 'Gestión XML Centralizada', d: 'Importa tus facturas electrónicas masivamente y deja que nuestro sistema clasifique tus movimientos de forma automática.', i: '⚡' },
                { t: 'Tesorería Avanzada', d: 'Control quirúrgico de cuentas por cobrar, pagos a proveedores y conciliaciones bancarias en una sola vista estratégica.', i: '💹' },
                { t: 'Asientos Inteligentes', d: 'Generamos tus registros contables a partir de actividades operativas, facilitando el trabajo de tu contador.', i: '📝' }
              ].map((f, i) => (
                <div key={i} className="flex gap-6 items-start group">
                  <span className="text-4xl flex-shrink-0 mt-1 transition-transform group-hover:scale-110">{f.i}</span>
                  <div>
                    <h4 className="font-bold text-white text-xl md:text-2xl mb-2">{f.t}</h4>
                    <p className="text-slate-400 text-base leading-relaxed">{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 relative group">
            <div className="relative w-full aspect-[16/10] rounded-[3rem] border-[12px] border-slate-900 shadow-2xl overflow-hidden bg-slate-900 cursor-zoom-in">
              <Image src="/Pymes1.png" alt="Pymes Workspace" fill className="object-contain" />
            </div>
            <div className="absolute -bottom-8 -left-8 w-[60%] aspect-[16/10] rounded-[2rem] border-[8px] border-slate-900 shadow-2xl overflow-hidden hidden lg:block translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
              <Image src="/Pymes2.png" alt="Pymes Reports" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN: COMPARATIVA */}
      <section id="comparativa" className="py-24 bg-[#0F172A] border-t border-white/5 w-full">
        <div className="w-full px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#00D68F] text-xs font-black uppercase tracking-[0.5em] mb-4 block">¿Por qué Prospera?</span>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter leading-tight">Lo que solo <span className="text-[#00D68F]">nosotros</span> hacemos.</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">La primera app de finanzas personales construida específicamente para la banca ecuatoriana.</p>
          </div>
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-4 px-5 text-slate-500 text-xs font-black uppercase tracking-widest border-b border-white/5 w-[34%]">Funcionalidad</th>
                  <th className="py-4 px-3 text-center border-b border-white/5 w-[16%]">
                    <div className="bg-[#00D68F]/10 border border-[#00D68F]/30 rounded-xl px-3 py-1.5 inline-block">
                      <span className="text-[#00D68F] font-black text-sm">Prospera</span>
                    </div>
                  </th>
                  <th className="py-4 px-3 text-center text-slate-500 text-xs font-bold border-b border-white/5">Spendee</th>
                  <th className="py-4 px-3 text-center text-slate-500 text-xs font-bold border-b border-white/5">Wallet</th>
                  <th className="py-4 px-3 text-center text-slate-500 text-xs font-bold border-b border-white/5">Money Manager</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { f: 'Importador Banco Pichincha', p: '✅', s: '❌', w: '❌', m: '❌', star: true },
                  { f: 'Importador Produbanco / Guayaquil / DeUna', p: '✅', s: '❌', w: '❌', m: '❌', star: true },
                  { f: 'Conciliación Bancaria', p: '✅', s: '❌', w: '❌', m: '❌', star: true },
                  { f: 'Asistente IA — Chat CFO', p: '✅', s: '❌', w: '❌', m: '❌', star: true },
                  { f: 'Registro por voz / lenguaje natural', p: '✅', s: '❌', w: '❌', m: '❌', star: true },
                  { f: 'Presupuestos con 3 umbrales', p: '✅', s: 'Básico', w: 'Básico', m: 'Básico', star: false },
                  { f: 'Gamificación con insignias reales', p: '✅', s: '❌', w: '❌', m: '❌', star: false },
                  { f: 'Modo Privacidad', p: '✅', s: '❌', w: '❌', m: '❌', star: false },
                  { f: 'En español nativo', p: '✅', s: '✅', w: '✅', m: '✅', star: false },
                  { f: 'Prueba gratuita', p: '30 días', s: '❌', w: '7 días', m: '❌', star: false },
                  { f: 'Precio de entrada', p: 'desde $0.10', s: '$3.99/mes', w: '€1.99/mes', m: 'Gratis*', star: false },
                ].map((row, i) => (
                  <tr key={i} className={`border-b border-white/5 transition-colors hover:bg-white/[0.02] ${row.star ? 'bg-[#00D68F]/[0.03]' : ''}`}>
                    <td className="py-4 px-5 text-slate-300 text-sm font-semibold">{row.star && <span className="text-[#00D68F] mr-1.5">★</span>}{row.f}</td>
                    <td className="py-4 px-3 text-center text-sm font-bold text-[#00D68F]">{row.p}</td>
                    <td className="py-4 px-3 text-center text-sm text-slate-500">{row.s}</td>
                    <td className="py-4 px-3 text-center text-sm text-slate-500">{row.w}</td>
                    <td className="py-4 px-3 text-center text-sm text-slate-500">{row.m}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-slate-600 text-xs mt-6">★ Funcionalidades exclusivas de Prospera disponibles únicamente en el mercado ecuatoriano.</p>
        </div>
      </section>

      {/* SECCIÓN: MURAL COLLAGE */}
      <section className="py-40 w-full bg-[#0F172A] relative overflow-hidden min-h-[950px] flex items-center justify-center">
        <div className="absolute inset-0 z-0 grid grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-2 p-2 transform rotate-2 scale-110 pointer-events-none opacity-90">
          {Array.from({ length: 60 }).map((_, i) => (
            <div key={i} className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-2xl shadow-black border border-white/5">
              <Image src={`/${collageImages[i % collageImages.length]}`} alt="UI Shot" fill className="object-cover" />
            </div>
          ))}
        </div>
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#0F172A] via-[#0F172A]/80 to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/80 to-transparent z-10" />
        <div className="relative z-20 text-center px-6 max-w-5xl">
          <span className="text-[#00D68F] text-xs font-black uppercase tracking-[0.5em] mb-4 block">Multidispositivo</span>
          <h2 className="text-6xl md:text-9xl font-black text-white mb-8 uppercase tracking-tighter leading-none shadow-black drop-shadow-2xl">Ecosistema <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D68F] to-[#7c3bed]">Ilimitado.</span></h2>
          <p className="text-slate-200 text-xl md:text-2xl font-bold bg-[#0F172A]/40 backdrop-blur-md px-8 py-4 rounded-full border border-white/10 w-fit mx-auto shadow-2xl">Prospera acompaña cada paso de tu vida financiera.</p>
        </div>
      </section>

      {/* SECCIÓN: PRECIOS */}
      <section id="precios" className="py-24 bg-[#0F172A] border-t border-white/5 w-full">
        <div className="w-full px-6 max-w-7xl mx-auto">

          <div className="text-center mb-16">
            <span className="text-[#00D68F] text-xs font-black uppercase tracking-[0.5em] mb-4 block">Planes y Precios</span>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter leading-tight">Paga solo por<br /><span className="text-[#00D68F]">lo que usas.</span></h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Elige cada herramienta de forma individual o ahorra con nuestros combos. Sin contratos, sin sorpresas.</p>
          </div>

          {/* 30-day trial banner */}
          <div className="bg-gradient-to-r from-[#00D68F]/10 to-[#059669]/5 border border-[#00D68F]/25 rounded-3xl p-6 md:p-8 mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <span className="text-5xl flex-shrink-0">🎁</span>
              <div>
                <h3 className="text-white font-black text-xl md:text-2xl mb-1">30 días con acceso total. Sin costo.</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Al registrarte desbloqueas todas las herramientas por 30 días. Después decides exactamente qué quedarte y cuánto pagar.</p>
              </div>
            </div>
            <a href={getAppUrl('register')} className="bg-[#00D68F] text-[#0F172A] font-black px-8 py-3 rounded-2xl text-sm uppercase hover:scale-105 transition-all shadow-lg shadow-[#00D68F]/30 whitespace-nowrap flex-shrink-0">Empezar Gratis →</a>
          </div>

          {/* Bundles Pro / Ultra */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {/* PRO */}
            <div className="relative glass-card rounded-3xl border border-white/10 p-8 flex flex-col">
              <div className="mb-6">
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">Plan</span>
                <h3 className="text-3xl font-black text-white mt-1">Pro</h3>
                <div className="flex items-end gap-2 mt-3">
                  <span className="text-5xl font-black text-white">$1.29</span>
                  <span className="text-slate-400 font-bold mb-2">/mes</span>
                </div>
                <p className="text-slate-500 text-xs mt-1">Comprado individualmente: <span className="line-through">$1.70/mes</span> — Ahorras 24%</p>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {[
                  '🎯 Presupuestos Inteligentes',
                  '🔔 Recordatorios de Pago',
                  '🗂️ Subcategorías',
                  '📥 Estado de Cuenta + Importador Bancario',
                  '💰 Reporte de Patrimonio',
                  '💧 Reporte de Flujo',
                  '🏦 Conciliación Bancaria',
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                    <svg className="w-4 h-4 text-[#00D68F] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href={getAppUrl('register')} className="block text-center bg-white/5 hover:bg-[#00D68F]/10 border border-white/10 hover:border-[#00D68F]/40 text-white font-black py-4 rounded-2xl text-sm uppercase transition-all">Empezar con Pro</a>
            </div>

            {/* ULTRA */}
            <div className="relative glass-card rounded-3xl border border-[#00D68F]/30 p-8 flex flex-col shadow-xl shadow-[#00D68F]/10">
              <div className="absolute top-6 right-6 bg-[#00D68F] text-[#0F172A] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Más Popular</div>
              <div className="mb-6">
                <span className="text-xs font-black uppercase tracking-widest text-[#00D68F]">Plan</span>
                <h3 className="text-3xl font-black text-white mt-1">Ultra</h3>
                <div className="flex items-end gap-2 mt-3">
                  <span className="text-5xl font-black text-white">$3.99</span>
                  <span className="text-slate-400 font-bold mb-2">/mes</span>
                </div>
                <p className="text-slate-500 text-xs mt-1">Comprado individualmente: <span className="line-through">$5.90/mes</span> — Ahorras 32%</p>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {[
                  '✅ Todo lo del Plan Pro',
                  '📈 Reporte Comparativo',
                  '🔥 Mapa de Calor de Gastos',
                  '✨ Smart Insights IA',
                  '🤖 Chat CFO — Asistente IA',
                  '🪄 Magic Input — Registro por IA',
                ].map((f, i) => (
                  <li key={i} className={`flex items-center gap-3 text-sm ${i === 0 ? 'text-[#00D68F] font-bold' : 'text-slate-300'}`}>
                    <svg className="w-4 h-4 text-[#00D68F] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href={getAppUrl('register')} className="block text-center bg-[#00D68F] hover:scale-[1.02] text-[#0F172A] font-black py-4 rounded-2xl text-sm uppercase transition-all shadow-lg shadow-[#00D68F]/40">Empezar con Ultra</a>
            </div>
          </div>

          {/* À-la-carte */}
          <div>
            <div className="text-center mb-10">
              <h3 className="text-white font-black text-2xl md:text-3xl mb-2">O arma tu propio plan</h3>
              <p className="text-slate-500 text-sm">Paga solo por las herramientas que realmente necesitas. Precios mensuales.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  cat: 'Productividad', color: '#00D68F', items: [
                    { name: 'Presupuestos Inteligentes', icon: '🎯', price: '0.10' },
                    { name: 'Recordatorios de Pago', icon: '🔔', price: '0.10' },
                    { name: 'Subcategorías', icon: '🗂️', price: '0.30' },
                  ]
                },
                {
                  cat: 'Reportes', color: '#38bdf8', items: [
                    { name: 'Estado de Cuenta + Importador', icon: '📥', price: '0.30' },
                    { name: 'Reporte de Patrimonio', icon: '💰', price: '0.30' },
                    { name: 'Reporte de Flujo', icon: '💧', price: '0.30' },
                  ]
                },
                {
                  cat: 'Análisis', color: '#f97316', items: [
                    { name: 'Conciliación Bancaria', icon: '🏦', price: '0.30' },
                    { name: 'Reporte Comparativo', icon: '📈', price: '0.60' },
                    { name: 'Mapa de Calor', icon: '🔥', price: '0.60' },
                  ]
                },
                {
                  cat: 'Inteligencia Artificial', color: '#a78bfa', items: [
                    { name: 'Smart Insights IA', icon: '✨', price: '1.00' },
                    { name: 'Chat CFO IA', icon: '🤖', price: '1.00' },
                    { name: 'Magic Input IA', icon: '🪄', price: '1.00' },
                  ]
                },
              ].map((group, gi) => (
                <div key={gi} className="glass-card rounded-3xl border border-white/5 p-6">
                  <h4 className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: group.color }}>{group.cat}</h4>
                  <div className="space-y-3">
                    {group.items.map((item, ii) => (
                      <div key={ii} className="flex items-center justify-between gap-2 py-2.5 border-b border-white/5 last:border-0">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-lg flex-shrink-0">{item.icon}</span>
                          <span className="text-slate-300 text-xs font-semibold leading-tight">{item.name}</span>
                        </div>
                        <span className="text-white font-black text-sm flex-shrink-0">${item.price}<span className="text-slate-500 font-normal text-xs">/mes</span></span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-slate-600 text-xs mt-8">* Todos los precios son en USD. Acceso activado manualmente por el administrador dentro de las 24h hábiles de tu solicitud.</p>
          </div>
        </div>
      </section>

      <NewsSection />

      {/* MEGA FOOTER */}
      <footer className="bg-[#0F172A] border-t border-white/5 pt-32 pb-16 w-full">
        <div className="w-full px-6 md:px-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <div className="md:col-span-12 lg:col-span-5 space-y-10">
            <div className="flex items-center gap-3 text-[#00D68F] cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <IconChart /><span className="text-4xl font-black text-white uppercase tracking-tighter leading-none translate-y-1">Prospera</span>
            </div>
            <p className="text-slate-400 text-xl leading-relaxed max-w-lg">Redefiniendo el futuro de la gestión financiera con elegancia, precisión e inteligencia artificial.</p>
          </div>

          <div className="md:col-span-6 lg:col-span-4 space-y-8">
            <h4 className="text-white font-black uppercase text-xs tracking-widest text-slate-500">Contacto Directo</h4>
            <div className="flex flex-col gap-4">
              <a href="mailto:soporte@prosperafinanzas.com" className="text-slate-300 hover:text-[#00D68F] text-lg font-black transition-all border-b-2 border-transparent hover:border-[#00D68F] pb-1 w-fit">soporte@prosperafinanzas.com</a>
              <a href="mailto:prosperaapp.soporte@gmail.com" className="text-slate-300 hover:text-[#00D68F] text-lg font-black transition-all border-b-2 border-transparent hover:border-[#00D68F] pb-1 w-fit">prosperaapp.soporte@gmail.com</a>
            </div>
          </div>

          <div className="md:col-span-6 lg:col-span-3 space-y-8">
            <h4 className="text-white font-black uppercase text-xs tracking-widest text-slate-500">Ecosistema Social</h4>
            <div className="flex gap-4">
              {[
                { i: <IconInstagram />, c: 'hover:bg-[#E1306C]', p: 'https://instagram.com/prosperafinanzas.ec' },
                { i: <IconYouTube />, c: 'hover:bg-red-600', p: 'https://www.youtube.com/channel/UCmgiCjzAr-DEEl-dCWT6CMA' },
                { i: <IconFacebook />, c: 'hover:bg-blue-600', p: 'https://www.facebook.com/profile.php?id=61587202734480' },
                { i: <IconTikTok />, c: 'hover:bg-white/20', p: 'https://www.tiktok.com/@prosperafinanzas?is_from_webapp=1&sender_device=pc' }
              ].map((s, i) => (
                <a key={i} href={s.p} target="_blank" className={`p-4 bg-white/5 rounded-2xl transition-all text-white border border-white/5 cursor-pointer ${s.c}`}>{s.i}</a>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full px-6 md:px-16 max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-600 text-[11px] font-black uppercase tracking-widest">© {new Date().getFullYear()} Prospera. Todos los derechos reservados.</p>
          <a href="https://app.prosperafinanzas.com/terms" target="_blank" className="text-slate-600 hover:text-white transition-all text-[11px] font-black uppercase tracking-widest hover:underline underline-offset-8 cursor-pointer">Términos y condiciones</a>
        </div>
      </footer>
    </div>
  );
}
