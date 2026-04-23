import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTheme } from '@/lib/ThemeContext';

const navLinks = [
  { label: 'Servicios', href: '#solutions' },
  { label: 'Soluciones', href: '#why-mavric' },
  { label: 'Proyectos', href: '#work' },
  { label: 'Contacto', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
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
        className="transition-all duration-700"
        style={{
          background: scrolled ? theme.navBg : `${theme.navBg}80`,
          backdropFilter: scrolled ? 'blur(24px) saturate(1.4)' : 'blur(8px)',
          borderBottom: scrolled ? `1px solid ${theme.navBorder}` : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-heading font-bold text-sm text-white"
              style={{ background: theme.btnBg }}
            >
              M
            </div>
            <span className="font-heading font-semibold tracking-tight text-lg transition-colors duration-700" style={{ color: theme.textPrimary }}>
              MAVRIC
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-body transition-colors duration-500"
                style={{ color: theme.textMuted }}
                onMouseEnter={e => e.target.style.color = theme.textPrimary}
                onMouseLeave={e => e.target.style.color = theme.textMuted}
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
              background: theme.navBg,
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