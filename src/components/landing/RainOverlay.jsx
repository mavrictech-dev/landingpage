import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/lib/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function RainOverlay() {
  const { rainMode, theme } = useTheme();
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const dropsRef = useRef([]);

  useEffect(() => {
    if (!rainMode || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener('resize', resize);

    // Wind drift: each drop gets a consistent diagonal offset
    const windAngle = 0.45; // radians (~26°) from vertical

    dropsRef.current = Array.from({ length: 130 }, () => ({
      x: Math.random() * (w + 200) - 100,
      y: Math.random() * h,
      len: Math.random() * 34 + 16,
      speed: Math.random() * 7 + 5,
      opacity: Math.random() * 0.28 + 0.1,
      width: Math.random() * 2.0 + 0.6,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const dx = Math.sin(windAngle);
      const dy = Math.cos(windAngle);

      dropsRef.current.forEach(drop => {
        const endX = drop.x + dx * drop.len;
        const endY = drop.y + dy * drop.len;

        // Main drop line
        ctx.beginPath();
        ctx.strokeStyle = theme.rainColor;
        ctx.lineWidth = drop.width;
        ctx.globalAlpha = drop.opacity;
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Subtle highlight streak
        ctx.beginPath();
        ctx.strokeStyle = theme.rainHighlight || 'rgba(255,255,255,0.08)';
        ctx.lineWidth = drop.width * 0.4;
        ctx.globalAlpha = drop.opacity * 0.35;
        ctx.moveTo(drop.x + 0.6, drop.y + 2);
        ctx.lineTo(drop.x + dx * drop.len * 0.5 + 0.6, drop.y + dy * drop.len * 0.5 + 2);
        ctx.stroke();

        drop.y += drop.speed * dy;
        drop.x += drop.speed * dx;
        if (drop.y > h || drop.x > w + 100) {
          drop.y = -(Math.random() * 40);
          drop.x = Math.random() * (w + 200) - 200;
        }
      });
      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [rainMode, theme.rainColor, theme.rainHighlight]);

  return (
    <AnimatePresence>
      {rainMode && (
        <motion.canvas
          ref={canvasRef}
          className="fixed inset-0 z-40 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        />
      )}
    </AnimatePresence>
  );
}