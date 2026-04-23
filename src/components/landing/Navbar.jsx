import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTheme } from '@/lib/ThemeContext';
import BorderRainEffect from './BorderRainEffect';

const navLinks = [
  { label: 'Services', href: '#solutions' },
  { label: 'Solutions', href: '#why-mavric' },
  { label: 'Projects', href: '#work' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, rainMode, currentThemeName } = useTheme();
  const navHoverColor = theme.accent2 || '#0891B2';
  const logoUpscaly = '/src/assets/logoupscaly.png';
  const letraDark = '/src/assets/letradark.png';
  const letraSL = '/src/assets/letrasl.png';
  const useDarkWordmark = ['morning', 'midday', 'afternoon'].includes(currentThemeName);
  const wordmarkSrc = useDarkWordmark ? letraDark : letraSL;

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 40;
      setScrolled(prev => (prev === next ? prev : next));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="relative transition-all duration-700"
        style={{
          background: scrolled
            ? 'rgba(255, 255, 255, 0.06)'
            : 'rgba(255, 255, 255, 0.02)',
          backdropFilter: scrolled ? 'blur(24px) saturate(1.3)' : 'blur(12px)',
          borderBottom: scrolled
            ? '1px solid rgba(255, 255, 255, 0.08)'
            : '1px solid transparent',
        }}
      >
        {rainMode && <BorderRainEffect edge="bottom" count={6} />}

        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <img src={logoUpscaly} alt="Mavric logo" className="h-11 w-auto object-contain" />
            <img src={wordmarkSrc} alt="Mavric" className="h-10 w-auto object-contain" />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="relative inline-block pb-1 text-sm font-body transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full"
                style={{ color: theme.textMuted }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = navHoverColor;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = theme.textMuted;
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="px-5 py-2 rounded-lg text-sm font-medium transition-all duration-500 hover:shadow-lg hover:scale-105"
              style={{
                background: theme.btnBg,
                color: theme.btnText,
                boxShadow: `0 0 20px ${theme.glow}`,
              }}
            >
              Agendar Consulta
            </a>
          </div>

          <button
            className="md:hidden p-2 transition-colors duration-500"
            style={{ color: theme.textPrimary }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(24px)',
            }}
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-lg font-body transition-colors"
                  style={{ color: theme.textSecondary }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="mt-2 px-5 py-3 rounded-lg text-center font-medium"
                style={{ background: theme.btnBg, color: theme.btnText }}
                onClick={() => setMobileOpen(false)}
              >
                Agendar Consulta
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}