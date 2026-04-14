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
          {news.map((item) => (
            <div key={item.id} className="glass-card rounded-3xl border border-white/5 overflow-hidden group hover:border-[#00D68F]/30 transition-all flex flex-col cursor-pointer" onClick={() => setSelectedNews(item)}>
              {item.image_url && <div className="w-full aspect-video relative overflow-hidden"><Image src={item.image_url} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" /></div>}
              <div className="p-6">
                <h3 className="text-xl font-black text-white mb-2 leading-tight line-clamp-2">{item.title}</h3>
                <p className="text-slate-500 text-xs line-clamp-2">{item.summary}</p>
              </div>
            </div>
          ))}
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

  const getAppUrl = (mode: 'login' | 'register') => {
    const baseUrl = typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:5173' : 'https://app.prosperafinanzas.com';
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
        <div className="w-full px-4 md:px-8 flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-[#00D68F] flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <IconChart />
            <span className="text-xl font-black tracking-tighter uppercase text-white">Prospera</span>
          </div>

          <div className="flex items-center gap-4 md:gap-14 h-full">
            {[
              { label: 'App', items: [{ l: 'Login', p: getAppUrl('login') }, { l: 'Registro', p: getAppUrl('register') }] },
              { label: 'Pymes', items: [{ l: 'Próximamente', p: '#' }] },
              { label: 'Lab', items: tools.map(t => ({ l: t.title, p: t.path, i: t.icon })) }
            ].map(menu => (
              <div key={menu.label} className="relative group flex items-center h-full">
                <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white cursor-pointer transition-colors whitespace-nowrap py-10 md:py-8">
                   {menu.label} <IconChevronDown />
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 min-w-[200px] bg-[#0b1120] border border-white/10 rounded-b-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all overflow-hidden z-[1010]">
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
           Tu mundo financiero en <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D68F] to-[#059669]">alta definición.</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-2xl font-light mb-12 max-w-3xl mx-auto leading-relaxed">Fusionamos inteligencia artificial y control absoluto para potenciar la vida financiera de personas y empresas.</p>
      </header>

      {/* SECCIÓN: FINANZAS PERSONALES */}
      <section className="py-24 bg-[#0F172A] border-t border-white/5 overflow-hidden">
        <div className="w-full px-6 flex flex-col lg:flex-row items-center gap-24 max-w-7xl mx-auto">
          <div className="lg:w-1/2">
            <h4 className="text-[#00D68F] text-2xl md:text-4xl font-black uppercase tracking-[0.3em] mb-6 leading-none">Prospera App</h4>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-10 leading-[1.1]">Control total de tus <br/> <span className="text-[#00D68F]">finanzas personales.</span></h2>
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
            <h2 className="text-4xl md:text-6xl font-black text-white mb-10 leading-[1.1]">Potencia el motor de <br/> <span className="text-[#7c3bed]">tu negocio.</span></h2>
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
           <h2 className="text-6xl md:text-9xl font-black text-white mb-8 uppercase tracking-tighter leading-none shadow-black drop-shadow-2xl">Ecosistema <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D68F] to-[#7c3bed]">Ilimitado.</span></h2>
           <p className="text-slate-200 text-xl md:text-2xl font-bold bg-[#0F172A]/40 backdrop-blur-md px-8 py-4 rounded-full border border-white/10 w-fit mx-auto shadow-2xl">Prospera acompaña cada paso de tu vida financiera.</p>
        </div>
      </section>

      <NewsSection />

      {/* MEGA FOOTER */}
      <footer className="bg-[#0F172A] border-t border-white/5 pt-32 pb-16 w-full">
        <div className="w-full px-6 md:px-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <div className="md:col-span-12 lg:col-span-5 space-y-10">
            <div className="flex items-center gap-3 text-[#00D68F] cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
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
