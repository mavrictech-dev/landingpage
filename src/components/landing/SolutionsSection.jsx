import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { Code2, Workflow, Cloud, Brain } from 'lucide-react';

const solutions = [
  {
    icon: Code2,
    title: 'Desarrollo de Software a Medida',
    desc: 'Construimos plataformas y aplicaciones de negocio adaptadas a tus procesos reales. Arquitectura limpia, código escalable y enfoque en resultados operativos.',
    tag: 'DESARROLLO',
  },
  {
    icon: Workflow,
    title: 'Automatización de Procesos',
    desc: 'Integramos y automatizamos flujos de trabajo entre tus sistemas, eliminando tareas manuales y reduciendo errores para que tu equipo se enfoque en lo estratégico.',
    tag: 'AUTOMATIZACIÓN',
  },
  {
    icon: Cloud,
    title: 'Plataformas Cloud Escalables',
    desc: 'Diseñamos infraestructura en la nube preparada para crecer contigo. Alta disponibilidad, seguridad integrada y optimización continua del rendimiento.',
    tag: 'CLOUD',
  },
  {
    icon: Brain,
    title: 'IA Aplicada y Analítica Avanzada',
    desc: 'Convertimos tus datos en decisiones con modelos de inteligencia artificial, dashboards analíticos y herramientas predictivas que generan ventaja competitiva real.',
    tag: 'IA / ML',
  },
];

function SolutionCard({ solution, index }) {
  const { theme } = useTheme();
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const glowX = useTransform(mouseX, v => `${v}px`);
  const glowY = useTransform(mouseY, v => `${v}px`);

  function handleMouse(e) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      onMouseMove={handleMouse}
      className="group relative rounded-2xl border overflow-hidden cursor-pointer transition-all duration-700"
      style={{
        background: theme.cardBg,
        borderColor: theme.cardBorder,
        backdropFilter: 'blur(16px)',
      }}
    >
      <motion.div
        className="absolute w-60 h-60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-0"
        style={{
          left: glowX,
          top: glowY,
          x: '-50%',
          y: '-50%',
          background: `radial-gradient(circle, ${theme.accent1}18, transparent 70%)`,
        }}
      />

      <div className="relative z-10 p-7">
        <div className="flex items-center justify-between mb-5">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-700" style={{ background: `${theme.accent1}15` }}>
            <solution.icon size={20} style={{ color: theme.accent1 }} />
          </div>
          <span className="text-[10px] font-mono tracking-widest px-2.5 py-1 rounded-full border transition-colors duration-700" style={{ borderColor: theme.cardBorder, color: theme.textMuted }}>
            {solution.tag}
          </span>
        </div>
        <h3 className="text-lg font-heading font-semibold mb-3 transition-colors duration-700" style={{ color: theme.textPrimary }}>
          {solution.title}
        </h3>
        <p className="text-sm leading-relaxed font-body transition-colors duration-700" style={{ color: theme.textMuted }}>
          {solution.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function SolutionsSection() {
  const { theme } = useTheme();

  return (
    <section id="solutions" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono tracking-widest uppercase mb-4 block" style={{ color: theme.accent1 }}>
            02 // Nuestros Servicios
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4 transition-colors duration-700" style={{ color: theme.textPrimary }}>
            Tecnología con{' '}
            <span style={{ color: theme.highlightColor }}>
              Propósito
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-lg transition-colors duration-700" style={{ color: theme.textMuted }}>
            Soluciones digitales enfocadas en optimizar operaciones, integrar sistemas y acelerar el crecimiento de tu empresa.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {solutions.map((s, i) => (
            <SolutionCard key={i} solution={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}