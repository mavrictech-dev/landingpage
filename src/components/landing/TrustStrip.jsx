import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { Zap, Cpu, Cloud, BarChart3 } from 'lucide-react';

function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const num = parseFloat(target);
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * num));
      if (progress < 1) requestAnimationFrame(tick);
    };
    tick();
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const metrics = [
  { icon: Zap, value: '50', suffix: '+', label: 'Proyectos Entregados' },
  { icon: BarChart3, value: '40', suffix: '%', label: 'Más Eficiencia Operativa' },
  { icon: Cpu, value: '200', suffix: '+', label: 'Procesos Automatizados' },
  { icon: Cloud, value: '99', suffix: '.9%', label: 'Disponibilidad Garantizada' },
];

export default function TrustStrip() {
  const { theme } = useTheme();

  return (
    <section className="md:flex relative hidden py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="rounded-2xl border p-8 md:p-10 transition-all duration-700"
          style={{
            background: theme.isLight
              ? 'rgba(255, 255, 255, 0.35)'
              : 'rgba(15, 23, 50, 0.4)',
            borderColor: theme.isLight
              ? 'rgba(15, 23, 42, 0.08)'
              : 'rgba(248, 250, 252, 0.07)',
            backdropFilter: 'blur(12px)',
            boxShadow: theme.isLight
              ? '0 4px 24px rgba(0,0,0,0.04)'
              : '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)',
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center"
              >
                <m.icon size={20} className="mx-auto mb-3" style={{ color: theme.accent1 }} />
                <div className="text-3xl md:text-4xl font-heading font-bold mb-1 transition-colors duration-700" style={{ color: theme.textPrimary }}>
                  <AnimatedCounter target={m.value} suffix={m.suffix} />
                </div>
                <div className="text-xs font-mono tracking-wider uppercase transition-colors duration-700" style={{ color: theme.textMuted }}>
                  {m.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}