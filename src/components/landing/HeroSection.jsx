import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { ArrowRight, ChevronRight } from 'lucide-react';

function HeroVisual() {
  const { theme } = useTheme();
  return (
    <div className="relative w-full max-w-lg mx-auto lg:mx-0">
      <motion.div
        className="relative rounded-2xl border overflow-hidden transition-all duration-700"
        style={{
          background: theme.cardBg,
          borderColor: theme.cardBorder,
          boxShadow: `0 0 80px ${theme.glow}, 0 20px 60px rgba(0,0,0,${theme.isLight ? '0.08' : '0.5'})`,
          backdropFilter: 'blur(20px)',
        }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b transition-colors duration-700" style={{ borderColor: theme.cardBorder }}>
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
          <div className="ml-4 h-5 w-40 rounded" style={{ background: theme.isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)' }} />
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {[theme.accent1, theme.accent2, theme.accent1].map((c, i) => (
              <div key={i} className="rounded-lg p-3 transition-colors duration-700" style={{ background: `${c}10` }}>
                <div className="w-6 h-6 rounded mb-2" style={{ background: c, opacity: 0.7 }} />
                <div className="h-2 w-full rounded" style={{ background: theme.isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.1)' }} />
                <div className="h-2 w-2/3 rounded mt-1.5" style={{ background: theme.isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.05)' }} />
                <div className="text-lg font-heading font-bold mt-2" style={{ color: c }}>
                  {['98%', '2.4x', '340+'][i]}
                </div>
              </div>
            ))}
          </div>
          <div className="h-20 rounded-lg" style={{ background: `${theme.accent1}10` }}>
            <div className="flex items-end h-full px-3 pb-2 gap-1.5">
              {Array.from({ length: 12 }, (_, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t"
                  style={{
                    height: `${20 + Math.random() * 70}%`,
                    background: `${theme.accent1}40`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute -bottom-4 -left-6 md:-left-12 rounded-xl px-4 py-3 border transition-all duration-700"
        style={{
          background: theme.cardBg,
          borderColor: theme.cardBorder,
          backdropFilter: 'blur(20px)',
          boxShadow: `0 0 40px ${theme.glow}`,
        }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${theme.accent1}20` }}>
            <ChevronRight size={14} style={{ color: theme.accent1 }} />
          </div>
          <div>
            <div className="text-xs font-mono transition-colors duration-700" style={{ color: theme.textMuted }}>deploy.status</div>
            <div className="text-sm font-heading font-semibold text-green-500">Activo — 99.9% uptime</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function HeroSection() {
  const { theme } = useTheme();

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8 transition-colors duration-700"
              style={{ borderColor: `${theme.accent1}30`, background: `${theme.accent1}08` }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: theme.accent1 }} />
              <span className="text-xs font-mono tracking-wider" style={{ color: theme.accent1 }}>
                Software a Medida · Automatización · Cloud · IA
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-[1.1] mb-6 transition-colors duration-700"
              style={{ color: theme.textPrimary }}
            >
              Software a medida para empresas que buscan{' '}
              <span style={{ color: theme.highlightColor }}>
                crecer con tecnología
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg leading-relaxed max-w-lg mb-10 transition-colors duration-700"
              style={{ color: theme.textMuted }}
            >
              Diseñamos y desarrollamos plataformas, automatizaciones y soluciones
              digitales que optimizan procesos, mejoran la operación y te ayudan a
              escalar con más eficiencia.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                style={{
                  background: theme.btnBg,
                  color: theme.btnText,
                  boxShadow: `0 0 30px ${theme.glow}`,
                }}
              >
                Agendar Consulta
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#solutions"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-medium border transition-all duration-500 hover:scale-105"
                style={{
                  color: theme.textSecondary,
                  borderColor: theme.cardBorder,
                  background: `${theme.cardBg}`,
                  backdropFilter: 'blur(8px)',
                }}
              >
                Ver Soluciones
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex gap-8 flex-wrap"
            >
              {[
                { val: '50+', label: 'Proyectos Entregados' },
                { val: '99.9%', label: 'Disponibilidad' },
                { val: '3x', label: 'Mayor Eficiencia' },
              ].map((m, i) => (
                <div key={i}>
                  <div className="text-2xl font-heading font-bold" style={{ color: theme.accent1 }}>
                    {m.val}
                  </div>
                  <div className="text-xs font-mono tracking-wide transition-colors duration-700" style={{ color: theme.textMuted }}>{m.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}