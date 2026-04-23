import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';

const team = [
  {
    name: 'Carlos Méndez',
    role: 'CEO & Co-Founder',
    desc: 'Lidera la visión estratégica y el crecimiento de Mavric, con más de 12 años de experiencia en soluciones tecnológicas empresariales.',
    color: '#2563EB',
    gradient: 'linear-gradient(135deg, #1E3A5F 0%, #2563EB 40%, #0891B2 70%, #1E3A5F 100%)',
  },
  {
    name: 'Lucía Torres',
    role: 'CTO',
    desc: 'Arquitecta de software con enfoque en plataformas cloud escalables, seguridad e inteligencia artificial aplicada.',
    color: '#0891B2',
    gradient: 'linear-gradient(135deg, #164E63 0%, #0891B2 35%, #7C3AED 70%, #164E63 100%)',
  },
  {
    name: 'Andrés Ruiz',
    role: 'Lead Developer',
    desc: 'Full-stack developer especializado en automatización de procesos y desarrollo de APIs de alto rendimiento.',
    color: '#7C3AED',
    gradient: 'linear-gradient(135deg, #312E81 0%, #7C3AED 40%, #2563EB 70%, #312E81 100%)',
  },
  {
    name: 'Valentina Flores',
    role: 'Head of Design',
    desc: 'Diseñadora UX/UI con pasión por crear interfaces elegantes, intuitivas y centradas en la experiencia del usuario.',
    color: '#EA580C',
    gradient: 'linear-gradient(135deg, #7C2D12 0%, #EA580C 35%, #F59E0B 70%, #7C2D12 100%)',
  },
];

function TeamCard({ member, index }) {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative rounded-2xl border overflow-hidden transition-all duration-700"
      style={{
        background: theme.isLight
          ? 'rgba(255, 255, 255, 0.35)'
          : 'rgba(15, 23, 50, 0.4)',
        borderColor: theme.isLight
          ? 'rgba(15, 23, 42, 0.08)'
          : 'rgba(248, 250, 252, 0.07)',
        backdropFilter: 'blur(20px)',
        boxShadow: theme.isLight
          ? '0 4px 24px rgba(0,0,0,0.04)'
          : '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)',
      }}
    >
      {/* Blurred gradient placeholder — replaces photo area */}
      <div
        className="relative h-32 overflow-hidden"
        style={{ background: member.gradient }}
      >
        {/* Blur overlay for soft diffused look */}
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: 'blur(40px)',
            background: theme.isLight
              ? 'rgba(255,255,255,0.15)'
              : 'rgba(0,0,0,0.15)',
          }}
        />
        {/* Soft orb accent */}
        <div
          className="absolute w-28 h-28 rounded-full blur-[50px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            background: member.color,
            opacity: 0.4,
          }}
        />
        {/* Subtle inner glow edge */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, transparent 50%, ${theme.isLight ? 'rgba(255,255,255,0.5)' : 'rgba(10,16,32,0.6)'} 100%)`,
          }}
        />
      </div>

      <div className="p-5">
        <h3
          className="font-heading font-semibold text-base mb-0.5 transition-colors duration-700"
          style={{ color: theme.textPrimary }}
        >
          {member.name}
        </h3>
        <span
          className="text-xs font-mono tracking-wider block mb-3"
          style={{ color: member.color }}
        >
          {member.role}
        </span>
        <p
          className="text-sm leading-relaxed transition-colors duration-700"
          style={{ color: theme.textMuted }}
        >
          {member.desc}
        </p>
      </div>

      {/* Bottom accent line */}
      <div
        className="h-[2px] w-0 group-hover:w-full transition-all duration-700"
        style={{ background: member.color }}
      />
    </motion.div>
  );
}

export default function TeamSection() {
  const { theme } = useTheme();

  return (
    <section id="team" className="relative py-24 px-6">
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
            05 // Equipo
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4 transition-colors duration-700"
            style={{ color: theme.textPrimary }}
          >
            Conoce al{' '}
            <span style={{ color: theme.highlightColor }}>Equipo</span>
          </h2>
          <p
            className="max-w-xl mx-auto text-lg transition-colors duration-700"
            style={{ color: theme.textMuted }}
          >
            Profesionales apasionados por la tecnología, comprometidos con
            entregar soluciones que transforman negocios.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((m, i) => (
            <TeamCard key={i} member={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}