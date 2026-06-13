'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-container-lowest border-t border-glass py-16 w-full relative z-10">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-2 md:grid-cols-4 gap-gutter">
        <div className="col-span-2 md:col-span-1 space-y-4">
          <div className="font-display-lg text-headline-md text-on-surface font-black">Prospera Finanzas</div>
          <p className="text-text-secondary font-body-sm text-body-sm">
            Transformando la gestión financiera personal y de negocios en Ecuador con tecnología de vanguardia.
          </p>
          <div className="flex gap-4 pt-4">
            <span className="material-symbols-outlined text-on-surface opacity-60 cursor-pointer hover:opacity-100 hover:text-primary transition-all">language</span>
            <span className="material-symbols-outlined text-on-surface opacity-60 cursor-pointer hover:opacity-100 hover:text-primary transition-all">contact_support</span>
            <span className="material-symbols-outlined text-on-surface opacity-60 cursor-pointer hover:opacity-100 hover:text-primary transition-all">share</span>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="font-headline-md text-body-lg text-text-primary">Producto</h4>
          <ul className="space-y-2 text-body-sm text-text-secondary">
            <li><Link className="hover:text-primary transition-colors duration-300" href="/">Soporte PYMEs</Link></li>
            <li><Link className="hover:text-primary transition-colors duration-300" href="/personas">Finanzas Personales</Link></li>
            <li><Link className="hover:text-primary transition-colors duration-300" href="/lab">Laboratorio</Link></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-headline-md text-body-lg text-text-primary">Compañía</h4>
          <ul className="space-y-2 text-body-sm text-text-secondary">
            <li><Link className="hover:text-primary transition-colors duration-300" href="/nosotros">Sobre nosotros</Link></li>
            <li><Link className="hover:text-primary transition-colors duration-300" href="/soporte">Soporte</Link></li>
            <li><Link className="hover:text-primary transition-colors duration-300" href="/soporte">Contacto</Link></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-headline-md text-body-lg text-text-primary">Legal</h4>
          <ul className="space-y-2 text-body-sm text-text-secondary">
            <li><Link className="hover:text-primary transition-colors duration-300" href="/terminos">Privacidad</Link></li>
            <li><Link className="hover:text-primary transition-colors duration-300" href="/terminos">Términos</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-16 pt-8 border-t border-glass flex flex-col md:flex-row justify-between items-center gap-4 text-body-sm text-text-secondary">
        <div>© {currentYear} Prospera Finanzas. Todos los derechos reservados.</div>
      </div>
    </footer>
  );
}
