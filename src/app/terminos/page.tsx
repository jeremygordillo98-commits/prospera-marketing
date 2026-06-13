'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TerminosPage() {
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

      <main className="pt-32 pb-24 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Header Section */}
        <header className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-label-md text-label-md w-fit mb-2">
            <span className="material-symbols-outlined text-[18px]">gavel</span>
            Aspectos Legales & Privacidad
          </div>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-text-primary leading-[1.1] max-w-3xl mx-auto">
            Términos de Servicio y <span className="text-primary">Escudo de Privacidad</span>
          </h1>
          <div className="inline-block bg-primary/15 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            Versión Unificada 3.1 • Junio 2026
          </div>
        </header>

        {/* Legal Text Layout */}
        <section className="glass-card rounded-2xl p-8 md:p-12 max-w-4xl mx-auto border border-glass bg-surface-container/60 shadow-2xl relative">
          
          {/* Condiciónes de Uso */}
          <div className="space-y-8">
            <h2 className="text-2xl font-display-lg font-bold text-text-primary flex items-center gap-3 pb-3 border-b border-glass">
              <span className="material-symbols-outlined text-primary text-2xl">description</span>
              1. Condiciones Generales y Términos de Uso
            </h2>

            <div className="space-y-6 text-text-secondary text-body-sm leading-relaxed">
              <div>
                <h3 className="font-bold text-text-primary text-base mb-2">1.1 Estatus Legal de la Plataforma</h3>
                <p>
                  <b>Prospera Finanzas</b> es un ecosistema tecnológico operado en la nube como software de apoyo para la optimización financiera personal (Prospera App) y la automatización contable de negocios (Prospera Pymes). Prospera <b>no realiza captación de dinero del público ni ofrece asesoría contable autónoma o auditoría profesional</b>. No somos una entidad regulada por la Superintendencia de Bancos por la naturaleza exclusivamente tecnológica de nuestro servicio.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-text-primary text-base mb-2">1.2 Automatización y Delimitación de Responsabilidad SRI (Módulo PYME)</h3>
                <p>
                  Las funcionalidades de carga masiva de facturas electrónicas XML del SRI y la generación automática de archivos para el Anexo Transaccional Simplificado (ATS) son herramientas de <b>apoyo tecnológico para la eficiencia del procesamiento de datos</b>. 
                </p>
                <div className="my-4 p-5 rounded-xl bg-surface-container-low border-l-4 border-primary text-text-primary text-sm leading-relaxed">
                  <b>⚠️ RESPONSABILIDAD PROFESIONAL:</b> El Contador Público Autorizado o usuario profesional responsable del negocio es el <b>único y exclusivo responsable legal</b> de revisar, verificar y certificar la veracidad, integridad y exactitud de todos los saldos contables, transacciones y reportes generados. Prospera no asume responsabilidad alguna por multas, glosas, recargos o sanciones fiscales emitidas por el SRI debidas a inconsistencias de datos o mala parametrización tributaria.
                </div>
              </div>

              <div>
                <h3 className="font-bold text-text-primary text-base mb-2">1.3 Autorización de Datos de Terceros (LODP)</h3>
                <p>
                  En conformidad con la <b>Ley Orgánica de Protección de Datos Personales (LODP) de Ecuador</b>, el usuario profesional garantiza bajo juramento que posee los consentimientos, mandatos o autorizaciones de sus clientes (personas naturales o jurídicas representadas) para registrar, procesar, cargar y hospedar su información financiera y transaccional en la infraestructura de Prospera.
                </p>
              </div>
            </div>
          </div>

          {/* Separator */}
          <hr className="my-12 border-glass" />

          {/* Políticas de Privacidad */}
          <div className="space-y-8">
            <h2 className="text-2xl font-display-lg font-bold text-text-primary flex items-center gap-3 pb-3 border-b border-glass">
              <span className="material-symbols-outlined text-primary text-2xl">shield</span>
              2. Políticas de Privacidad y Escudo de Datos
            </h2>

            <div className="space-y-6 text-text-secondary text-body-sm leading-relaxed">
              <p>
                Nuestra prioridad fundamental es garantizar la soberanía, confidencialidad y blindaje absoluto de la información financiera y personal de todos los usuarios de nuestro ecosistema.
              </p>

              <div>
                <h3 className="font-bold text-text-primary text-base mb-2">2.1 Neutralidad y No Comercialización</h3>
                <p>
                  Prospera no comercializa, transfiere ni alquila bajo ningún concepto registros financieros, márgenes de utilidad, carteras de proveedores o clientes, transacciones contables o bases de datos de los usuarios. Eres el dueño absoluto de tu información.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-text-primary text-base mb-2">2.2 Aislamiento Seguro de Datos (Row Level Security)</h3>
                <p>
                  La infraestructura de base de datos utiliza aislamiento multi-inquilino robusto (Row Level Security - RLS) gestionado a través de Supabase. Esto garantiza que los datos financieros de cada empresa, cliente o cuenta personal sean completamente invisibles y estén 100% aislados de otros usuarios del ecosistema, evitando fugas accidentales de información.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-text-primary text-base mb-2">2.3 Procesamiento de Inteligencia Artificial (IA)</h3>
                <p>
                  Para habilitar la categorización inteligente de movimientos en finanzas personales, los conceptos de transacciones pueden procesarse a través de APIs de Inteligencia Artificial (ej. OpenAI). Ningún dato que revele la identidad física directa del usuario (como nombres de personas o cédulas/RUCs) se envía en estas peticiones.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-text-primary text-base mb-2">2.4 Derecho al Olvido y Eliminación Definitiva</h3>
                <p>
                  Cualquier usuario o contador cuenta con el control absoluto para exportar su información o eliminar de manera definitiva y permanente su catálogo de empresas, registros del Libro Diario, Mayor, XMLs cargados y cuentas personales. Este proceso es inmediato, irreversible y borra físicamente todo registro de los servidores de Prospera.
                </p>
              </div>
            </div>
          </div>

          {/* Footer of legal block */}
          <div className="mt-12 pt-8 border-t border-glass text-center space-y-4">
            <p className="font-bold text-text-primary text-sm">
              ¿Tienes dudas o necesitas asistencia legal sobre los términos de servicio?
            </p>
            <a 
              href="mailto:prosperaapp.soporte@gmail.com?subject=Consulta%20Legal"
              className="inline-flex items-center gap-2 bg-primary text-on-background px-8 py-3.5 rounded-full font-bold hover:shadow-[0_4px_15px_rgba(124,59,237,0.3)] hover:scale-105 transition-all duration-300 text-sm"
            >
              <span className="material-symbols-outlined text-sm">mail</span> Contactar a Soporte
            </a>
          </div>

        </section>
      </main>

      <Footer />
    </div>
  );
}
