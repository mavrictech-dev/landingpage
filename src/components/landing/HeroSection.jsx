import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import SocialLinksPanel from './SocialLinksPanel';
import bannerImage from '@/assets/banner-arquitectura-software-mavric.webp';

export default function HeroSection() {
  const { theme } = useTheme();

  return (
    <section id="hero" className="relative pt-24 sm:pt-28 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        {/* Gran Banner inmersivo que ocupa casi toda la sección con espaciado */}
        <div
          className="relative rounded-3xl overflow-hidden border transition-all duration-700 min-h-[580px] lg:min-h-[640px] flex items-center"
          style={{
            borderColor: theme.cardBorder,
            boxShadow: theme.isLight
              ? `0 20px 60px rgba(0,0,0,0.06), 0 0 80px ${theme.glow}`
              : `0 24px 70px rgba(0,0,0,0.5), 0 0 80px ${theme.glow}`,
          }}
        >
          {/* Imagen banner de fondo */}
          <img
            src={bannerImage}
            alt="Equipo Mavric Technologies - Arquitectura de Software"
            className="absolute inset-0 w-full h-full object-cover object-[75%_center] lg:object-center transition-transform duration-1000 scale-[1.01]"
            loading="eager"
          />

          {/* Overlays degradados responsivos para legibilidad impecable en modo claro y oscuro */}
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-700"
            style={{
              background: theme.isLight
                ? 'linear-gradient(90deg, rgba(248,250,252,0.96) 0%, rgba(248,250,252,0.92) 36%, rgba(248,250,252,0.7) 58%, rgba(248,250,252,0.15) 82%, transparent 100%)'
                : 'linear-gradient(90deg, rgba(7,11,22,0.96) 0%, rgba(7,11,22,0.92) 38%, rgba(7,11,22,0.72) 60%, rgba(7,11,22,0.2) 85%, transparent 100%)',
            }}
          />

          {/* Degradado vertical sutil para asegurar contraste en pantallas pequeñas */}
          <div
            className="absolute inset-0 lg:hidden pointer-events-none transition-all duration-700"
            style={{
              background: theme.isLight
                ? 'linear-gradient(180deg, rgba(248,250,252,0.85) 0%, rgba(248,250,252,0.92) 75%, rgba(248,250,252,0.98) 100%)'
                : 'linear-gradient(180deg, rgba(7,11,22,0.85) 0%, rgba(7,11,22,0.92) 75%, rgba(7,11,22,0.98) 100%)',
            }}
          />

          {/* Contenido por encima del banner */}
          <div className="relative z-10 w-full max-w-2xl px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 backdrop-blur-md transition-colors duration-700"
              style={{
                borderColor: `${theme.accent1}40`,
                background: theme.isLight ? 'rgba(255,255,255,0.75)' : `${theme.accent1}15`,
              }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: theme.accent1 }} />
              <span className="text-xs font-mono tracking-wider font-semibold" style={{ color: theme.accent1 }}>
                Soluciones empresariales escalables
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold leading-[1.12] mb-6 transition-colors duration-700 drop-shadow-sm"
              style={{ color: theme.textPrimary }}
            >
              Innovación tecnológica para escalar tu negocio con{' '}
              <span style={{ color: theme.highlightColor }}>
                efectividad y automatización
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <a
                href="https://mavrictec.mavricitas.com/"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                style={{
                  background: theme.btnBg,
                  color: theme.btnText,
                  boxShadow: `0 0 30px ${theme.glow}`,
                }}
              >
                Agendar Consulta
              </a>
              <div
                className="rounded-xl p-1 backdrop-blur-md border transition-colors duration-700"
                style={{
                  background: theme.isLight ? 'rgba(255,255,255,0.65)' : 'rgba(15,23,42,0.6)',
                  borderColor: theme.cardBorder,
                }}
              >
                <SocialLinksPanel variant="hero" className="px-3" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="flex gap-4 sm:gap-6 flex-wrap"
            >
              {[
                { val: '99.9%', label: 'Disponibilidad' },
                { val: '3x', label: 'Mayor Eficiencia' },
              ].map((m, i) => (
                <div
                  key={i}
                  className="rounded-2xl px-5 py-3 border backdrop-blur-md transition-all duration-700"
                  style={{
                    background: theme.isLight ? 'rgba(255,255,255,0.7)' : 'rgba(15,23,42,0.6)',
                    borderColor: theme.cardBorder,
                  }}
                >
                  <div className="text-2xl font-heading font-bold" style={{ color: theme.accent1 }}>
                    {m.val}
                  </div>
                  <div
                    className="text-xs font-mono tracking-wide transition-colors duration-700"
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