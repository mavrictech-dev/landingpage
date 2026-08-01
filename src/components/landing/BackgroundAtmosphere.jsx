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
      <style>
        {`
          @keyframes twinkle {
            0% { opacity: 0.05; }
            50% { opacity: var(--max-opacity); }
            100% { opacity: 0.05; }
          }
          @keyframes floatOrb1 {
            0% { transform: translate(0, 0); }
            33% { transform: translate(50px, -30px); }
            66% { transform: translate(-30px, 20px); }
            100% { transform: translate(0, 0); }
          }
          @keyframes floatOrb2 {
            0% { transform: translate(0, 0); }
            33% { transform: translate(-40px, 40px); }
            66% { transform: translate(30px, -20px); }
            100% { transform: translate(0, 0); }
          }
          @keyframes floatOrb3 {
            0% { transform: translate(0, 0); }
            33% { transform: translate(30px, -20px); }
            66% { transform: translate(-20px, 30px); }
            100% { transform: translate(0, 0); }
          }
          .star {
            animation: twinkle var(--duration) ease-in-out infinite;
            animation-delay: var(--delay);
            will-change: opacity;
          }
          .orb1-anim { animation: floatOrb1 20s ease-in-out infinite; will-change: transform; }
          .orb2-anim { animation: floatOrb2 25s ease-in-out infinite; will-change: transform; }
          .orb3-anim { animation: floatOrb3 30s ease-in-out infinite; will-change: transform; }
        `}
      </style>
      {stars.map(s => (
        <div
          key={s.id}
          className="absolute rounded-full star"
          style={Object.assign(
            {
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              background: color,
              boxShadow: `0 0 ${s.size * 2}px ${color}`,
            },
            {
              '--max-opacity': s.maxOpacity,
              '--duration': `${s.duration}s`,
              '--delay': `${s.delay}s`,
            }
          )}
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
  const starCount = 'starCount' in theme && typeof theme.starCount === 'number' ? theme.starCount : 30;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-900">
      {/* Rich multi-stop gradient background */}
      <div
        className="absolute inset-0 transition-colors duration-1000"
        style={{
          background: `linear-gradient(170deg, ${theme.gradientStart} 0%, ${theme.gradientMid} 30%, ${theme.gradientEnd} 55%, ${theme.gradientMid} 75%, ${theme.gradientStart} 100%)`,
        }}
      />

      {/* Secondary radial wash — adds depth and breaks solidity */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse 140% 70% at 25% 15%, ${theme.gradientMid} 0%, transparent 60%)`,
          opacity: theme.isLight ? 0.4 : 0.8,
        }}
      />

      {/* Third radial — bottom-right warmth */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse 100% 80% at 80% 85%, ${theme.gradientEnd} 0%, transparent 55%)`,
          opacity: theme.isLight ? 0.35 : 0.7,
        }}
      />

      {/* Aura glow */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{ background: theme.aura }}
      />

      {/* Orb 1 */}
      <div
        className={`absolute w-[620px] h-[620px] rounded-full blur-[120px] transition-colors duration-1000 ${enableRichMotion ? 'orb1-anim' : ''}`}
        style={{ 
          top: '5%', left: '15%',
          background: theme.accent1,
          opacity: theme.orbOpacity,
        }}
      />

      {/* Orb 2 */}
      <div
        className={`absolute w-[500px] h-[500px] rounded-full blur-[100px] transition-colors duration-1000 ${enableRichMotion ? 'orb2-anim' : ''}`}
        style={{ 
          top: '45%', right: '8%',
          background: theme.accent2,
          opacity: theme.orbOpacity * 0.75,
        }}
      />

      {/* Orb 3 — mid-page softener */}
      <div
        className={`absolute w-[360px] h-[360px] rounded-full blur-[110px] transition-colors duration-1000 ${enableRichMotion ? 'orb3-anim' : ''}`}
        style={{ 
          top: '60%', left: '40%',
          background: theme.gradientMid,
          opacity: theme.orbOpacity * 0.5,
        }}
      />

      {/* Stars */}
      <AnimatePresence>
        {showStars && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
          >
            <StarField count={starCount} color={theme.particleColor} />
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