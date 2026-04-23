import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import { X } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  const { theme } = useTheme();
  const [activeImg, setActiveImg] = useState(0);

  if (!project) return null;

  const images = project.images || [];
  const mainImg = images[activeImg] || images[0];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border"
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{
            background: theme.isLight
              ? 'rgba(255, 255, 255, 0.88)'
              : 'rgba(10, 16, 32, 0.94)',
            borderColor: theme.isLight
              ? 'rgba(15, 23, 42, 0.1)'
              : 'rgba(248, 250, 252, 0.08)',
            backdropFilter: 'blur(24px)',
            boxShadow: theme.isLight
              ? '0 24px 64px rgba(0,0,0,0.12)'
              : '0 24px 64px rgba(0,0,0,0.5)',
          }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{
              background: theme.isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)',
              color: theme.textMuted,
            }}
          >
            <X size={16} />
          </button>

          {/* 1. Title first */}
          <div className="p-5 md:p-6 pb-0">
            <span
              className="text-[10px] font-mono tracking-widest px-2.5 py-1 rounded-full mb-3 inline-block"
              style={{
                background: `${project.color}15`,
                color: project.color,
              }}
            >
              {project.tag}
            </span>
            <h2
              className="text-2xl md:text-3xl font-heading font-bold mt-2 transition-colors duration-700"
              style={{ color: theme.textPrimary }}
            >
              {project.title}
            </h2>
            {project.impact && (
              <div
                className="mt-1.5 text-lg font-heading font-semibold"
                style={{ color: project.color }}
              >
                {project.impact}
              </div>
            )}
          </div>

          {/* 2. Image gallery — main + masonry thumbnails */}
          {images.length > 0 && (
            <div className="grid md:grid-cols-[1fr_180px] gap-2.5 p-5 md:px-6">
              {/* Main image — cropped tighter */}
              <div
                className="rounded-xl overflow-hidden"
                style={{
                  background: theme.isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)',
                }}
              >
                <img
                  src={mainImg}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-500"
                  style={{ aspectRatio: '16/9', objectPosition: 'center 30%' }}
                />
              </div>

              {/* Masonry / brick thumbnails on right */}
              <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto">
                {images.map((img, i) => {
                  const isActive = activeImg === i;
                  // Alternate heights for masonry effect
                  const heightClass = i % 2 === 0 ? 'md:h-24' : 'md:h-[72px]';
                  return (
                    <button
                      key={i}
                      onMouseEnter={() => setActiveImg(i)}
                      onClick={() => setActiveImg(i)}
                      className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300 ${heightClass}`}
                      style={{
                        borderColor: isActive ? theme.accent1 : 'transparent',
                        opacity: isActive ? 1 : 0.55,
                      }}
                    >
                      <img
                        src={img}
                        alt={`${project.title} ${i + 1}`}
                        className="w-20 h-14 md:w-full md:h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. Description and details below images */}
          <div className="p-5 md:px-6 md:pb-6 pt-0 space-y-5">
            {/* Full description */}
            <div>
              <h4
                className="text-xs font-mono tracking-widest uppercase mb-2"
                style={{ color: theme.textMuted }}
              >
                Descripción del Proyecto
              </h4>
              <p
                className="text-sm leading-relaxed transition-colors duration-700"
                style={{ color: theme.textSecondary }}
              >
                {project.fullDescription}
              </p>
            </div>

            {/* Challenge / Solution / Outcome */}
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: 'Desafío', text: project.challenge },
                { label: 'Solución', text: project.solution },
                { label: 'Resultado', text: project.outcome },
              ].map((item, j) => (
                <div
                  key={j}
                  className="rounded-xl p-4 transition-all duration-700"
                  style={{
                    background: theme.isLight
                      ? 'rgba(0,0,0,0.03)'
                      : 'rgba(255,255,255,0.03)',
                  }}
                >
                  <div
                    className="text-[10px] font-mono tracking-widest mb-1.5 uppercase"
                    style={{ color: theme.textMuted }}
                  >
                    {item.label}
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: theme.textSecondary }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Tech stack */}
            {project.techStack && project.techStack.length > 0 && (
              <div>
                <h4
                  className="text-xs font-mono tracking-widest uppercase mb-3"
                  style={{ color: theme.textMuted }}
                >
                  Stack Tecnológico
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-700"
                      style={{
                        background: theme.isLight
                          ? 'rgba(0,0,0,0.05)'
                          : 'rgba(255,255,255,0.06)',
                        color: theme.textSecondary,
                        border: `1px solid ${theme.isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'}`,
                      }}
                    >
                      <span style={{ color: project.color }}>●</span>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}