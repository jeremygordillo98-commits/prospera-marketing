'use client';

import React from 'react';
import Link from 'next/link';

interface NavbarProps {
  activeTab?: 'pymes' | 'personas' | 'nosotros' | 'laboratorio';
  hideButtons?: boolean;
}

export default function Navbar({ activeTab, hideButtons = false }: NavbarProps) {
  const getAppUrl = (mode: 'login' | 'register') => {
    const baseUrl = typeof window !== 'undefined' && window.location.hostname === 'localhost' 
      ? 'http://localhost:5173' 
      : 'https://app.prosperafinanzas.com';
    return `${baseUrl}/login?mode=${mode}`;
  };

  const getPymesUrl = (mode: 'login' | 'register') => {
    const baseUrl = typeof window !== 'undefined' && window.location.hostname === 'localhost' 
      ? 'http://localhost:5174' 
      : 'https://pymes.prosperafinanzas.com';
    return `${baseUrl}/login?mode=${mode}`;
  };

  // Determine correct links/styles based on activeTab
  const isPymes = activeTab === 'pymes';
  const loginUrl = isPymes ? getPymesUrl('login') : getAppUrl('login');
  const registerUrl = isPymes ? getPymesUrl('register') : getAppUrl('register');

  const buttonText = isPymes ? 'Empezar Pymes' : 'Empezar Gratis';

  // Dynamic shadow glow based on activeTab theme color
  const shadowGlowClass = 
    activeTab === 'personas' ? 'hover:shadow-[0_0_20px_rgba(0,214,143,0.4)]' :
    activeTab === 'nosotros' ? 'hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]' :
    'hover:shadow-[0_0_20px_rgba(124,59,237,0.4)]'; // default/violet for pymes

  const activeClass = "text-primary font-bold border-b-2 border-primary pb-1 font-body-md text-body-md transition-colors duration-300";
  const inactiveClass = "text-on-surface-variant font-body-md text-body-md hover:text-primary transition-colors duration-300 pb-1";

  // Force hide buttons on nosotros
  const shouldHideButtons = hideButtons || activeTab === 'nosotros';

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface-glass backdrop-blur-lg shadow-sm border-b border-glass h-20 flex justify-between items-center px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max mx-auto w-full flex justify-between items-center">
        <Link href="/" className="font-display-lg text-display-lg-mobile md:text-headline-lg font-black text-primary hover:opacity-95 transition-opacity">
          Prospera Finanzas
        </Link>
        
        <div className="hidden md:flex gap-8 items-center">
          <Link className={activeTab === 'pymes' ? activeClass : inactiveClass} href="/">
            Pymes
          </Link>
          <Link className={activeTab === 'personas' ? activeClass : inactiveClass} href="/personas">
            Personas
          </Link>
          <Link className={activeTab === 'nosotros' ? activeClass : inactiveClass} href="/nosotros">
            Nosotros
          </Link>
          
          {/* Dropdown Laboratorio */}
          <div className="relative group">
            <Link 
              className={`${activeTab === 'laboratorio' ? activeClass : inactiveClass} flex items-center gap-1`}
              href="/lab"
            >
              Laboratorio
              <span className="material-symbols-outlined text-[16px] group-hover:rotate-180 transition-transform duration-200">
                keyboard_arrow_down
              </span>
            </Link>
            
            {/* Floating Dropdown Card with glassmorphism */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 rounded-2xl bg-[#0f131d]/95 border border-glass backdrop-blur-xl p-3 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 flex flex-col gap-1.5">
              <Link 
                href="/lab/ant"
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all group/item"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
                  <span className="material-symbols-outlined text-lg">bug_report</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-text-primary group-hover/item:text-primary transition-colors">Gastos Hormiga</div>
                  <div className="text-[10px] text-text-secondary leading-tight">Detecta fugas invisibles de dinero</div>
                </div>
              </Link>
              
              <Link 
                href="/lab/health"
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all group/item"
              >
                <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20 shrink-0">
                  <span className="material-symbols-outlined text-lg">monitor_heart</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-text-primary group-hover/item:text-secondary transition-colors">Salud Financiera</div>
                  <div className="text-[10px] text-text-secondary leading-tight">Evalúa tu estado financiero actual</div>
                </div>
              </Link>
              
              <Link 
                href="/lab/loan"
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all group/item"
              >
                <div className="w-8 h-8 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary border border-tertiary/20 shrink-0">
                  <span className="material-symbols-outlined text-lg">calculate</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-text-primary group-hover/item:text-tertiary transition-colors">Simulador de Préstamos</div>
                  <div className="text-[10px] text-text-secondary leading-tight">Compara cuotas e intereses fácilmente</div>
                </div>
              </Link>
              
              <Link 
                href="/lab/subs"
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all group/item"
              >
                <div className="w-8 h-8 rounded-lg bg-[#f43f5e]/10 flex items-center justify-center text-[#f43f5e] border border-[#f43f5e]/20 shrink-0">
                  <span className="material-symbols-outlined text-lg">notifications_active</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-text-primary group-hover/item:text-[#f43f5e] transition-colors">Auditor de Suscripciones</div>
                  <div className="text-[10px] text-text-secondary leading-tight">Rastrea y cancela servicios olvidados</div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {shouldHideButtons ? (
          <div className="flex items-center gap-4 min-w-[150px] justify-end">
            {/* Empty space or secondary elements since actions are hidden on nosotros */}
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <a href={loginUrl} className="hidden md:block text-primary font-bold hover:scale-105 transition-transform duration-300">
              Ingresar
            </a>
            <a 
              href={registerUrl} 
              className={`bg-primary-container text-on-primary-container px-6 py-3 rounded-full font-bold hover:scale-105 transition-all duration-300 ${shadowGlowClass}`}
            >
              {buttonText}
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
