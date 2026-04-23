import React, { useMemo } from 'react';
import { useTheme } from '@/lib/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

function FooterRainEffect() {
  const ripples = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: 5 + Math.random() * 90,
      delay: Math.random() * 4,
      duration: 2.5 + Math.random() * 1.5,
      size: 3 + Math.random() * 4,
    })), []
  );

  return (
    <div className="absolute top-0 left-0 right-0 h-px overflow-visible pointer-events-none">
      {ripples.map(r => (
        <motion.div
          key={r.id}
          className="absolute rounded-full"
          style={{
            left: `${r.left}%`,
            top: -1,
            width: r.size,
            height: r.size * 0.4,
            background: 'rgba(148, 194, 255, 0.35)',
            boxShadow: '0 0 6px rgba(148, 194, 255, 0.2)',
          }}
          animate={{
            scale: [0, 2.5, 4],
            opacity: [0.6, 0.3, 0],
          }}
          transition={{
            duration: r.duration,
            delay: r.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

export default function Footer() {
  const { theme, rainMode } = useTheme();

  const solidBg = theme.isLight ? '#E1EAF5' : '#070B14';

  return (
    <footer
      className="relative py-16 px-6 border-t transition-colors duration-700"
      style={{
        borderColor: theme.isLight ? 'rgba(15,23,42,0.1)' : 'rgba(248,250,252,0.06)',
        background: solidBg,
      }}
    >
      <AnimatePresence>
        {rainMode && <FooterRainEffect />}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto relative">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center font-heading font-bold text-xs text-white"
                style={{ background: theme.btnBg }}
              >
                M
              </div>
              <span className="font-heading font-semibold tracking-tight transition-colors duration-700" style={{ color: theme.textPrimary }}>
                MAVRIC TECHNOLOGIES
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs transition-colors duration-700" style={{ color: theme.textMuted }}>
              Desarrollo de software, automatización de procesos, plataformas
              cloud y soluciones con IA para empresas que buscan crecer con tecnología.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs font-mono tracking-widest mb-4 uppercase transition-colors duration-700" style={{ color: theme.textMuted }}>Empresa</h4>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'Servicios', href: '#solutions' },
                  { label: 'Soluciones', href: '#why-mavric' },
                  { label: 'Proyectos', href: '#work' },
                  { label: 'Equipo', href: '#team' },
                  { label: 'Contacto', href: '#contact' },
                ].map(link => (
                  <a key={link.label} href={link.href} className="text-sm transition-colors duration-500" style={{ color: theme.textSecondary }}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-mono tracking-widest mb-4 uppercase transition-colors duration-700" style={{ color: theme.textMuted }}>Conectar</h4>
              <div className="flex flex-col gap-3">
                <a href="mailto:hello@mavrictechnologies.com" className="text-sm transition-colors" style={{ color: theme.textSecondary }}>
                  Escríbenos
                </a>
                <a href="#" className="text-sm transition-colors" style={{ color: theme.textSecondary }}>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono tracking-widest mb-4 uppercase transition-colors duration-700" style={{ color: theme.textMuted }}>Contacto</h4>
            <a href="mailto:hello@mavrictechnologies.com" className="text-sm transition-colors" style={{ color: theme.accent1 }}>
              hello@mavrictechnologies.com
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4 transition-colors duration-700" style={{ borderColor: theme.isLight ? 'rgba(15,23,42,0.08)' : 'rgba(248,250,252,0.05)' }}>
          <p className="text-xs transition-colors duration-700" style={{ color: theme.textMuted }}>
            © {new Date().getFullYear()} Mavric Technologies. Todos los derechos reservados.
          </p>
          <p className="text-xs font-mono transition-colors duration-700" style={{ color: theme.textMuted }}>
            Tecnología con propósito.
          </p>
        </div>
      </div>
    </footer>
  );
}