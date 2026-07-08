import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { ArrowUpRight } from 'lucide-react';
import ProjectModal from './ProjectModal';

const cases = [
  {
    tag: 'LANDING PAGE',
    title: 'Mavicca landing page',
    challenge: 'Mavicca necesitaba una presencia digital clara para presentar su propuesta de consultoría y servicios ambientales con una experiencia moderna y confiable.',
    solution: 'Diseñamos una landing page enfocada en comunicar servicios, reforzar credibilidad de marca y facilitar el contacto comercial desde cualquier dispositivo.',
    outcome: 'Una experiencia visual alineada a la identidad de la empresa, preparada para captar interés y dirigir visitas hacia la conversión.',
    impact: 'Consultoría y servicios ambientales',
    fullDescription: 'Este proyecto corresponde a la landing page de Mavicca, una empresa orientada a consultoría y servicios ambientales. La propuesta pone el foco en una comunicación directa, jerarquía visual limpia y una presentación de marca profesional para transmitir confianza desde el primer contacto. La interfaz fue planteada para acompañar el posicionamiento de la empresa y facilitar que potenciales clientes entiendan rápidamente el valor de sus servicios.',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    images: [
      '/mavicca-landing.png',
      '/logo-final-mavicca.png',
    ],
    websiteUrl: 'https://mavicca-landing1.netlify.app',
    color: '#0F766E',
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

        {project.websiteUrl && (
          <a
            href={project.websiteUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase transition-opacity duration-300 hover:opacity-80"
            style={{ color: project.color }}
            onClick={(event) => event.stopPropagation()}
          >
            Ver sitio
            <ArrowUpRight size={14} />
          </a>
        )}

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

        <div className="mx-auto grid max-w-3xl gap-5 items-start" onMouseLeave={() => setHoveredCard(null)}>
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
