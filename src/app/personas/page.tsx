'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/services/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PersonasPage() {
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

  const [leadForm, setLeadForm] = useState({ 
    name: '', 
    email: '', 
    country: '', 
    phone: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [leadStatus, setLeadStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!leadForm.name || !leadForm.email || !leadForm.country || !leadForm.password) {
      setErrorMessage('Por favor llena todos los campos obligatorios.');
      return;
    }
    if (leadForm.password !== leadForm.confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      return;
    }
    if (leadForm.password.length < 6) {
      setErrorMessage('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLeadStatus('loading');
    try {
      // 1. Sign up the user in Supabase auth
      const { error: signUpError } = await supabase.auth.signUp({
        email: leadForm.email,
        password: leadForm.password,
        options: {
          data: {
            full_name: leadForm.name,
            pais: leadForm.country,
            celular: leadForm.phone,
          }
        }
      });
      if (signUpError) throw signUpError;

      // 2. Insert lead details in personas_leads table as a backup log
      try {
        await supabase.from('personas_leads').insert([
          { 
            nombre: leadForm.name, 
            email: leadForm.email, 
            banco: leadForm.country, 
            celular: leadForm.phone 
          }
        ]);
      } catch (insertErr) {
        console.error("personas_leads log insertion failed:", insertErr);
      }

      setLeadStatus('success');
      setLeadForm({ 
        name: '', 
        email: '', 
        country: '', 
        phone: '', 
        password: '', 
        confirmPassword: '' 
      });
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Hubo un error al registrar tu cuenta. Por favor intenta de nuevo.');
      setLeadStatus('error');
    }
  };

  const getAppUrl = (mode: 'login' | 'register') => {
    const baseUrl = typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:5173' : 'https://app.prosperafinanzas.com';
    return `${baseUrl}/login?mode=${mode}`;
  };

  if (!mounted) {
    return <div className="min-h-screen bg-[#0b0f19]"></div>;
  }

  return (
    <div className="personas-theme min-h-screen text-[#dfe2f1] font-body-md selection:bg-primary-container selection:text-white overflow-x-hidden">
      {/* Interactive Mouse Glow */}
      <div className="mouse-glow" id="mouse-glow"></div>
      
      {/* Ambient Glows */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] radial-glow-primary -z-10 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] radial-glow-secondary -z-10 pointer-events-none"></div>

      <Navbar activeTab="personas" />

      <main className="pt-32">
        {/* Hero Section */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-24 text-center md:text-left grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 reveal active">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-surface-container-high border border-glass text-primary font-label-md text-label-md">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
              Finanzas Personales
            </div>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-text-primary leading-[1.1]">
              Tu dinero en <span className="text-secondary">alta definición</span>.
            </h1>
            <p className="text-text-secondary font-body-lg text-body-lg max-w-xl">
              Sincroniza tus cuentas bancarias, automatiza tus presupuestos mensuales y detecta gastos innecesarios con la inteligencia artificial diseñada para Ecuador.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href={getAppUrl('register')} className="bg-primary-container text-on-primary-container px-8 py-4 rounded-full font-bold text-lg hover:shadow-[0_8px_24px_rgba(0,214,143,0.4)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-center">
                Probar Gratis <span className="material-symbols-outlined">arrow_forward</span>
              </a>
              <a href="#precios" className="border border-outline-variant text-text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-surface-variant hover:scale-105 transition-all duration-300 text-center flex items-center justify-center">
                Ver Planes
              </a>
            </div>
          </div>
          
          {/* Dashboard Mockup Card (Dual Desktop & Mobile) */}
          <div className="relative group reveal active w-full flex items-center justify-center pt-8 md:pt-0">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500"></div>
            
            {/* Desktop Laptop Mockup */}
            <div className="relative w-full rounded-2xl border border-glass shadow-2xl overflow-hidden bg-[#0A0E18] p-2">
              <div className="flex items-center gap-2 pb-3 border-b border-glass px-2">
                <div className="w-2.5 h-2.5 rounded-full bg-error/40"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-tertiary/40"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-secondary/40"></div>
                <div className="text-[10px] text-text-secondary ml-3 font-mono">app.prosperafinanzas.com/dashboard</div>
              </div>
              <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden border border-white/5">
                <Image 
                  src="/Dashboard.png" 
                  alt="Prospera App Desktop" 
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Overlapping Mobile Mockup */}
            <div className="absolute -bottom-10 -right-6 w-[180px] md:w-[240px] aspect-[9/19] rounded-[2.5rem] border-[8px] border-slate-900 shadow-2xl overflow-hidden translate-y-3 group-hover:translate-y-0 transition-transform duration-500 select-none bg-slate-950">
              <Image 
                src="/InicioCel.jpeg" 
                alt="Prospera App Mobile" 
                fill
                sizes="(max-width: 768px) 150px, 240px"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-24">
          <div className="text-center mb-16 reveal">
            <h2 className="font-display-lg text-headline-lg md:text-headline-lg text-text-primary mb-4">Herramientas que potencian tu dinero</h2>
            <p className="text-text-secondary font-body-lg text-body-lg max-w-2xl mx-auto">Sincroniza tus cuentas, analiza tu comportamiento financiero y ahorra más sin darte cuenta.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Feature 1 */}
            <div className="glass-card rounded-lg p-8 reveal">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 border border-primary/20">
                <span className="material-symbols-outlined">sync</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-text-primary mb-4">Sincronización Bancaria</h3>
              <p className="text-text-secondary font-body-md text-body-md">Conéctate de forma segura con tus cuentas de Pichincha, Produbanco, Guayaquil y DeUna para registrar movimientos automáticamente.</p>
            </div>
            {/* Feature 2 */}
            <div className="glass-card rounded-lg p-8 reveal border-secondary/30">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-6 border border-secondary/20">
                <span className="material-symbols-outlined">psychology</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-text-primary mb-4">Clasificación con IA</h3>
              <p className="text-text-secondary font-body-md text-body-md">Nuestra inteligencia artificial identifica y clasifica cada uno de tus consumos para darte reportes precisos e insights de valor.</p>
            </div>
            {/* Feature 3 */}
            <div className="glass-card rounded-lg p-8 reveal">
              <div className="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary mb-6 border border-tertiary/20">
                <span className="material-symbols-outlined">track_changes</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-text-primary mb-4">Presupuestos Inteligentes</h3>
              <p className="text-text-secondary font-body-md text-body-md">Establece límites de gastos mensuales por categorías y recibe alertas dinámicas que evitan que sobrepases tu meta.</p>
            </div>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section id="precios" className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-24">
          <div className="text-center mb-16 reveal">
            <h2 className="font-display-lg text-headline-lg text-text-primary mb-4">Planes para tu salud financiera</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Tier 1 */}
            <div className="glass-card rounded-lg p-10 flex flex-col items-center text-center reveal">
              <div className="text-label-sm font-label-sm text-text-secondary uppercase mb-4">Básico</div>
              <div className="font-display-lg text-display-lg text-text-primary mb-2">$0<span className="text-headline-md">/mes</span></div>
              <p className="text-text-secondary mb-8">Comienza a ordenar tu dinero de forma manual y sencilla.</p>
              <ul className="w-full text-left space-y-4 mb-10 text-body-sm">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">done</span> Registro Manual de Transacciones</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">done</span> 1 Cuenta Bancaria</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">done</span> Presupuestos Básicos</li>
              </ul>
              <a href={getAppUrl('register')} className="w-full py-4 rounded-full border border-outline text-text-primary font-bold hover:bg-surface-variant hover:scale-105 transition-all duration-300 text-center">
                Seleccionar Plan
              </a>
            </div>
            {/* Tier 2 - Recommended */}
            <div className="glass-card rounded-lg p-10 flex flex-col items-center text-center border-primary relative reveal" style={{ transitionDelay: '0.1s' }}>
              <div className="absolute -top-4 bg-primary text-on-primary px-4 py-1 rounded-full text-label-sm font-bold shadow-[0_4px_12px_rgba(0,214,143,0.4)]">MÁS POPULAR</div>
              <div className="text-label-sm font-label-sm text-primary uppercase mb-4">Pro</div>
              <div className="font-display-lg text-display-lg text-text-primary mb-2">$1.29<span className="text-headline-md">/mes</span></div>
              <p className="text-text-secondary mb-8">El control automático que transformará tus finanzas.</p>
              <ul className="w-full text-left space-y-4 mb-10 text-body-sm">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">done</span> Cuentas Bancarias Ilimitadas</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">done</span> Sincronización Automática</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">done</span> Alertas de Presupuestos Inteligentes</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">done</span> Reporte de Patrimonio y Flujo</li>
              </ul>
              <a href={getAppUrl('register')} className="w-full py-4 rounded-full bg-primary-container text-on-primary-container font-bold hover:shadow-[0_0_20px_rgba(0,214,143,0.5)] hover:scale-105 transition-all duration-300 text-center">
                Empezar Ahora
              </a>
            </div>
            {/* Tier 3 */}
            <div className="glass-card rounded-lg p-10 flex flex-col items-center text-center reveal" style={{ transitionDelay: '0.2s' }}>
              <div className="text-label-sm font-label-sm text-text-secondary uppercase mb-4">Ultra</div>
              <div className="font-display-lg text-display-lg text-text-primary mb-2">$3.99<span className="text-headline-md">/mes</span></div>
              <p className="text-text-secondary mb-8">Tu asistente CFO personal impulsado por Inteligencia Artificial.</p>
              <ul className="w-full text-left space-y-4 mb-10 text-body-sm">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">done</span> Todo lo del plan Pro</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">done</span> Chat CFO Personal (AI Assistant)</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">done</span> Registro por Voz / Lenguaje Natural</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">done</span> Smart Insights y Consejos por IA</li>
              </ul>
              <a href={getAppUrl('register')} className="w-full py-4 rounded-full border border-outline text-text-primary font-bold hover:bg-surface-variant hover:scale-105 transition-all duration-300 text-center">
                Seleccionar Plan
              </a>
            </div>
          </div>
        </section>

        {/* Lead Form */}
        <section id="cotizacion" className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop py-24 reveal">
          <div className="glass-card rounded-xl p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -z-10 group-hover:bg-primary/20 transition-all duration-500"></div>
            <div className="text-center mb-10">
              <h2 className="font-headline-lg text-headline-lg text-text-primary mb-2">Únete a la beta de Prospera App</h2>
              <p className="text-text-secondary">Prueba gratis las herramientas Pro y Ultra por 30 días, sin compromisos.</p>
            </div>
            
            {leadStatus === 'success' ? (
              <div className="bg-[#00D68F]/10 border border-[#00D68F]/30 p-8 rounded-2xl text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h4 className="text-white font-bold text-xl mb-2">¡Cuenta creada con éxito!</h4>
                <p className="text-slate-400 text-base">Hemos enviado un correo electrónico de confirmación. Por favor, revisa tu bandeja de entrada y confirma tu cuenta para poder ingresar a la aplicación.</p>
                <button onClick={() => setLeadStatus('idle')} className="mt-6 text-primary font-bold text-sm hover:underline">Registrar otra cuenta</button>
              </div>
            ) : (
              <form onSubmit={handleSubmitLead} className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <label className="text-label-sm font-label-sm text-text-secondary ml-1">Selecciona tu país</label>
                  <select 
                    required
                    value={leadForm.country} 
                    onChange={e => setLeadForm({ ...leadForm, country: e.target.value })} 
                    className="w-full bg-surface-container-low border border-glass rounded-lg px-4 py-3 focus:border-primary outline-none text-text-primary transition-all duration-300"
                  >
                    <option value="" disabled>Selecciona tu país</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Colombia">Colombia</option>
                    <option value="México">México</option>
                    <option value="Perú">Perú</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Chile">Chile</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-label-sm font-label-sm text-text-secondary ml-1">Celular / WhatsApp (Opcional)</label>
                  <input 
                    type="tel" 
                    value={leadForm.phone} 
                    onChange={e => setLeadForm({ ...leadForm, phone: e.target.value })} 
                    className="w-full bg-surface-container-low border border-glass rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-text-primary transition-all duration-300" 
                    placeholder="Ej. +593 99..." 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-label-sm font-label-sm text-text-secondary ml-1">Correo Electrónico</label>
                  <input 
                    required 
                    type="email" 
                    value={leadForm.email} 
                    onChange={e => setLeadForm({ ...leadForm, email: e.target.value })} 
                    className="w-full bg-surface-container-low border border-glass rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-text-primary transition-all duration-300" 
                    placeholder="juan@gmail.com" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-label-sm font-label-sm text-text-secondary ml-1">Contraseña</label>
                  <input 
                    required 
                    type="password" 
                    value={leadForm.password} 
                    onChange={e => setLeadForm({ ...leadForm, password: e.target.value })} 
                    className="w-full bg-surface-container-low border border-glass rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-text-primary transition-all duration-300" 
                    placeholder="••••••••" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-label-sm font-label-sm text-text-secondary ml-1">Confirmar contraseña</label>
                  <input 
                    required 
                    type="password" 
                    value={leadForm.confirmPassword} 
                    onChange={e => setLeadForm({ ...leadForm, confirmPassword: e.target.value })} 
                    className="w-full bg-surface-container-low border border-glass rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-text-primary transition-all duration-300" 
                    placeholder="••••••••" 
                  />
                </div>
                {errorMessage && <p className="text-red-400 text-sm md:col-span-2">{errorMessage}</p>}
                <div className="md:col-span-2 pt-4">
                  <button 
                    type="submit" 
                    disabled={leadStatus === 'loading'} 
                    className="w-full bg-primary text-on-primary font-bold py-4 rounded-full hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(0,214,143,0.4)] transition-all duration-300 disabled:opacity-50"
                  >
                    {leadStatus === 'loading' ? 'Registrando...' : 'Registrarme Gratis'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* Prospera Pymes Section */}
        <section id="pymes" className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 mb-24 reveal">
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
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-secondary-container/10 border border-secondary-container/20 text-[#d2bbff] font-label-md text-label-md w-fit">
                <span className="material-symbols-outlined text-[18px]">store</span>
                Prospera Pymes
              </div>
              <h2 className="font-display-lg text-headline-lg text-text-primary leading-[1.2]">
                Controla la contabilidad de tu PYME en alta definición
              </h2>
              <p className="text-text-secondary font-body-md text-body-md">
                Sincroniza tus facturas electrónicas directamente desde el SRI, liquida cuentas por cobrar en un clic y genera tu reporte ATS de manera automatizada. Diseñado para simplificar la gestión contable de tu negocio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link href="/" className="bg-secondary-container text-on-secondary-container px-6 py-3 rounded-full font-bold hover:scale-105 hover:shadow-[0_0_20px_rgba(124,59,237,0.4)] transition-all duration-300 text-center w-fit">
                  Llevar Contabilidad PYME
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
