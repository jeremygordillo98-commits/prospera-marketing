'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SoportePage() {
  const [mounted, setMounted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => {
      setCopiedEmail(null);
    }, 2000);
  };

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

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mounted]);

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

      <Navbar activeTab="nosotros" hideButtons={true} />

      <main className="pt-32 pb-24 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop min-h-[60vh] flex flex-col justify-center">
        {/* Header Section */}
        <section className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-secondary-container/10 border border-secondary-container/20 text-[#00d68f] font-label-md text-label-md w-fit mb-2">
            <span className="material-symbols-outlined text-[18px]">support_agent</span>
            Soporte Humano y Cercano
          </div>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-text-primary leading-[1.1] max-w-3xl mx-auto">
            ¿Cómo podemos <span className="text-[#00d68f]">ayudarte</span> hoy?
          </h1>
          <p className="text-text-secondary font-body-lg text-body-lg max-w-xl mx-auto leading-relaxed">
            Creemos en la conexión real. Nuestro equipo está listo para resolver tus dudas de persona a persona y de forma rápida.
          </p>
        </section>

        {/* Contact Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-gutter max-w-4xl mx-auto w-full">
          {/* Support Ticket Card */}
          <div className="glass-card rounded-xl p-10 border border-glass flex flex-col justify-between group hover:border-[#00d68f]/30 transition-all duration-300">
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-full bg-[#00d68f]/10 flex items-center justify-center text-[#00d68f] border border-[#00d68f]/20">
                <span className="material-symbols-outlined text-3xl">contact_support</span>
              </div>
              <h3 className="font-headline-lg text-headline-lg text-text-primary">Soporte Técnico y General</h3>
              <p className="text-text-secondary text-body-sm leading-relaxed">
                ¿Tienes dudas sobre cómo usar Prospera, problemas para iniciar sesión o reportes de errores en la aplicación? Escríbenos directamente y te daremos respuesta en menos de 24 horas laborables.
              </p>
              <div className="bg-surface-container-low/50 border border-glass rounded-xl p-4 font-mono text-center text-sm text-text-primary">
                soporte@prosperafinanzas.com
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row gap-4 w-full">
              <a 
                href="mailto:soporte@prosperafinanzas.com?subject=Soporte%20Prospera"
                className="flex-1 bg-[#00d68f] text-[#003822] py-3.5 rounded-full font-bold text-center hover:shadow-[0_4px_15px_rgba(0,214,143,0.3)] hover:scale-[1.02] transition-all duration-300 text-sm flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">mail</span> Enviar Correo
              </a>
              <button 
                onClick={() => handleCopy('soporte@prosperafinanzas.com')}
                className="flex-1 border border-outline-variant hover:bg-surface-variant text-text-primary py-3.5 rounded-full font-bold text-center hover:scale-[1.02] transition-all duration-300 text-sm flex items-center justify-center gap-2"
              >
                {copiedEmail === 'soporte@prosperafinanzas.com' ? (
                  <>
                    <span className="material-symbols-outlined text-base text-[#00d68f]">check_circle</span> ¡Copiado!
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-base">content_copy</span> Copiar Dirección
                  </>
                )}
              </button>
            </div>
          </div>

          {/* App Ticket Card */}
          <div className="glass-card rounded-xl p-10 border border-glass flex flex-col justify-between group hover:border-[#00d68f]/30 transition-all duration-300">
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-full bg-[#00d68f]/10 flex items-center justify-center text-[#00d68f] border border-[#00d68f]/20">
                <span className="material-symbols-outlined text-3xl">smartphone</span>
              </div>
              <h3 className="font-headline-lg text-headline-lg text-text-primary">Soporte Prospera App</h3>
              <p className="text-text-secondary text-body-sm leading-relaxed">
                ¿Tienes dudas sobre la aplicación de finanzas personales, presupuestos, conciliación con tus cuentas bancarias o necesitas soporte para Prospera App? Escríbenos directamente.
              </p>
              <div className="bg-surface-container-low/50 border border-glass rounded-xl p-4 font-mono text-center text-sm text-text-primary">
                prosperaapp.soporte@gmail.com
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row gap-4 w-full">
              <a 
                href="mailto:prosperaapp.soporte@gmail.com?subject=Soporte%20Prospera%20App"
                className="flex-1 bg-[#00d68f] text-[#003822] py-3.5 rounded-full font-bold text-center hover:shadow-[0_4px_15px_rgba(0,214,143,0.3)] hover:scale-[1.02] transition-all duration-300 text-sm flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">mail</span> Enviar Correo
              </a>
              <button 
                onClick={() => handleCopy('prosperaapp.soporte@gmail.com')}
                className="flex-1 border border-outline-variant hover:bg-surface-variant text-text-primary py-3.5 rounded-full font-bold text-center hover:scale-[1.02] transition-all duration-300 text-sm flex items-center justify-center gap-2"
              >
                {copiedEmail === 'prosperaapp.soporte@gmail.com' ? (
                  <>
                    <span className="material-symbols-outlined text-base text-[#00d68f]">check_circle</span> ¡Copiado!
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-base">content_copy</span> Copiar Dirección
                  </>
                )}
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
