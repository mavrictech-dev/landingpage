import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { Fingerprint, Rocket, Telescope } from 'lucide-react';

const pillars = [
  {
    title: '¿Quiénes somos?',
    eyebrow: 'Identidad',
    desc: 'Somos un equipo de estrategas, diseñadores y developers enfocados en resolver retos operativos complejos con producto digital, automatización y arquitectura moderna.',
  },
  {
    title: 'Misión',
    eyebrow: 'Propósito',
    desc: 'Brindar soluciones tecnológicas innovadoras mediante el desarrollo, implementación e integración de software, comercialización de equipos tecnológicos y prestación de servicios especializados de consultoría, soporte y transformación digital, contribuyendo a optimizar los procesos operativos y estratégicos de nuestros clientes con eficiencia, calidad y alto valor agregado.',
  },
  {
    title: 'Visión',
    eyebrow: 'Dirección',
    desc: 'Ser una empresa líder a nivel nacional e internacional en el desarrollo e implementación de soluciones tecnológicas integrales, reconocida por su innovación, confiabilidad y capacidad de impulsar la transformación digital de organizaciones públicas y privadas, generando crecimiento sostenible y relaciones de largo plazo con nuestros clientes.',
  },
];

/** @typedef {{ title: string, eyebrow: string, desc: string }} AboutItem */

function AboutCard(
  /** @type {{ item: AboutItem, index: number }} */ { item, index }
) {
  const { theme } = useTheme();

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl border p-6 sm:p-7 transition-all duration-700"
      style={{
        background: theme.isLight
          ? 'rgba(255, 255, 255, 0.4)'
          : 'rgba(15, 23, 50, 0.42)',
        borderColor: theme.isLight
          ? 'rgba(15, 23, 42, 0.08)'
          : 'rgba(248, 250, 252, 0.07)',
        backdropFilter: 'blur(12px)',
        boxShadow: theme.isLight
          ? '0 6px 24px rgba(0,0,0,0.04)'
          : '0 8px 30px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.02)',
      }}
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl transition-opacity duration-700 group-hover:opacity-80"
        style={{ background: `${theme.accent1}24`, opacity: 0.5 }}
      />
      <div className="mb-2 text-[11px] font-mono tracking-widest uppercase" style={{ color: theme.accent1 }}>
        {item.eyebrow}
      </div>

      <h3
        className="mb-3 text-xl sm:text-2xl font-heading font-semibold leading-tight transition-colors duration-700"
        style={{ color: theme.textPrimary }}
      >
        {item.title}
      </h3>

      <p className="text-sm sm:text-[15px] leading-relaxed transition-colors duration-700" style={{ color: theme.textMuted }}>
        {item.desc}
      </p>

      <div
        className="mt-6 h-[2px] w-10 group-hover:w-full transition-all duration-700"
        style={{ background: theme.accent2 }}
      />
    </motion.article>
  );
}

export default function NosotrosSection() {
  const { theme } = useTheme();

  return (
    <section
      id="nosotros"
      className="relative py-24 px-6"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '900px' }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span
            className="text-xs font-mono tracking-widest uppercase mb-4 block"
            style={{ color: theme.accent1 }}
          >
            Sobre Nosotros
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4 transition-colors duration-700"
            style={{ color: theme.textPrimary }}
          >
            Construimos tecnología con{' '}
            <span style={{ color: theme.highlightColor }}>dirección clara</span>
          </h2>
          <p
            className="max-w-2xl mx-auto text-base sm:text-lg leading-relaxed transition-colors duration-700"
            style={{ color: theme.textMuted }}
          >
            Nuestra esencia combina estrategia de negocio, ejecución técnica y diseño de producto para crear plataformas confiables, elegantes y preparadas para escalar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {pillars.map((item, index) => (
            <AboutCard key={item.title} item={item} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 sm:mt-16 rounded-2xl overflow-hidden border transition-all duration-700 mx-auto max-w-4xl"
          style={{
            borderColor: theme.isLight ? 'rgba(15, 23, 42, 0.08)' : 'rgba(248, 250, 252, 0.07)',
            boxShadow: theme.isLight
              ? '0 6px 24px rgba(0,0,0,0.04)'
              : '0 8px 30px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.02)',
          }}
        >
          <video 
            src="/presentacion.mp4" 
            controls 
            className="w-full h-auto aspect-video object-cover"
          >
            Tu navegador no soporta el elemento de video.
          </video>
        </motion.div>
      </div>
    </section>
  );
}