import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../lib/ThemeContext';
import davidImage from '../../assets/davidseri.png';
import javierImage from '../../assets/javiercabcorto.png';
import mauricioImage from '../../assets/mauricio5.png';

const team = [
  {
    name: 'Mauricio Osores',
    role: 'CEO & Co-Founder',
    desc: 'Profesional con más de 10 años de experiencia en el ámbito empresarial y creador de MAVRIC, una propuesta innovadora orientada a impulsar la sostenibilidad, la productividad, la rentabilidad y el crecimiento estratégico de organizaciones modernas, competitivas y con visión de futuro.',
    color: '#0891B2',
    image: mauricioImage,
  },
  {
    name: 'David Ordinola',
    role: 'COO & Co-Founder',
    desc: 'Lidera la visión estratégica y el crecimiento de Mavric, con más de 15 años de experiencia en soluciones tecnológicas empresariales.',
    color: '#0891B2',
    image: davidImage,
  },
  {
    name: 'Javier Merino',
    role: 'Lead Developer',
    desc: 'Full-stack developer especializado en automatización de procesos y desarrollo de aplicaciones web/mobile de alto rendimiento.',
    color: '#0891B2',
    image: javierImage,
  }
];

/** @typedef {{ name: string, role: string, desc: string, color: string, image: string }} TeamMember */

function TeamCard(
  /** @type {{ member: TeamMember, index: number }} */ { member, index }
) {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative flex-1 min-w-[280px] max-w-[400px] rounded-2xl border overflow-hidden transition-all duration-700 cursor-default"
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
      <div
        className="relative h-80 overflow-hidden"
      >
        <img
          src={member.image}
          alt={member.name}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background: theme.isLight
              ? 'rgba(255,255,255,0.08)'
              : 'rgba(0,0,0,0.2)',
          }}
        />
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
        
        <div className="max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-500 ease-out">
          <p
            className="text-sm leading-relaxed"
            style={{ color: theme.textMuted }}
          >
            {member.desc}
          </p>
        </div>
      </div>

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
    <section
      id="team"
      className="relative py-24 px-6"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '900px' }}
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
            Equipo
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

        <div className="flex flex-wrap justify-center gap-5 items-start">
          {team.map((m, i) => (
            <TeamCard key={i} member={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
