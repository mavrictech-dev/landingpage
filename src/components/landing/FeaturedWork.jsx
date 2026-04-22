import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { ArrowUpRight } from 'lucide-react';

const cases = [
  {
    tag: 'PLATAFORMA DE GESTIÓN',
    title: 'Sistema de Control Operativo Centralizado',
    challenge: 'Una empresa con operaciones distribuidas necesitaba unificar datos de múltiples sedes y eliminar reportes manuales.',
    solution: 'Desarrollamos una plataforma cloud con dashboards en tiempo real, alertas automáticas y vistas personalizadas por rol y sede.',
    outcome: 'Reducción del 40% en tiempos de reporte. Toma de decisiones centralizada y basada en datos.',
    color: '#2563EB',
  },
  {
    tag: 'AUTOMATIZACIÓN EMPRESARIAL',
    title: 'Integración y Automatización de Procesos',
    challenge: 'Una empresa de servicios financieros invertía más de 200 horas/mes en reconciliación manual entre CRM, contabilidad y compliance.',
    solution: 'Diseñamos un motor de automatización que conecta sus sistemas internos con reglas de validación inteligentes y flujos sin intervención manual.',
    outcome: '85% de tareas repetitivas eliminadas. Reportes de cumplimiento generados 3x más rápido.',
    color: '#0284C7',
  },
  {
    tag: 'ANALÍTICA E INTELIGENCIA ARTIFICIAL',
    title: 'Sistema de Analítica Predictiva',
    challenge: 'Una empresa de tecnología carecía de herramientas para anticipar la rotación de clientes e identificar oportunidades de crecimiento.',
    solution: 'Implementamos modelos de machine learning para predicción de churn y un panel analítico con recomendaciones accionables para el equipo comercial.',
    outcome: 'Reducción del 22% en churn. Más de $1.2M en oportunidades de upsell detectadas en 6 meses.',
    color: '#EA580C',
  },
];

export default function FeaturedWork() {
  const { theme } = useTheme();

  return (
    <section id="work" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono tracking-widest uppercase mb-4 block" style={{ color: theme.accent1 }}>
            04 // Casos de Éxito
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4 transition-colors duration-700" style={{ color: theme.textPrimary }}>
            Resultados que{' '}
            <span style={{ color: theme.highlightColor }}>
              Hablan
            </span>
          </h2>
        </motion.div>

        <div className="space-y-6">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group rounded-2xl border overflow-hidden transition-all duration-700"
              style={{
                background: theme.cardBg,
                borderColor: theme.cardBorder,
                backdropFilter: 'blur(16px)',
              }}
            >
              <div className="grid md:grid-cols-[1fr_auto] gap-6 p-6 md:p-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="text-[10px] font-mono tracking-widest px-3 py-1 rounded-full"
                      style={{
                        background: `${c.color}12`,
                        color: c.color,
                      }}
                    >
                      {c.tag}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-heading font-bold mb-5 transition-colors duration-700" style={{ color: theme.textPrimary }}>
                    {c.title}
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { label: 'Desafío', text: c.challenge },
                      { label: 'Solución', text: c.solution },
                      { label: 'Resultado', text: c.outcome },
                    ].map((item, j) => (
                      <div key={j}>
                        <div className="text-[10px] font-mono tracking-widest mb-1.5 uppercase transition-colors duration-700" style={{ color: theme.textMuted }}>
                          {item.label}
                        </div>
                        <p className="text-sm leading-relaxed transition-colors duration-700" style={{ color: theme.textSecondary }}>
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `${c.color}20` }}
                  >
                    <ArrowUpRight size={16} style={{ color: c.color }} />
                  </div>
                </div>
              </div>
              <div className="h-[2px] w-0 group-hover:w-full transition-all duration-700" style={{ background: c.color }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}