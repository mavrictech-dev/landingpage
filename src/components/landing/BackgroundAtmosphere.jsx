import React, { useMemo } from 'react';
import { useTheme } from '@/lib/ThemeContext';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

function StarField({ count = 40, color }) {
  const stars = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 70,
      size: Math.random() * 1.5 + 0.4,
      delay: Math.random() * 6,
      duration: Math.random() * 4 + 3,
      maxOpacity: Math.random() * 0.4 + 0.15,
    })), [count]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map(s => (
        <motion.div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background: color,
            boxShadow: `0 0 ${s.size * 2}px ${color}`,
          }}
          animate={{ opacity: [0.05, s.maxOpacity, 0.05] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

export default function BackgroundAtmosphere() {
  const { theme, cloudyMode, weatherMode } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const lowPowerDevice = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const cores = navigator.hardwareConcurrency || 4;
    return cores <= 4 || window.innerWidth < 1024;
  }, []);
  const enableRichMotion = !prefersReducedMotion && !lowPowerDevice;

  const showStars = theme.showStars && weatherMode === 'clear' && enableRichMotion;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Rich multi-stop gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `linear-gradient(170deg, ${theme.gradientStart} 0%, ${theme.gradientMid} 30%, ${theme.gradientEnd} 55%, ${theme.gradientMid} 75%, ${theme.gradientStart} 100%)`,
        }}
        transition={{ duration: enableRichMotion ? 1.5 : 0.3, ease: 'easeInOut' }}
      />

      {/* Secondary radial wash — adds depth and breaks solidity */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `radial-gradient(ellipse 140% 70% at 25% 15%, ${theme.gradientMid} 0%, transparent 60%)`,
          opacity: theme.isLight ? 0.4 : 0.8,
        }}
        transition={{ duration: enableRichMotion ? 2 : 0.3, ease: 'easeInOut' }}
      />

      {/* Third radial — bottom-right warmth */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `radial-gradient(ellipse 100% 80% at 80% 85%, ${theme.gradientEnd} 0%, transparent 55%)`,
          opacity: theme.isLight ? 0.35 : 0.7,
        }}
        transition={{ duration: enableRichMotion ? 2 : 0.3, ease: 'easeInOut' }}
      />

      {/* Aura glow */}
      <motion.div
        className="absolute inset-0"
        animate={{ background: theme.aura }}
        transition={{ duration: enableRichMotion ? 1.5 : 0.3, ease: 'easeInOut' }}
      />

      {/* Orb 1 */}
      <motion.div
        className="absolute w-[620px] h-[620px] rounded-full blur-[120px]"
        animate={{
          background: theme.accent1,
          opacity: theme.orbOpacity,
          x: enableRichMotion ? [0, 50, -30, 0] : 0,
          y: enableRichMotion ? [0, -30, 20, 0] : 0,
        }}
        transition={{ duration: 20, repeat: enableRichMotion ? Infinity : 0, ease: 'easeInOut' }}
        style={{ top: '5%', left: '15%' }}
      />

      {/* Orb 2 */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px]"
        animate={{
          background: theme.accent2,
          opacity: theme.orbOpacity * 0.75,
          x: enableRichMotion ? [0, -40, 30, 0] : 0,
          y: enableRichMotion ? [0, 40, -20, 0] : 0,
        }}
        transition={{ duration: 25, repeat: enableRichMotion ? Infinity : 0, ease: 'easeInOut' }}
        style={{ top: '45%', right: '8%' }}
      />

      {/* Orb 3 — mid-page softener */}
      <motion.div
        className="absolute w-[360px] h-[360px] rounded-full blur-[110px]"
        animate={{
          background: theme.gradientMid,
          opacity: theme.orbOpacity * 0.5,
          x: enableRichMotion ? [0, 30, -20, 0] : 0,
          y: enableRichMotion ? [0, -20, 30, 0] : 0,
        }}
        transition={{ duration: 30, repeat: enableRichMotion ? Infinity : 0, ease: 'easeInOut' }}
        style={{ top: '60%', left: '40%' }}
      />

      {/* Stars */}
      <AnimatePresence>
        {showStars && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          >
            <StarField count={theme.starCount || 30} color={theme.particleColor} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cloudy overlay */}
      <AnimatePresence>
        {cloudyMode && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            style={{
              background: theme.isLight
                ? 'linear-gradient(180deg, rgba(156,163,175,0.35) 0%, rgba(209,213,219,0.25) 40%, rgba(229,231,235,0.15) 100%)'
                : 'linear-gradient(180deg, rgba(30,41,59,0.5) 0%, rgba(51,65,85,0.3) 40%, rgba(30,41,59,0.15) 100%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.5,
          backgroundImage: `
            linear-gradient(${theme.gridLine} 1px, transparent 1px),
            linear-gradient(90deg, ${theme.gridLine} 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}