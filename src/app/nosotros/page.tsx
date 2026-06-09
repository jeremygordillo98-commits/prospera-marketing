'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NosotrosPage() {
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

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      revealObserver.disconnect();
    };
  }, [mounted]);

  const getAppUrl = (mode: 'login' | 'register') => {
    const baseUrl = typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:5173' : 'https://app.prosperafinanzas.com';
    return `${baseUrl}/login?mode=${mode}`;
  };

  if (!mounted) {
    return <div className="min-h-screen bg-[#0b0f19]"></div>;
  }

  return (
    <div className="nosotros-theme min-h-screen text-[#dfe2f1] font-body-md selection:bg-primary-container selection:text-white overflow-x-hidden">
      {/* Interactive Mouse Glow */}
      <div className="mouse-glow" id="mouse-glow"></div>
      
      {/* Ambient Glows */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] radial-glow-primary -z-10 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] radial-glow-secondary -z-10 pointer-events-none"></div>

      <Navbar activeTab="nosotros" />

      <main className="pt-32">
        {/* Hero Section / Title */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 text-center reveal active">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-secondary-container/10 border border-secondary-container/20 text-secondary font-label-md text-label-md w-fit mb-6">
            <span className="material-symbols-outlined text-[18px]">group</span>
            Nuestra Misión
          </div>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-text-primary leading-[1.1] max-w-4xl mx-auto mb-6">
            Lideramos la revolución de la <span className="text-primary">inteligencia financiera</span>.
          </h1>
          <p className="text-text-secondary font-body-lg text-body-lg max-w-2xl mx-auto leading-relaxed">
            Nacimos con el propósito de eliminar el estrés contable y financiero. Desarrollamos herramientas que se adaptan a ti: control global para tus finanzas personales y automatización contable precisa y localizada para tu negocio.
          </p>
        </section>

        {/* Main Content Panel: Story & Pillars */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left Panel: Global/Local Vision & Stats --> */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="glass-card rounded-xl p-8 md:p-10 flex-1 flex flex-col justify-between reveal active">
                <div className="space-y-6">
                  <h3 className="font-headline-lg text-headline-lg text-text-primary">Global & Local</h3>
                  <p className="text-text-secondary font-body-md text-body-md leading-relaxed">
                    Creemos en la libertad financiera sin fronteras. Por eso, <strong>Prospera App</strong> está diseñada para cualquier persona en el mundo que desee controlar sus presupuestos y optimizar sus ahorros de forma inteligente.
                  </p>
                  <p className="text-text-secondary font-body-md text-body-md leading-relaxed">
                    Al mismo tiempo, entendemos las complejidades tributarias locales. <strong>Prospera Pymes</strong> ofrece una solución altamente localizada para Ecuador, permitiendo a los negocios automatizar la conciliación con el SRI y la generación del ATS sin esfuerzo.
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 pt-8 border-t border-glass mt-8">
                  <div className="text-center lg:text-left">
                    <div className="font-display-lg text-secondary text-headline-lg font-black">10x</div>
                    <div className="text-text-secondary text-[11px] uppercase tracking-wider font-semibold">Más rápido</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="font-display-lg text-primary text-headline-lg font-black">99.9%</div>
                    <div className="text-text-secondary text-[11px] uppercase tracking-wider font-semibold">Precisión ATS</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="font-display-lg text-secondary text-headline-lg font-black">+500</div>
                    <div className="text-text-secondary text-[11px] uppercase tracking-wider font-semibold font-bold">Negocios</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel: Pillars */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="glass-card rounded-xl p-8 md:p-10 flex-1 flex flex-col justify-center space-y-6 reveal active" style={{ transitionDelay: '0.1s' }}>
                <h3 className="font-headline-lg text-headline-lg text-text-primary mb-2">Nuestros Pilares</h3>
                
                {/* Pillar 1 */}
                <div className="p-6 rounded-lg bg-surface-container-low border border-glass flex gap-4 items-start hover:scale-[1.02] hover:border-primary/20 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
                    <span className="material-symbols-outlined text-2xl">psychology</span>
                  </div>
                  <div>
                    <h4 className="text-text-primary font-bold text-body-lg mb-1">Inteligencia Artificial Global</h4>
                    <p className="text-text-secondary text-body-sm leading-relaxed">
                      Procesamiento de transacciones y categorización inteligente disponible a nivel global, para organizar tus cuentas personales estés donde estés.
                    </p>
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className="p-6 rounded-lg bg-surface-container-low border border-glass flex gap-4 items-start hover:scale-[1.02] hover:border-secondary/20 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20 shrink-0">
                    <span className="material-symbols-outlined text-2xl">description</span>
                  </div>
                  <div>
                    <h4 className="text-text-primary font-bold text-body-lg mb-1">Localización Absoluta</h4>
                    <p className="text-text-secondary text-body-sm leading-relaxed">
                      Conectores y lógicas tributarias diseñadas específicamente según los requerimientos del SRI ecuatoriano, asegurando que tu negocio cumpla con la ley sin errores.
                    </p>
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className="p-6 rounded-lg bg-surface-container-low border border-glass flex gap-4 items-start hover:scale-[1.02] hover:border-primary/20 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
                    <span className="material-symbols-outlined text-2xl">shield</span>
                  </div>
                  <div>
                    <h4 className="text-text-primary font-bold text-body-lg mb-1">Seguridad Avanzada</h4>
                    <p className="text-text-secondary text-body-sm leading-relaxed">
                      Cifrado de datos de extremo a extremo y protocolos internacionales para mantener tu información financiera corporativa y personal 100% privada.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
