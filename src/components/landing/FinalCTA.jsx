import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { ArrowRight } from 'lucide-react';

export default function FinalCTA() {
  const { theme } = useTheme();

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, ${theme.accent1}10, transparent 70%)`,
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <span className="text-xs font-mono tracking-widest uppercase mb-6 block" style={{ color: theme.accent1 }}>
            05 // Siguiente Paso
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-tight transition-colors duration-700" style={{ color: theme.textPrimary }}>
            ¿Listo para optimizar{' '}
            <span style={{ color: theme.highlightColor }}>
              tu operación
            </span>
            ?
          </h2>
          <p className="text-lg mb-10 max-w-lg mx-auto transition-colors duration-700" style={{ color: theme.textMuted }}>
            Cuéntanos tu desafío. Diseñamos la solución técnica, definimos el roadmap
            y ejecutamos de principio a fin — con foco en eficiencia y resultados reales.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:hello@mavrictechnologies.com"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105"
              style={{
                background: theme.btnBg,
                color: theme.btnText,
                boxShadow: `0 0 40px ${theme.glow}, 0 0 80px ${theme.glow}`,
              }}
            >
              Agendar Consulta
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="mailto:hello@mavrictechnologies.com"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium border transition-all duration-500 hover:scale-105"
              style={{
                color: theme.textSecondary,
                borderColor: theme.cardBorder,
                background: theme.cardBg,
                backdropFilter: 'blur(8px)',
              }}
            >
              Hablemos
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}