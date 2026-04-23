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

    const windAngle = 0.45; // radians (~26°) diagonal

    dropsRef.current = Array.from({ length: 120 }, () => ({
      x: Math.random() * (w + 200) - 100,
      y: Math.random() * h,
      len: Math.random() * 22 + 10,
      speed: Math.random() * 6 + 4.5,
      opacity: Math.random() * 0.28 + 0.08,
      width: Math.random() * 2.2 + 0.8,
      // Droplet head radius — makes it look like a raindrop
      headR: Math.random() * 1.6 + 0.8,
    }));

    const dx = Math.sin(windAngle);
    const dy = Math.cos(windAngle);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      dropsRef.current.forEach(drop => {
        const tailX = drop.x + dx * drop.len;
        const tailY = drop.y + dy * drop.len;

        // Tapered streak — thicker at head, thinner at tail
        ctx.save();
        ctx.globalAlpha = drop.opacity;

        // Draw tapered body using a triangle path
        const perpX = dy * drop.width * 0.5;
        const perpY = -dx * drop.width * 0.5;

        ctx.beginPath();
        ctx.moveTo(drop.x - perpX, drop.y - perpY);
        ctx.lineTo(drop.x + perpX, drop.y + perpY);
        ctx.lineTo(tailX, tailY);
        ctx.closePath();
        ctx.fillStyle = theme.rainColor;
        ctx.fill();

        // Rounded droplet head
        ctx.beginPath();
        ctx.arc(drop.x, drop.y, drop.headR, 0, Math.PI * 2);
        ctx.fillStyle = theme.rainColor;
        ctx.globalAlpha = drop.opacity * 1.2;
        ctx.fill();

        // Subtle highlight on head
        ctx.beginPath();
        ctx.arc(drop.x - drop.headR * 0.25, drop.y - drop.headR * 0.25, drop.headR * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = theme.rainHighlight || 'rgba(255,255,255,0.15)';
        ctx.globalAlpha = drop.opacity * 0.5;
        ctx.fill();

        ctx.restore();

        // Move
        drop.y += drop.speed * dy;
        drop.x += drop.speed * dx;
        if (drop.y > h || drop.x > w + 100) {
          drop.y = -(Math.random() * 40);
          drop.x = Math.random() * (w + 200) - 200;
        }
      });

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