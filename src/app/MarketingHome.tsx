'use client';

// Prospera Marketing - Home Page (Next.js Version)
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/services/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function MarketingHome() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Mouse Tracking Effect
    const mouseGlow = document.getElementById('mouse-glow');
    const handleMouseMove = (e: MouseEvent) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const x = e.clientX;
      const y = e.clientY;
      requestAnimationFrame(() => {
        if (mouseGlow) {
          mouseGlow.style.left = `${x}px`;
          mouseGlow.style.top = `${y}px`;
        }
      });
    };
    document.addEventListener('mousemove', handleMouseMove);

    // Scroll-Triggered Entrance Animations (Intersection Observer)
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
      revealObserver.observe(el);
    });

    // Add staggered delay to grid items
    document.querySelectorAll('.grid > .reveal').forEach((el: any, index) => {
      const row = Math.floor(index / 3);
      const col = index % 3;
      el.style.transitionDelay = `${(col * 0.1) + (row * 0.05)}s`;
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      revealObserver.disconnect();
    };
  }, [mounted]);

  // Estado para el formulario de Pymes
  const [leadForm, setLeadForm] = useState({ name: '', role: 'PYME', email: '', phone: '' });
  const [leadStatus, setLeadStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmitProforma = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.email) return;
    setLeadStatus('loading');
    
    // Map dropdown value to Supabase expected enum value
    let dbRole = 'Otro';
    if (leadForm.role === 'Estudio Contable') dbRole = 'Contador';
    else if (leadForm.role === 'PYME') dbRole = 'Emprendedor';

    try {
      const { error } = await supabase.from('pymes_leads').insert([
        { 
          nombre: leadForm.name, 
          rol: dbRole, 
          email: leadForm.email, 
          celular: leadForm.phone 
        }
      ]);
      if (error) throw error;
      setLeadStatus('success');
      setLeadForm({ name: '', role: 'PYME', email: '', phone: '' });
    } catch (err) {
      console.error(err);
      setLeadStatus('error');
    }
  };

  const getPymesUrl = (mode: 'login' | 'register') => {
    const baseUrl = typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:5174' : 'https://pymes.prosperafinanzas.com';
    return `${baseUrl}/login?mode=${mode}`;
  };

  if (!mounted) {
    return <div className="min-h-screen bg-[#0b0f19]"></div>;
  }

  return (
    <div className="min-h-screen text-[#dfe2f1] font-body-md selection:bg-primary-container selection:text-white overflow-x-hidden">
      {/* Interactive Mouse Glow */}
      <div className="mouse-glow" id="mouse-glow"></div>
      
      {/* Ambient Glows */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] radial-glow-primary -z-10 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] radial-glow-secondary -z-10 pointer-events-none"></div>

      <Navbar activeTab="pymes" />

      <main className="pt-32">
        {/* Hero Section */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-24 text-center md:text-left grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 reveal active">
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-text-primary leading-[1.1]">
              El copiloto contable de tu <span className="text-secondary">PYME</span> y despacho en Ecuador.
            </h1>
            <p className="text-text-secondary font-body-lg text-body-lg max-w-xl">
              Automatiza el SRI, genera reportes ATS en segundos y mantén tu Libro Diario impecable con inteligencia artificial diseñada para el mercado local.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#cotizacion" className="bg-primary-container text-on-primary-container px-8 py-4 rounded-full font-bold text-lg hover:shadow-[0_8px_24px_rgba(124,59,237,0.4)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                Agendar Demo Gratis <span className="material-symbols-outlined">arrow_forward</span>
              </a>
              <a href="#precios" className="border border-outline-variant text-text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-surface-variant hover:scale-105 transition-all duration-300 text-center flex items-center justify-center">
                Ver Ventajas
              </a>
            </div>
          </div>
          
          {/* Dashboard Mockup Card */}
          <div className="relative group reveal active w-full flex items-center justify-center">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="glass-card rounded-xl overflow-hidden border-glass relative p-2 bg-surface-container-high w-full">
              <div className="flex items-center gap-2 pb-3 border-b border-glass px-2">
                <div className="w-3 h-3 rounded-full bg-error/40"></div>
                <div className="w-3 h-3 rounded-full bg-tertiary/40"></div>
                <div className="w-3 h-3 rounded-full bg-secondary/40"></div>
                <div className="text-xs text-text-secondary ml-4 font-mono">pymes.prosperafinanzas.com/dashboard</div>
              </div>
              <div className="relative w-full aspect-[16/10] mt-2 rounded-lg overflow-hidden border border-white/5">
                <Image 
                  src="/Pymes1.png" 
                  alt="Prospera Pymes Dashboard" 
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-24">
          <div className="text-center mb-16 reveal">
            <h2 className="font-display-lg text-headline-lg md:text-headline-lg text-text-primary mb-4">Herramientas que aceleran tu contabilidad</h2>
            <p className="text-text-secondary font-body-lg text-body-lg max-w-2xl mx-auto">Diseñamos soluciones específicas para el marco regulatorio ecuatoriano, eliminando horas de digitación manual.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Feature 1 */}
            <div className="glass-card rounded-lg p-8 reveal">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 border border-primary/20">
                <span className="material-symbols-outlined">cloud_upload</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-text-primary mb-4">Carga Masiva XML</h3>
              <p className="text-text-secondary font-body-md text-body-md">Importa cientos de facturas electrónicas directamente desde el SRI en un solo clic. Prospera las clasifica automáticamente.</p>
            </div>
            {/* Feature 2 */}
            <div className="glass-card rounded-lg p-8 reveal border-secondary/30">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-6 border border-secondary/20">
                <span className="material-symbols-outlined">description</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-text-primary mb-4">Generación de ATS</h3>
              <p className="text-text-secondary font-body-md text-body-md">Exporta el Anexo Transaccional Simplificado (XML) listo para el DIMM. Sin errores, sin descuadres, en segundos.</p>
            </div>
            {/* Feature 3 */}
            <div className="glass-card rounded-lg p-8 reveal">
              <div className="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary mb-6 border border-tertiary/20">
                <span className="material-symbols-outlined">menu_book</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-text-primary mb-4">Libro Diario</h3>
              <p className="text-text-secondary font-body-md text-body-md">Asientos automáticos vinculados a cada transacción. Mantén la trazabilidad total de tu patrimonio y flujo de caja.</p>
            </div>
          </div>
        </section>

        {/* Pricing & Advantages Section */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-24" id="precios">
          <div className="text-center mb-16 reveal">
            <h2 className="font-display-lg text-headline-lg text-text-primary mb-4">Potencia tu contabilidad con Prospera Pymes</h2>
            <p className="text-text-secondary font-body-lg text-body-lg max-w-2xl mx-auto">Herramientas contables potentes diseñadas específicamente para el mercado ecuatoriano.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
            {/* Left Panel: Advantages */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="glass-card rounded-lg p-8 md:p-10 flex-1 flex flex-col justify-between reveal">
                <div>
                  <h3 className="font-headline-lg text-headline-lg text-text-primary mb-2 flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary text-3xl">verified</span>
                    Ventajas de Prospera Pymes
                  </h3>
                  <p className="text-text-secondary text-body-md mb-8">
                    Diseñamos una plataforma robusta para automatizar y simplificar la contabilidad de tu negocio en Ecuador.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                    {/* Ventaja 1 */}
                    <div className="flex gap-3 items-start">
                      <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20 shrink-0">
                        <span className="material-symbols-outlined text-sm">domain</span>
                      </div>
                      <div>
                        <h4 className="text-text-primary font-bold text-body-md mb-1">Multiempresa / Varios RUCs</h4>
                        <p className="text-text-secondary text-body-sm">Lleva la contabilidad de múltiples empresas o clientes desde una sola cuenta de manera ordenada.</p>
                      </div>
                    </div>
                    {/* Ventaja 2 */}
                    <div className="flex gap-3 items-start">
                      <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20 shrink-0">
                        <span className="material-symbols-outlined text-sm">upload_file</span>
                      </div>
                      <div>
                        <h4 className="text-text-primary font-bold text-body-md mb-1">Carga Masiva de XML</h4>
                        <p className="text-text-secondary text-body-sm">Sube cientos de facturas y notas de venta electrónicas en un solo lote y olvídate de la digitación manual.</p>
                      </div>
                    </div>
                    {/* Ventaja 3 */}
                    <div className="flex gap-3 items-start">
                      <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20 shrink-0">
                        <span className="material-symbols-outlined text-sm">menu_book</span>
                      </div>
                      <div>
                        <h4 className="text-text-primary font-bold text-body-md mb-1">Plan de Cuentas Precargado</h4>
                        <p className="text-text-secondary text-body-sm">Estructura contable estándar lista y homologada para Ecuador, adaptable a las necesidades de tu empresa.</p>
                      </div>
                    </div>
                    {/* Ventaja 4 */}
                    <div className="flex gap-3 items-start">
                      <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20 shrink-0">
                        <span className="material-symbols-outlined text-sm">description</span>
                      </div>
                      <div>
                        <h4 className="text-text-primary font-bold text-body-md mb-1">Generación y Control de ATS</h4>
                        <p className="text-text-secondary text-body-sm">Genera de forma limpia y automática tu Anexo Transaccional Simplificado listo para el DIMM del SRI.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Panel: Call to Action / Pricing */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="glass-card rounded-lg p-8 md:p-10 border-primary/30 flex flex-col justify-between items-center text-center relative overflow-hidden reveal flex-1" style={{ transitionDelay: '0.1s' }}>
                {/* Ambient Glow in Card */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 blur-3xl -z-10"></div>
                
                <div className="w-full space-y-6 my-auto">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto border border-primary/20">
                    <span className="material-symbols-outlined text-3xl">mail</span>
                  </div>
                  <div className="text-label-md font-label-md text-primary uppercase tracking-widest font-bold">Planes a tu Medida</div>
                  <h3 className="font-display-lg text-headline-lg text-text-primary">¿Quieres conocer los precios?</h3>
                  <p className="text-text-secondary text-body-md leading-relaxed">
                    Actualmente estamos personalizando las tarifas según el tamaño y necesidades de cada negocio. Contáctanos hoy para recibir una propuesta a tu medida o agendar una demostración en vivo.
                  </p>
                </div>
                
                <div className="w-full pt-8 shrink-0">
                  <a href="#cotizacion" className="block w-full py-4 rounded-full bg-primary-container text-on-primary-container font-bold hover:shadow-[0_0_20px_rgba(124,59,237,0.5)] hover:scale-105 transition-all duration-300 text-center">
                    Contactar con Nosotros
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Form */}
        <section id="cotizacion" className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop py-24 reveal">
          <div className="glass-card rounded-xl p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 blur-3xl -z-10 group-hover:bg-secondary/20 transition-all duration-500"></div>
            <div className="text-center mb-10">
              <h2 className="font-headline-lg text-headline-lg text-text-primary mb-2">Obtén una cotización personalizada</h2>
              <p className="text-text-secondary">Nuestro equipo de expertos te contactará en menos de 24 horas.</p>
            </div>
            
            {leadStatus === 'success' ? (
              <div className="bg-[#00D68F]/10 border border-[#00D68F]/30 p-8 rounded-2xl text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h4 className="text-white font-bold text-xl mb-2">¡Solicitud enviada con éxito!</h4>
                <p className="text-slate-400 text-base">Nuestro equipo se pondrá en contacto contigo muy pronto para enviarte la proforma.</p>
                <button onClick={() => setLeadStatus('idle')} className="mt-6 text-[#00D68F] font-bold text-sm hover:underline">Enviar otra solicitud</button>
              </div>
            ) : (
              <form onSubmit={handleSubmitProforma} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-label-sm font-label-sm text-text-secondary ml-1">Nombre Completo</label>
                  <input 
                    required 
                    type="text" 
                    value={leadForm.name} 
                    onChange={e => setLeadForm({ ...leadForm, name: e.target.value })} 
                    className="w-full bg-surface-container-low border border-glass rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-text-primary transition-all duration-300" 
                    placeholder="Ej. Juan Pérez" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-label-sm font-label-sm text-text-secondary ml-1">Correo Corporativo</label>
                  <input 
                    required 
                    type="email" 
                    value={leadForm.email} 
                    onChange={e => setLeadForm({ ...leadForm, email: e.target.value })} 
                    className="w-full bg-surface-container-low border border-glass rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-text-primary transition-all duration-300" 
                    placeholder="juan@empresa.ec" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-label-sm font-label-sm text-text-secondary ml-1">Tipo de Negocio</label>
                  <select 
                    value={leadForm.role} 
                    onChange={e => setLeadForm({ ...leadForm, role: e.target.value })} 
                    className="w-full bg-surface-container-low border border-glass rounded-lg px-4 py-3 focus:border-primary outline-none text-text-primary transition-all duration-300"
                  >
                    <option value="PYME">PYME</option>
                    <option value="Estudio Contable">Estudio Contable</option>
                    <option value="Empresa Grande">Empresa Grande</option>
                    <option value="Independiente">Independiente</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-label-sm font-label-sm text-text-secondary ml-1">Teléfono / WhatsApp</label>
                  <input 
                    type="tel" 
                    value={leadForm.phone} 
                    onChange={e => setLeadForm({ ...leadForm, phone: e.target.value })} 
                    className="w-full bg-surface-container-low border border-glass rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-text-primary transition-all duration-300" 
                    placeholder="+593 9..." 
                  />
                </div>
                {leadStatus === 'error' && <p className="text-red-400 text-sm md:col-span-2">Hubo un error al enviar tu solicitud. Por favor intenta de nuevo.</p>}
                <div className="md:col-span-2 pt-4">
                  <button 
                    type="submit" 
                    disabled={leadStatus === 'loading'} 
                    className="w-full bg-secondary text-on-secondary font-bold py-4 rounded-full hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(0,214,143,0.4)] transition-all duration-300 disabled:opacity-50"
                  >
                    {leadStatus === 'loading' ? 'Enviando...' : 'Solicitar Información'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* Prospera App Section */}
        <section id="app" className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 mb-24 reveal">
          <div className="glass-card rounded-xl overflow-hidden grid md:grid-cols-2 gap-0 border-glass relative group">
            {/* Image Column */}
            <div className="relative h-[300px] md:h-full min-h-[350px] overflow-hidden">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2TJn2M7WssE157n9Wn0VNlVPA2bBNMzyf80vNZ15RLRQuB1I16BYtAoXb8KUgiZtCc7QYUnA9RxI9JIIIHvFSCihIDLeAwVqYSfn6IqPJt1AXPtVnbo6TBnGksQXdjhzRQVtmXSmWaY_sp8DmYy7B1gAxueOZ9ySN-SLlvAmFelq06HGHpgka86OwPP6-NQOKJL4OJwVJW7fMHUAfcCAoy_JKiqcT5NMZ1nHl2Zdsu4iohYYMLtF8foVAN698n-AhaGhuOM1P5GA" 
                alt="Modern office in Quito" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-[2000ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0f131d]"></div>
            </div>
            {/* Content Column */}
            <div className="p-8 md:p-12 flex flex-col justify-center space-y-6 bg-surface-container">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-secondary-container/10 border border-secondary-container/20 text-[#00d68f] font-label-md text-label-md w-fit">
                <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                Prospera App
              </div>
              <h2 className="font-display-lg text-headline-lg text-text-primary leading-[1.2]">
                Controla tus finanzas personales en alta definición
              </h2>
              <p className="text-text-secondary font-body-md text-body-md">
                Además del control empresarial, sincroniza tus cuentas personales con Banco Pichincha, Produbanco, Banco Guayaquil o DeUna. Organiza tus presupuestos mensuales y detecta gastos innecesarios de forma inteligente.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link href="/personas" className="bg-secondary-container text-on-secondary-container px-6 py-3 rounded-full font-bold hover:scale-105 hover:shadow-[0_0_20px_rgba(0,214,143,0.4)] transition-all duration-300 text-center w-fit">
                  Probar Gratis (Finanzas Personales)
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
