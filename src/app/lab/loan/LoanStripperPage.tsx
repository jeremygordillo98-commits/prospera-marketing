'use client';

import React, { useEffect, useState } from 'react';
import LoanStripper from '@/components/tools/LoanStripper';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function LoanStripperPage() {
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

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mounted]);

  const getAppUrl = (mode: 'login' | 'register') => {
    const baseUrl = typeof window !== 'undefined' && window.location.hostname === 'localhost' 
      ? 'http://localhost:5173' 
      : 'https://app.prosperafinanzas.com';
    return `${baseUrl}/login?mode=${mode}`;
  };

  if (!mounted) {
    return <div className="min-h-screen bg-[#0b0f19]"></div>;
  }

  return (
    <div className="min-h-screen text-[#dfe2f1] font-body-md selection:bg-primary-container selection:text-white overflow-x-hidden flex flex-col justify-between">
      {/* Interactive Mouse Glow */}
      <div className="mouse-glow" id="mouse-glow"></div>
      
      {/* Ambient Glows */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] radial-glow-primary -z-10 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] radial-glow-secondary -z-10 pointer-events-none"></div>

      <Navbar activeTab="laboratorio" />

      <main className="pt-32 pb-20 px-margin-mobile md:px-margin-desktop flex-1 flex items-center justify-center">
        <div className="w-full max-w-4xl glass-card rounded-[3rem] border border-glass p-8 sm:p-12 shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-tertiary/30">
          <div className="absolute inset-0 bg-gradient-to-tr from-tertiary/5 via-transparent to-transparent opacity-50 pointer-events-none"></div>
          <div className="relative z-10">
            <LoanStripper onRegister={() => window.location.href = getAppUrl('register')} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
