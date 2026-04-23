import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { ArrowUpRight } from 'lucide-react';
import ProjectModal from './ProjectModal';

const cases = [
  {
    tag: 'PLATAFORMA DE GESTIÓN',
    title: 'Sistema de Control Operativo Centralizado',
    challenge: 'Una empresa con operaciones distribuidas necesitaba unificar datos de múltiples sedes y eliminar reportes manuales.',
    solution: 'Desarrollamos una plataforma cloud con dashboards en tiempo real, alertas automáticas y vistas personalizadas por rol y sede.',
    outcome: 'Reducción del 40% en tiempos de reporte. Toma de decisiones centralizada y basada en datos.',
    impact: '40% menos tiempo en reportes',
    fullDescription: 'Este proyecto consistió en diseñar y desarrollar una plataforma integral de control operativo para una empresa con presencia en múltiples sedes a nivel nacional. La solución unificó fuentes de datos dispersas en un solo sistema centralizado, con dashboards en tiempo real personalizados por rol, automatización de alertas operativas y generación de reportes avanzados. La plataforma permite a los tomadores de decisión acceder a indicadores clave desde cualquier ubicación, eliminando la dependencia de hojas de cálculo y procesos manuales.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'Redis'],
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&q=80',
    ],
    color: '#2563EB',
  },
  {
    tag: 'AUTOMATIZACIÓN EMPRESARIAL',
    title: 'Integración y Automatización de Procesos',
    challenge: 'Una empresa de servicios financieros invertía más de 200 horas/mes en reconciliación manual entre CRM, contabilidad y compliance.',
    solution: 'Diseñamos un motor de automatización que conecta sus sistemas internos con reglas de validación inteligentes y flujos sin intervención manual.',
    outcome: '85% de tareas repetitivas eliminadas. Reportes de cumplimiento generados 3x más rápido.',
    impact: '85% de automatización lograda',
    fullDescription: 'Implementamos un sistema de automatización empresarial completo para una firma de servicios financieros que enfrentaba cuellos de botella operativos severos. El motor conecta CRM, sistemas contables y plataformas de compliance mediante APIs inteligentes, ejecutando validaciones automáticas y generando flujos de trabajo sin intervención humana. El resultado fue una transformación radical en la eficiencia operativa, liberando cientos de horas mensuales del equipo para tareas de mayor valor estratégico.',
    techStack: ['Python', 'Kafka', 'Kubernetes', 'MongoDB', 'Terraform', 'GraphQL'],
    images: [
      'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80',
      'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&q=80',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&q=80',
    ],
    color: '#0284C7',
  },
  {
    tag: 'ANALÍTICA E IA',
    title: 'Sistema de Analítica Predictiva',
    challenge: 'Una empresa de tecnología carecía de herramientas para anticipar la rotación de clientes e identificar oportunidades de crecimiento.',
    solution: 'Implementamos modelos de machine learning para predicción de churn y un panel analítico con recomendaciones accionables para el equipo comercial.',
    outcome: 'Reducción del 22% en churn. Más de $1.2M en oportunidades de upsell detectadas en 6 meses.',
    impact: '$1.2M en oportunidades detectadas',
    fullDescription: 'Desarrollamos un ecosistema de analítica predictiva que combina modelos de machine learning avanzados con visualizaciones intuitivas para el equipo comercial. Los modelos de predicción de churn identifican clientes en riesgo con semanas de anticipación, mientras que el motor de recomendaciones sugiere oportunidades de upselling basadas en patrones de comportamiento. El panel centraliza métricas clave, tendencias y alertas automáticas, permitiendo al equipo actuar de forma proactiva en lugar de reactiva.',
    techStack: ['TensorFlow', 'Python', 'React', 'BigQuery', 'GCP', 'Looker'],
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=400&q=80',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&q=80',
    ],
    color: '#EA580C',
  },
];

function ProjectCard({ project, index, onClick, isHovered, onHoverStart, onHoverEnd }) {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={onClick}
      className="group self-start relative rounded-2xl border overflow-hidden cursor-pointer transition-all duration-700"
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
          : `0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)`,
      }}
    >
      {/* Cover image area */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={project.images?.[0]}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ opacity: 0.85 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, transparent 30%, ${theme.isLight ? 'rgba(255,255,255,0.8)' : 'rgba(10,16,32,0.85)'} 100%)`,
          }}
        />
        <div className="absolute top-3 left-3">
          <span
            className="text-[10px] font-mono tracking-widest px-2.5 py-1 rounded-full"
            style={{
              background: `${project.color}20`,
              color: project.color,
              backdropFilter: 'blur(8px)',
            }}
          >
            {project.tag}
          </span>
        </div>
        <div
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `${project.color}25`, backdropFilter: 'blur(8px)' }}
        >
          <ArrowUpRight size={14} style={{ color: project.color }} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className="text-lg font-heading font-bold mb-2 transition-colors duration-700"
          style={{ color: theme.textPrimary }}
        >
          {project.title}
        </h3>

        {/* Hover reveal — smooth expand */}
        <motion.div
          initial={false}
          animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="overflow-hidden"
        >
          <div className="grid sm:grid-cols-3 gap-3 pt-3">
            {[
              { label: 'Desafío', text: project.challenge },
              { label: 'Solución', text: project.solution },
              { label: 'Resultado', text: project.outcome },
            ].map((item, j) => (
              <div key={j}>
                <div
                  className="text-[10px] font-mono tracking-widest mb-1 uppercase"
                  style={{ color: theme.textMuted }}
                >
                  {item.label}
                </div>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: theme.textSecondary }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {!isHovered && (
          <p
            className="text-sm mt-1 transition-colors duration-700"
            style={{ color: theme.textMuted }}
          >
            {project.impact}
          </p>
        )}
      </div>

      {/* Bottom accent */}
      <div
        className="h-[2px] w-0 group-hover:w-full transition-all duration-700"
        style={{ background: project.color }}
      />
    </motion.div>
  );
}

export default function FeaturedWork() {
  const { theme } = useTheme();
  const [selected, setSelected] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section
      id="work"
      className="relative py-24 px-6"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '1000px' }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span
            className="text-xs font-mono tracking-widest uppercase mb-4 block"
            style={{ color: theme.accent1 }}
          >
            04 // Casos de Éxito
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4 transition-colors duration-700"
            style={{ color: theme.textPrimary }}
          >
            Resultados que{' '}
            <span style={{ color: theme.highlightColor }}>Hablan</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 items-start" onMouseLeave={() => setHoveredCard(null)}>
          {cases.map((c, i) => (
            <ProjectCard
              key={c.title}
              project={c}
              index={i}
              onClick={() => setSelected(c)}
              isHovered={hoveredCard === c.title}
              onHoverStart={() => setHoveredCard(c.title)}
              onHoverEnd={() => setHoveredCard(null)}
            />
          ))}
        </div>
      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}