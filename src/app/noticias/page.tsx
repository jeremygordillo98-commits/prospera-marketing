'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/services/supabase';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  image_url?: string;
  is_published: boolean;
  published_at?: string;
  created_at: string;
}

const CATEGORIES = ['Todas', 'Actualización', 'Tip Financiero', 'Aviso Importante', 'Nueva Funcionalidad'];

export default function NoticiasPage() {
  const [mounted, setMounted] = useState(false);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filter, setFilter] = useState('Todas');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('public_news')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNews(data || []);
    } catch (err) {
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
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

  const filteredNews = filter === 'Todas' ? news : news.filter(n => n.category === filter);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('es-EC', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen text-[#dfe2f1] font-body-md selection:bg-primary-container selection:text-white overflow-x-hidden">
      {/* Interactive Mouse Glow */}
      <div className="mouse-glow" id="mouse-glow"></div>
      
      {/* Ambient Glows */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] radial-glow-primary -z-10 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] radial-glow-secondary -z-10 pointer-events-none"></div>

      <Navbar activeTab="noticias" />

      <main className="pt-32 pb-24 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Header Section */}
        <section className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-label-md text-label-md w-fit mb-2">
            <span className="material-symbols-outlined text-[18px]">newspaper</span>
            Noticias & Actualizaciones
          </div>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-text-primary leading-[1.1] max-w-3xl mx-auto">
            Novedades del ecosistema de <span className="text-primary">Prospera Finanzas</span>.
          </h1>
          <p className="text-text-secondary font-body-lg text-body-lg max-w-xl mx-auto leading-relaxed">
            Mantente al día con nuestras nuevas funcionalidades contables, avisos de mantenimiento y tips para optimizar tu dinero.
          </p>
        </section>

        {/* Categories Filtering */}
        <section className="flex flex-wrap gap-2 justify-center mb-12">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                filter === category
                  ? 'bg-primary text-on-background shadow-[0_0_15px_rgba(124,59,237,0.3)]'
                  : 'bg-surface-container-low border border-glass text-text-secondary hover:text-primary hover:border-primary/30'
              }`}
            >
              {category}
            </button>
          ))}
        </section>

        {/* News Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
            <p className="text-text-secondary text-sm">Cargando publicaciones...</p>
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-glass rounded-2xl bg-surface-container-lowest/50">
            <span className="material-symbols-outlined text-5xl text-text-secondary opacity-40 mb-4">info</span>
            <h3 className="text-lg font-bold text-text-primary mb-1">No hay publicaciones</h3>
            <p className="text-text-secondary text-sm max-w-sm mx-auto">
              No encontramos noticias publicadas en este momento bajo la categoría seleccionada.
            </p>
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {filteredNews.map(item => (
              <article
                key={item.id}
                onClick={() => setSelectedNews(item)}
                className="glass-card rounded-xl overflow-hidden flex flex-col justify-between cursor-pointer border border-glass group hover:border-primary/30 transition-all duration-300"
              >
                <div className="p-8 space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold text-primary">
                    <span className="bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full">{item.category}</span>
                    <span className="text-text-secondary font-normal">{formatDate(item.published_at || item.created_at)}</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-text-primary group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary font-body-sm text-body-sm line-clamp-4 leading-relaxed">
                    {item.summary || item.content}
                  </p>
                </div>
                <div className="px-8 pb-8 pt-2 flex items-center gap-2 text-primary font-bold text-sm group-hover:translate-x-1 transition-transform">
                  Leer publicación <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>

      {/* Detail Modal */}
      {selectedNews && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedNews(null)}
        >
          <div 
            className="bg-[#0f131d] border border-glass rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl relative animate-in zoom-in"
            onClick={e => e.stopPropagation()}
          >
            {/* Header / Image space if available */}
            {selectedNews.image_url && (
              <div className="w-full h-48 relative border-b border-glass bg-surface-container-low shrink-0">
                <img 
                  src={selectedNews.image_url} 
                  alt={selectedNews.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Modal Content */}
            <div className="p-8 overflow-y-auto space-y-6 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs font-bold bg-primary/10 border border-primary/20 text-primary px-3 py-1.5 rounded-full">
                  {selectedNews.category}
                </span>
                <span className="text-xs text-text-secondary">
                  Publicado el {formatDate(selectedNews.published_at || selectedNews.created_at)}
                </span>
              </div>

              <h2 className="font-display-lg text-headline-lg text-text-primary leading-tight">
                {selectedNews.title}
              </h2>

              <div className="text-text-secondary font-body-md text-body-md leading-relaxed whitespace-pre-wrap space-y-4 border-t border-glass pt-6">
                {selectedNews.content}
              </div>
            </div>

            {/* Close Bar */}
            <div className="p-6 border-t border-glass bg-surface-container-lowest shrink-0 flex justify-end">
              <button
                onClick={() => setSelectedNews(null)}
                className="bg-surface-container border border-glass text-text-primary px-6 py-3 rounded-full font-bold text-sm hover:bg-surface-variant transition-all hover:scale-105"
              >
                Cerrar Publicación
              </button>
            </div>
            
            {/* Direct Close Button in corner */}
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 bg-surface-container/60 hover:bg-surface-container border border-glass text-text-primary w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all z-10"
              title="Cerrar"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
