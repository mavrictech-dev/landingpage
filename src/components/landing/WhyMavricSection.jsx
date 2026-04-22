import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { Target, Layers, Shield, ArrowUpRight, Palette, GitBranch } from 'lucide-react';

const differentiators = [
  { icon: Target, title: 'Análisis de Procesos', desc: 'Entendemos tu operación antes de escribir código. Diseñamos soluciones alineadas a tu lógica de negocio.' },
  { icon: Layers, title: 'Arquitectura Escalable', desc: 'Plataformas preparadas para multiplicar su capacidad sin rediseño ni interrupciones operativas.' },
  { icon: Palette, title: 'Diseño de Producto Digital', desc: 'Interfaces claras, funcionales y modernas que tus equipos adoptan desde el primer día.' },
  { icon: GitBranch, title: 'Integración de Sistemas', desc: 'Conectamos tus herramientas existentes en un ecosistema unificado y automatizado.' },
  { icon: Shield, title: 'Seguridad y Cumplimiento', desc: 'Cifrado, control de acceso y auditoría integrados en cada capa de la solución.' },
  { icon: ArrowUpRight, title: 'Resultados Medibles', desc: 'Definimos KPIs desde el inicio. Cada entrega se mide por su impacto en la operación.' },
];

export default function WhyMavricSection() {
  const { theme } = useTheme();

  return (
    <section id="why-mavric" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-mono tracking-widest uppercase mb-4 block" style={{ color: theme.accent1 }}>
              03 // Por Qué Mavric
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-6 leading-tight transition-colors duration-700" style={{ color: theme.textPrimary }}>
              Tecnología que{' '}
              <span style={{ color: theme.highlightColor }}>
                Transforma Operaciones.
              </span>
            </h2>
            <p className="text-lg leading-relaxed max-w-md transition-colors duration-700" style={{ color: theme.textMuted }}>
              No desarrollamos software genérico — diseñamos sistemas que resuelven
              problemas reales de tu operación. Cada proyecto parte de un análisis profundo
              de tus procesos para que la tecnología trabaje a favor de tus objetivos.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {differentiators.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="rounded-xl border p-5 transition-all duration-700"
                style={{
                  background: theme.cardBg,
                  borderColor: theme.cardBorder,
                  backdropFilter: 'blur(12px)',
                }}
              >
                <d.icon size={18} className="mb-3" style={{ color: theme.accent1 }} />
                <h4 className="text-sm font-heading font-semibold mb-1.5 transition-colors duration-700" style={{ color: theme.textPrimary }}>
                  {d.title}
                </h4>
                <p className="text-xs leading-relaxed transition-colors duration-700" style={{ color: theme.textMuted }}>
                  {d.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}