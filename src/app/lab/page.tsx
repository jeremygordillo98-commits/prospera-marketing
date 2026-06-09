'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const tools = [
  {
    id: 'ant',
    title: 'Detector de Gastos Hormiga',
    description: 'Descubre cuánto dinero se te escapa día a día en pequeños antojos o consumos innecesarios.',
    icon: 'bug_report',
    href: '/lab/ant',
    themeColor: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'border-primary/20',
    hoverBorder: 'hover:border-primary/50'
  },
  {
    id: 'health',
    title: 'Test de Salud Financiera',
    description: 'Evalúa tus hábitos de ahorro, gestión de deudas y presupuestos para obtener tu score financiero real.',
    icon: 'monitor_heart',
    href: '/lab/health',
    themeColor: 'text-secondary',
    bgColor: 'bg-secondary/10',
    borderColor: 'border-secondary/20',
    hoverBorder: 'hover:border-secondary/50'
  },
  {
    id: 'loan',
    title: 'Simulador de Préstamos',
    description: 'Compara y desnuda las cuotas pequeñas. Analiza el interés real y el porcentaje extra que pagarás.',
    icon: 'calculate',
    href: '/lab/loan',
    themeColor: 'text-tertiary',
    bgColor: 'bg-tertiary/10',
    borderColor: 'border-tertiary/20',
    hoverBorder: 'hover:border-tertiary/50'
  },
  {
    id: 'subs',
    title: 'Auditor de Suscripciones',
    description: 'Rastrea tus suscripciones digitales activas y calcula el impacto acumulado mensual y anual de tus débitos.',
    icon: 'notifications_active',
    href: '/lab/subs',
    themeColor: 'text-[#f43f5e]',
    bgColor: 'bg-[#f43f5e]/10',
    borderColor: 'border-[#f43f5e]/20',
    hoverBorder: 'hover:border-[#f43f5e]/50'
  }
];

export default function LabHubPage() {
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

    // Intersection Observer for animations
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => {
      revealObserver.observe(el);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      revealObserver.disconnect();
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

      <Navbar activeTab="laboratorio" />

      <main className="pt-32 pb-24">
        {/* Header */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 text-center reveal active">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-label-md text-label-md w-fit mb-6">
            <span className="material-symbols-outlined text-[18px]">science</span>
            Laboratorio Financiero
          </div>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-text-primary leading-[1.1] max-w-4xl mx-auto mb-6">
            Herramientas interactivas para <span className="text-primary">optimizar tu dinero</span>.
          </h1>
          <p className="text-text-secondary font-body-lg text-body-lg max-w-2xl mx-auto leading-relaxed">
            Sin rodeos ni registros obligatorios. Prueba nuestros simuladores y tests para auditar tus consumos, evaluar deudas y tomar mejores decisiones hoy mismo.
          </p>
        </section>

        {/* Tools Grid */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {tools.map((tool, i) => (
              <Link 
                key={tool.id} 
                href={tool.href}
                className={`glass-card rounded-[2rem] p-8 md:p-10 border border-glass flex flex-col justify-between hover:scale-[1.02] ${tool.hoverBorder} transition-all duration-300 group reveal active`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl ${tool.bgColor} flex items-center justify-center ${tool.themeColor} border ${tool.borderColor} mb-6 shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="material-symbols-outlined text-3xl">{tool.icon}</span>
                  </div>
                  <h3 className="font-headline-lg text-headline-lg text-text-primary mb-4 group-hover:text-primary transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-text-secondary font-body-md text-body-md leading-relaxed mb-8">
                    {tool.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 font-bold text-sm text-primary group-hover:translate-x-2 transition-transform">
                  Probar herramienta <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
