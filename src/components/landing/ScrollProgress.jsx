import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';

const sections = [
  { id: 'hero', label: 'INICIO' },
  { id: 'solutions', label: 'SERVICIOS' },
  { id: 'why-mavric', label: 'NOSOTROS' },
  { id: 'team', label: 'EQUIPO' },
  { id: 'contact', label: 'CONTACTO' },
];

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(sections[0].label);
  const { theme } = useTheme();

  useEffect(() => {
    let ticking = false;
    const sectionEls = sections.map(({ id, label }) => ({ id, label, el: document.getElementById(id) }));

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(total > 0 ? window.scrollY / total : 0);

        for (let i = sectionEls.length - 1; i >= 0; i--) {
          const section = sectionEls[i];
          if (section.el && section.el.getBoundingClientRect().top <= 200) {
            setActiveSection(section.label);
            break;
          }
        }
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-2">
      <div className="w-[2px] h-32 rounded-full relative overflow-hidden" style={{ background: `${theme.textMuted}15` }}>
        <motion.div
          className="absolute top-0 left-0 w-full rounded-full"
          style={{ background: theme.accent1 }}
          animate={{ height: `${progress * 100}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      <span
        className="text-[10px] font-mono tracking-wider whitespace-nowrap"
        style={{ color: theme.accent1, writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        {activeSection}
      </span>
    </div>
  );
}