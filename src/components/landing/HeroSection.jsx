import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import SocialLinksPanel from './SocialLinksPanel';
import bannerImage from '@/assets/banner-arquitectura-software-mavric.webp';
import bannerImageMobile from '@/assets/banner-arquitectura-software-mavric-mobile.webp';

export default function HeroSection() {
  const { theme } = useTheme();

  return (
    <section id="hero" className="relative pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        {/* Contenedor Banner inmersivo y altamente responsivo */}
        <div
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden border transition-all duration-700 min-h-[560px] sm:min-h-[600px] lg:min-h-[640px] flex flex-col justify-end lg:justify-center lg:items-start"
          style={{
            borderColor: theme.cardBorder,
            boxShadow: theme.isLight
              ? `0 20px 60px rgba(0,0,0,0.06), 0 0 80px ${theme.glow}`
              : `0 24px 70px rgba(0,0,0,0.5), 0 0 80px ${theme.glow}`,
          }}
        >
          {/* Banner panorámico para Desktop */}
          <img
            src={bannerImage}
            alt="Equipo Mavric Technologies - Arquitectura de Software"
            className="hidden lg:block absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 scale-[1.01]"
            loading="eager"
          />

          {/* Banner vertical optimizado específicamente para Móvil y Tablet */}
          <img
            src={bannerImageMobile}
            alt="Equipo Mavric Technologies - Arquitectura de Software"
            className="block lg:hidden absolute inset-0 w-full h-full object-cover object-top transition-transform duration-1000 scale-[1.01]"
            loading="eager"
          />

          {/* Overlay para Desktop (degradado horizontal de izquierda a derecha) */}
          <div
            className="hidden lg:block absolute inset-0 pointer-events-none transition-all duration-700"
            style={{
              background: theme.isLight
                ? 'linear-gradient(90deg, rgba(248,250,252,0.97) 0%, rgba(248,250,252,0.92) 36%, rgba(248,250,252,0.65) 54%, rgba(248,250,252,0.15) 75%, transparent 100%)'
                : 'linear-gradient(90deg, rgba(7,11,22,0.97) 0%, rgba(7,11,22,0.92) 38%, rgba(7,11,22,0.68) 56%, rgba(7,11,22,0.18) 78%, transparent 100%)',
            }}
          />

          {/* Overlay para Móvil y Tablet (degradado vertical progresivo de abajo hacia arriba) */}
          <div
            className="block lg:hidden absolute inset-0 pointer-events-none transition-all duration-700"
            style={{
              background: theme.isLight
                ? 'linear-gradient(180deg, transparent 0%, rgba(248,250,252,0.06) 24%, rgba(248,250,252,0.76) 48%, rgba(248,250,252,0.96) 68%, rgba(248,250,252,1) 100%)'
                : 'linear-gradient(180deg, transparent 0%, rgba(7,11,22,0.06) 24%, rgba(7,11,22,0.76) 48%, rgba(7,11,22,0.96) 68%, rgba(7,11,22,1) 100%)',
            }}
          />

          {/* Contenido por encima del banner */}
          <div className="relative z-10 w-full max-w-2xl px-5 pt-36 pb-6 sm:px-10 sm:pt-40 sm:pb-10 lg:px-16 lg:py-16">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border mb-3 sm:mb-5 backdrop-blur-md transition-colors duration-700"
              style={{
                borderColor: `${theme.accent1}40`,
                background: theme.isLight ? 'rgba(255,255,255,0.85)' : `${theme.accent1}20`,
              }}
            >
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse" style={{ background: theme.accent1 }} />
              <span className="text-[11px] sm:text-xs font-mono tracking-wider font-semibold" style={{ color: theme.accent1 }}>
                Soluciones empresariales escalables
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-2xl sm:text-4xl lg:text-5xl font-heading font-bold leading-[1.18] sm:leading-[1.12] mb-4 sm:mb-6 transition-colors duration-700 drop-shadow-sm"
              style={{ color: theme.textPrimary }}
            >
              Innovación tecnológica para escalar tu negocio con{' '}
              <span style={{ color: theme.highlightColor }}>
                efectividad y automatización
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap items-center gap-2.5 sm:gap-4 mb-6 sm:mb-8"
            >
              <a
                href="https://mavrictec.mavricitas.com/"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-xl text-sm sm:text-base font-medium transition-all duration-300 hover:scale-105 shadow-md"
                style={{
                  background: theme.btnBg,
                  color: theme.btnText,
                  boxShadow: `0 0 25px ${theme.glow}`,
                }}
              >
                Agendar Consulta
              </a>
              <div
                className="rounded-xl p-1 backdrop-blur-md border transition-colors duration-700"
                style={{
                  background: theme.isLight ? 'rgba(255,255,255,0.75)' : 'rgba(15,23,42,0.65)',
                  borderColor: theme.cardBorder,
                }}
              >
                <SocialLinksPanel variant="hero" className="px-2.5 sm:px-3" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.55 }}
              className="grid grid-cols-2 gap-2.5 sm:flex sm:gap-4 max-w-sm sm:max-w-none"
            >
              {[
                { val: '99.9%', label: 'Disponibilidad' },
                { val: '3x', label: 'Mayor Eficiencia' },
              ].map((m, i) => (
                <div
                  key={i}
                  className="rounded-xl sm:rounded-2xl px-3.5 py-2 sm:px-5 sm:py-3 border backdrop-blur-md transition-all duration-700"
                  style={{
                    background: theme.isLight ? 'rgba(255,255,255,0.8)' : 'rgba(15,23,42,0.65)',
                    borderColor: theme.cardBorder,
                  }}
                >
                  <div className="text-lg sm:text-2xl font-heading font-bold leading-tight" style={{ color: theme.accent1 }}>
                    {m.val}
                  </div>
                  <div
                    className="text-[10px] sm:text-xs font-mono tracking-wide mt-0.5 transition-colors duration-700"
                    style={{ color: theme.textMuted }}
                  >
                    {m.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}